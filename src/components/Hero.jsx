import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';
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

// Terminal typing effect
const TypeWriter = ({ text, delay = 0, speed = 50 }) => {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayed.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayed(text.slice(0, displayed.length + 1));
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [displayed, started, text, speed]);

    return (
        <span>
            {displayed}
            {displayed.length < text.length && started && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '1em',
                        backgroundColor: 'var(--accent)',
                        marginLeft: '2px',
                        verticalAlign: 'text-bottom'
                    }}
                />
            )}
        </span>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const textY = useTransform(scrollY, [0, 500], [0, 100]);
    const imageY = useTransform(scrollY, [0, 500], [0, 40]);
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') !== 'light'
    );

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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <PageWrapper>
            <div className="panel" style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginTop: isMobile ? '70px' : '100px', // Header spacing
            }}>
                {/* Profile Cover Box */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: isMobile ? '2.5/1' : '4/1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                    overflow: 'hidden',
                }}>
                    {/* Ambient grid dots inside cover */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                        opacity: 0.15,
                        backgroundImage: `radial-gradient(circle, var(--accent) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }} />
                    <div style={{ zIndex: 1, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>
                       <span style={{ color: 'var(--accent)' }}>▸</span> <TypeWriter text="~/portfolio" delay={300} speed={60} />
                    </div>
                </div>

                {/* Profile Header Block */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    width: '100%',
                }}>
                    {/* Avatar Container */}
                    <div style={{
                        padding: '0 1.5rem 1.5rem 1.5rem',
                        borderRight: isMobile ? 'none' : '1px solid var(--border-line)',
                        borderBottom: isMobile ? '1px solid var(--border-line)' : 'none',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <div style={{
                            width: isMobile ? '110px' : '150px',
                            height: isMobile ? '110px' : '150px',
                            marginTop: isMobile ? '-3rem' : '-3rem', // spill into the cover
                            border: '1px solid var(--border-line)',
                            backgroundColor: 'var(--bg-base)',
                            padding: '4px',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            <img
                                src="/assets/pfp_new.jpeg"
                                alt="Aryan Sharma"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    filter: isDark ? 'grayscale(80%) contrast(1.2)' : 'grayscale(20%)',
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
                                <Mail size={14} /> Email Me
                            </MagneticButton>
                            <MagneticButton href="resume.pdf" target="_blank">
                                <FileText size={14} /> Resume
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
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '1.1em',
                            backgroundColor: 'var(--accent)',
                        }}
                    />
                </div>
            </div>



            <div className="panel" style={{ paddingBottom: '2rem' }}>
                <About />
            </div>
        </PageWrapper>
    );
};

export default Hero;
