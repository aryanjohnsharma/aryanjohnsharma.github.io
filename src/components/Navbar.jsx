import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const isScrollingDown = latest > prevScroll && latest > 50;
        setHidden(isScrollingDown);
        setPrevScroll(latest);
    });

    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/skills', label: 'Skills' },
        { path: '/setup', label: 'Setup' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(10, 10, 15, 0.6)',
                backdropFilter: 'blur(12px)',
                zIndex: 1000,
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <div style={{ display: 'flex', gap: '2.5rem' }}>
                {links.map(({ path, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        style={({ isActive }) => ({
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            paddingBottom: '4px',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-body)',
                            borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                            transition: 'color 0.2s',
                        })}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
        </motion.nav>
    );
};

export default Navbar;
