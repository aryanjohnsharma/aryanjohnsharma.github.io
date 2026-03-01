import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const isScrollingDown = latest > prevScroll && latest > 50;
        setHidden(isScrollingDown);
        setPrevScroll(latest);
        if (isScrollingDown && mobileOpen) setMobileOpen(false);
    });

    const links = [
        { path: '/', label: 'Home' },
        { path: '/skills', label: 'Skills' },
        { path: '/setup', label: 'Setup' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0, x: "-50%", opacity: 1 },
                    hidden: { y: -100, x: "-50%", opacity: 0 }
                }}
                initial="visible"
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    top: '16px',
                    left: '50%',
                    width: 'min(90%, 720px)',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    zIndex: 1000,
                    padding: '0 1.5rem',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                }}
            >
                {/* Brand / Logo on left */}
                <NavLink to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    flexShrink: 0,
                }}>
                    <Code2 size={18} style={{ color: 'var(--accent)' }} />
                    Aryan Sharma
                </NavLink>

                {/* Desktop Links on right */}
                <div className="nav-desktop" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.8rem',
                }}>
                    {links.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            style={({ isActive }) => ({
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.78rem',
                                fontWeight: isActive ? 600 : 400,
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                color: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.55)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="nav-mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: mobileOpen ? 'var(--accent)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '4px',
                        zIndex: 1001,
                    }}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="nav-mobile-overlay"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.97)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2.5rem',
                        }}
                    >
                        {links.map(({ path, label }, i) => (
                            <motion.div
                                key={path}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08, duration: 0.3 }}
                            >
                                <NavLink
                                    to={path}
                                    onClick={() => setMobileOpen(false)}
                                    style={({ isActive }) => ({
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '1.2rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '4px',
                                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                    })}
                                >
                                    {label}
                                </NavLink>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
