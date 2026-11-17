import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PikaIcon } from '@pikaicons/react';
import { MoonIcon, SunIcon } from '@pikaicons/core-free';
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
                    <motion.span
                        key="moon"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ display: 'flex', color: '#ffffff' }}
                    >
                        <PikaIcon icon={MoonIcon} size={size * 0.55} aria-hidden="true" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ display: 'flex', color: '#000000' }}
                    >
                        <PikaIcon icon={SunIcon} size={size * 0.55} aria-hidden="true" />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
