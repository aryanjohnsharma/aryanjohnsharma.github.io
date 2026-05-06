import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import playPressSound from '../utils/playPressSound';

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

    const toggleTheme = useCallback(() => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        playPressSound();

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (document.startViewTransition && !prefersReducedMotion) {
            const transition = document.startViewTransition(() => {
                applyTheme(newIsDark);
            });

            transition.ready.then(() => {
                document.documentElement.animate(
                    {
                        clipPath: ['inset(0 0 100% 0)', 'inset(0)'],
                    },
                    {
                        duration: 600,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
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
