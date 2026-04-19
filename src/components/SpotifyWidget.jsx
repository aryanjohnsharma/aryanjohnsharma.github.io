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
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(255, 106, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    top: isMobile ? 'max(1rem, env(safe-area-inset-top))' : 'auto',
                    bottom: isMobile ? 'auto' : bottomOffset,
                    right: isMobile ? 'calc(max(1rem, env(safe-area-inset-right)) + 52px)' : '1.5rem',
                    width: isMobile ? '42px' : '54px',
                    height: isMobile ? '42px' : '54px',
                    borderRadius: isMobile ? '9999px' : '0',
                    background: isMobile ? 'var(--nav-bg)' : 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
                    WebkitBackdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
                    border: isMobile ? '1px solid var(--nav-border)' : '1px solid rgba(255, 106, 0, 0.3)',
                    color: '#FF6A00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: isMobile ? 110 : 50,
                    boxShadow: isMobile ? '0 4px 20px var(--nav-shadow)' : '0 4px 15px rgba(0, 0, 0, 0.3)',
                    transition: 'top 0.3s ease, bottom 0.3s ease, right 0.3s ease',
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
                            border: '1px solid var(--bg-elevated)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
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
