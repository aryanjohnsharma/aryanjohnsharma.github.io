import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PikaIcon } from '@pikaicons/react';
import { EnvelopeIcon, File02Icon } from '@pikaicons/core-free';
import PageWrapper from './PageWrapper';
import ShinyText from './ShinyText/ShinyText';
import About from './About';

const MagneticButton = ({ children, href, primary, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.85rem 1.8rem',
        borderRadius: '0',
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: '0.75rem',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        border: primary ? '2px solid var(--accent)' : '1px solid var(--bg-elevated)',
        backgroundColor: primary ? 'var(--accent)' : 'transparent',
        color: primary ? '#000000' : 'var(--text-primary)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    };

    const Elem = href ? 'a' : 'button';

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block' }}
        >
            <Elem
                href={href}
                style={baseStyle}
                onClick={onClick}
                onMouseOver={(e) => {
                    if (!primary) {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(255,106,0,0.15)';
                    } else {
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(255,106,0,0.3)';
                    }
                }}
                onMouseOut={(e) => {
                    if (!primary) {
                        e.currentTarget.style.borderColor = 'var(--bg-elevated)';
                        e.currentTarget.style.boxShadow = 'none';
                    } else {
                        e.currentTarget.style.boxShadow = 'none';
                    }
                }}
            >
                {children}
            </Elem>
        </motion.div>
    );
};

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') !== 'light'
    );
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return (
        <PageWrapper>
            <div className="panel" style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginTop: isMobile ? '70px' : '100px', // Header spacing
            }}>
                {/* Profile Header Block */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    width: '100%',
                    borderTop: '1px solid var(--border-line)',
                }}>
                    {/* Avatar Container */}
                    <div style={{
                        padding: '1.5rem',
                        borderRight: isMobile ? 'none' : '1px solid var(--border-line)',
                        borderBottom: isMobile ? '1px solid var(--border-line)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <div style={{
                            width: isMobile ? '110px' : '150px',
                            height: isMobile ? '110px' : '150px',
                            marginTop: 0,
                            border: '1px solid var(--border-line)',
                            backgroundColor: 'var(--bg-base)',
                            padding: '4px',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            <img
                                src="/assets/pfp_new.jpeg"
                                alt="Aryan Sharma"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    filter: isHovered ? 'grayscale(0%) contrast(1)' : (isDark ? 'grayscale(80%) contrast(1.2)' : 'grayscale(20%)'),
                                    transition: 'filter 0.3s ease',
                                }}
                            />
                        </div>
                    </div>

                    {/* Content Container */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid var(--border-line)',
                        }}>
                           <motion.h1 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: 'clamp(2rem, 5vw, 3rem)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                fontWeight: 700,
                            }}>
                                <ShinyText text="Aryan Sharma" speed={3} color={isDark ? '#ffffff' : '#111111'} shineColor="#FF6A00" spread={120} />
                            </motion.h1>
                        </div>
                        
                        <div style={{
                            padding: '0.8rem 1.5rem',
                            borderBottom: '1px solid var(--border-line)',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-body)',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.9rem',
                            gap: '0.5rem'
                        }}>
                            Developer <span style={{ color: 'var(--accent)' }}>//</span> Freelancer
                        </div>

                        <div style={{
                            padding: '1.2rem 1.5rem',
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap'
                        }}>
                            <MagneticButton primary onClick={() => window.location.href = 'mailto:aryanjohnsharma@gmail.com'}>
                                <PikaIcon icon={EnvelopeIcon} size={14} aria-hidden="true" /> Email Me
                            </MagneticButton>
                            <MagneticButton href="resume.pdf" target="_blank">
                                <PikaIcon icon={File02Icon} size={14} aria-hidden="true" /> Resume
                            </MagneticButton>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div style={{
                    padding: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderBottom: '1px solid var(--border-line)'
                }}>
                    <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--accent)', display: 'inline-block' }} />
                    <span>Tech Enthusiast. Full stack. Ships things.</span>
                </div>
            </div>



            <div className="panel" style={{ paddingBottom: '2rem' }}>
                <About />
            </div>
        </PageWrapper>
    );
};

export default Hero;
