import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import playPressSound from '../utils/playPressSound';

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [breakpoint]);
    return isMobile;
};

const navItems = [
    {
        label: 'Home',
        path: '/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z" />
            </svg>
        ),
    },
    {
        label: 'Skills',
        path: '/skills',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
            </svg>
        ),
    },
    {
        label: 'Setup',
        path: '/setup',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M2 17L12 22L22 17L12 12L2 17ZM12 19.7236L5.13586 16.2764L12 13.2764L18.8641 16.2764L12 19.7236ZM12 10L2 15V17L12 12L22 17V15L12 10ZM12 2L2 7L12 12L22 7L12 2ZM12 4.27639L18.8641 7.72361L12 11.1708L5.13586 7.72361L12 4.27639Z" />
            </svg>
        ),
    },
    {
        label: 'Contact',
        path: '/contact',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z" />
            </svg>
        ),
    },
];

const Navbar = () => {
    const location = useLocation();
    const navRef = useRef(null);
    const rafId = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const isMobile = useIsMobile();

    const MAX_SCROLL = 1000;

    const updateNav = useCallback(() => {
        const nav = navRef.current;
        if (!nav) return;

        if (window.scrollY > 0) {
            setIsScrolling(true);

            const scrollProgress = Math.min(window.scrollY / MAX_SCROLL, 1);
            const easeProgress = 1 - Math.pow(1 - scrollProgress, 4);

            const minWidth = 528;
            const maxWidth = window.innerWidth * 0.8;
            const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

            if (window.innerWidth >= 768) {
                nav.style.width = `${currentWidth}px`;
            }
        } else {
            setIsScrolling(false);
            nav.style.width = '80%';
        }

        rafId.current = null;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!rafId.current) {
                rafId.current = requestAnimationFrame(updateNav);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Reset width on resize
        const handleResize = () => {
            if (window.innerWidth < 768) {
                if (navRef.current) navRef.current.style.width = '';
            } else {
                updateNav();
            }
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [updateNav]);

    return (
        <>
            {/* Mobile: logo balanced opposite the theme toggle */}
            {isMobile && (
                <NavLink to="/" className="mobile-nav-logo" aria-label="Home" onClick={playPressSound}>
                    <img
                        src="/assets/text logo.png"
                        alt="Aryan Sharma"
                        className="mobile-nav-logo-img"
                    />
                </NavLink>
            )}

            {/* Mobile: floating theme toggle in top-right */}
            {isMobile && (
                <div className="mobile-theme-toggle">
                    <ThemeToggle size={30} />
                </div>
            )}

            <div className="nav-wrapper">
                <nav
                    ref={navRef}
                    id="main-nav"
                    className={`main-nav${isScrolling ? ' scrolling' : ''}`}
                >
                    <div className="nav-inner">
                        {/* Logo — desktop only */}
                        {!isMobile && (
                            <NavLink to="/" className="nav-logo" onClick={playPressSound}>
                                <img
                                    src="/assets/text logo.png"
                                    alt="Aryan Sharma"
                                    className="nav-logo-img"
                                />
                            </NavLink>
                        )}
                        <ul className="nav-list">
                            {navItems.map((item) => (
                                <li key={item.path} className="nav-item">
                                    <NavLink
                                        to={item.path}
                                        end={item.path === '/'}
                                        onClick={playPressSound}
                                        className={({ isActive }) =>
                                            `nav-link${isActive ? ' active' : ''}`
                                        }
                                    >
                                        {/* Active indicator dot — desktop only */}
                                        <span className="nav-indicator" />

                                        {/* Icon — mobile only */}
                                        <span className="nav-icon">
                                            {item.icon}
                                        </span>

                                        {/* Label */}
                                        <span className="nav-label">{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                            {/* Desktop only: theme toggle in nav */}
                            {!isMobile && (
                                <li className="nav-item nav-theme-toggle">
                                    <ThemeToggle size={32} />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
