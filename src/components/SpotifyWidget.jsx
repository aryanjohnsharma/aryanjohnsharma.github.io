import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';
import playPressSound from '../utils/playPressSound';

const SpotifyWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // On mobile, join the top floating control row.
    const bottomOffset = isMobile ? '6rem' : '1.5rem';
    const popupBottom = isMobile ? '8.5rem' : '4.5rem';

    return (
        <>
            <motion.button
                type="button"
                aria-label={isOpen ? 'Close Spotify widget' : 'Open Spotify widget'}
                onClick={() => {
                    playPressSound();
                    setIsOpen(!isOpen);
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px var(--accent-glow)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    top: isMobile ? 'max(1rem, env(safe-area-inset-top))' : 'auto',
                    bottom: isMobile ? 'auto' : bottomOffset,
                    right: isMobile ? 'calc(max(1rem, env(safe-area-inset-right)) + 52px)' : '1.5rem',
                    width: isMobile ? '42px' : '54px',
                    height: isMobile ? '42px' : '54px',
                    borderRadius: isMobile ? '9999px' : '0',
                    background: 'var(--nav-bg)',
                    backdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
                    WebkitBackdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
                    border: '1px solid var(--nav-border)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: isMobile ? 110 : 50,
                    boxShadow: '0 4px 20px var(--nav-shadow)',
                    transition: 'top 0.3s ease, bottom 0.3s ease, right 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                    outline: 'none',
                }}
            >
                <Music size={20} strokeWidth={2.5} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            top: isMobile ? '4.5rem' : 'auto',
                            bottom: isMobile ? 'auto' : popupBottom,
                            right: '1rem',
                            left: 'auto',
                            zIndex: 999,
                            overflow: 'hidden',
                            border: '1px solid var(--nav-border)',
                            boxShadow: '0 8px 40px var(--nav-shadow)',
                            maxWidth: 'calc(100vw - 2rem)',
                        }}
                    >
                        <a href="https://open.spotify.com/user/r95f1qecgkdxt73wiyorgokf2" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://spotify-recently-played-readme.vercel.app/api?user=r95f1qecgkdxt73wiyorgokf2&count=7"
                                alt="Spotify recently played"
                                style={{ display: 'block', maxWidth: '100%', width: '300px' }}
                            />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SpotifyWidget;
