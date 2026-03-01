import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

const SpotifyWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    right: '1.5rem',
                    width: '44px',
                    height: '44px',
                    borderRadius: '0',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--accent)',
                    border: '1px solid var(--bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 0 15px rgba(255, 106, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
            >
                <Music size={18} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            bottom: '4.5rem',
                            right: '1rem',
                            left: 'auto',
                            zIndex: 999,
                            overflow: 'hidden',
                            border: '1px solid var(--bg-elevated)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
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
