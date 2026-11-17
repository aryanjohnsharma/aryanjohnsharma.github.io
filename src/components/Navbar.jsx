import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PikaIcon } from '@pikaicons/react';
import { HomeIcon, CodeIcon, LayerThreeIcon, SendPlaneHorizontalIcon } from '@pikaicons/core-free';
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
        icon: HomeIcon,
    },
    {
        label: 'Skills',
        path: '/skills',
        icon: CodeIcon,
    },
    {
        label: 'Setup',
        path: '/setup',
        icon: LayerThreeIcon,
    },
    {
        label: 'Contact',
        path: '/contact',
        icon: SendPlaneHorizontalIcon,
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

            const minWidth = 700;
            const maxWidth = Math.min(768, window.innerWidth - 48);
            const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

            if (window.innerWidth >= 768) {
                nav.style.width = `${currentWidth}px`;
            }
        } else {
            setIsScrolling(false);
            nav.style.width = `${Math.min(768, window.innerWidth - 48)}px`;
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
                                            <PikaIcon icon={item.icon} size={22} aria-hidden="true" />
                                        </span>

                                        {/* Label */}
                                        <span className={`nav-label${item.path === '/contact' && !isMobile ? ' nav-label-contact' : ''}`}>
                                            {item.path === '/contact' && !isMobile ? (
                                                <>
                                                    <span className="nav-label-default">Contact</span>
                                                    <span className="nav-label-hover" aria-hidden="true">Hire Me!</span>
                                                </>
                                            ) : item.label}
                                        </span>
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
