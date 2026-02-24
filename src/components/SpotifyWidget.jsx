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
                    bottom: '2rem',
                    right: '2rem',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                }}
            >
                <Music size={20} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            bottom: '5.5rem',
                            right: '2rem',
                            zIndex: 999,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                        }}
                    >
                        <a href="https://open.spotify.com/user/r95f1qecgkdxt73wiyorgokf2" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://spotify-recently-played-readme.vercel.app/api?user=r95f1qecgkdxt73wiyorgokf2&count=7"
                                alt="Spotify recently played"
                                style={{ display: 'block', maxWidth: '300px' }}
                            />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SpotifyWidget;
