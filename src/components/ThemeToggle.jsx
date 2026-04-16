import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STYLE_ID = 'theme-transition-styles';

function injectTransitionCSS() {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
        el = document.createElement('style');
        el.id = STYLE_ID;
        document.head.appendChild(el);
    }
    el.textContent = `
        ::view-transition-group(root) {
            animation-duration: 0.7s;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        ::view-transition-new(root) {
            animation-name: reveal-right-left;
        }

        ::view-transition-old(root) {
            animation: none;
            z-index: -1;
        }

        @keyframes reveal-right-left {
            from {
                clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
            }
            to {
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            }
        }
    `;
}

const ThemeToggle = ({ size = 34 }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Keep in sync if changed externally
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const applyTheme = useCallback((dark) => {
        const root = document.documentElement;
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, []);

    const playSwitchSound = () => {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            
            const audioContext = new AudioContextClass();
            // In some browsers, AudioContext might start in a suspended state
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Set to an audible pitch for a nice "pop" or "click" sound
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            
            // Adjust gain (volume) to make it smooth and subtle (0.15 max)
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            // Rise to max volume quickly (shorter attack)
            gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.005);
            // Decay to 0 volume smoothly and quickly
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.04);

            oscillator.start(audioContext.currentTime);
            // Stop right after the decay finishes
            oscillator.stop(audioContext.currentTime + 0.05);
        } catch (e) {
            console.error("Failed to play theme switch sound", e);
        }
    };

    const toggleTheme = useCallback(() => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        playSwitchSound();

        // Inject the view-transition CSS
        injectTransitionCSS();

        // Use View Transition API if available, otherwise fall back
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                applyTheme(newIsDark);
            });
        } else {
            applyTheme(newIsDark);
        }
    }, [isDark, applyTheme]);

    return (
        <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                border: 'none',
                background: isDark ? '#000000' : '#ffffff',
                boxShadow: isDark
                    ? '0 0 0 1.5px rgba(255,255,255,0.15)'
                    : '0 0 0 1.5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                flexShrink: 0,
                overflow: 'hidden',
                position: 'relative',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.svg
                        key="moon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ width: size * 0.55, height: size * 0.55 }}
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <path
                            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                            fill="#ffffff"
                        />
                    </motion.svg>
                ) : (
                    <motion.svg
                        key="sun"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: size * 0.55, height: size * 0.55 }}
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <circle cx="12" cy="12" r="5" fill="#000000" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </motion.svg>
                )}
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
