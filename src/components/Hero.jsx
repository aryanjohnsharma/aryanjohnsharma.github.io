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

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
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
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '2.5rem' : '4rem',
                paddingTop: isMobile ? '6rem' : '5rem',
                paddingBottom: isMobile ? '3rem' : '0',
                overflow: 'hidden'
            }}>

                {/* Ambient grid dots */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.12,
                    backgroundImage: `radial-gradient(circle, var(--accent) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                }} />

                {/* Profile Picture — on top for mobile */}
                {isMobile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}
                    >
                        <div style={{
                            position: 'relative',
                            width: '200px',
                            aspectRatio: '4/5',
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px', left: '10px', right: '-10px', bottom: '-10px',
                                border: '2px solid var(--accent)',
                                opacity: 0.6, zIndex: 0,
                            }} />
                            <img
                                src="/assets/pfp_new.jpeg"
                                alt="Aryan Sharma"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    position: 'relative', zIndex: 1,
                                    filter: 'grayscale(80%) contrast(1.2) brightness(0.9)',
                                }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Text Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    style={{
                        flex: isMobile ? 'none' : '1 1 500px',
                        width: isMobile ? '100%' : 'auto',
                        position: 'relative',
                        zIndex: 1,
                        y: isMobile ? 0 : textY,
                    }}
                >
                    {/* Terminal label */}
                    <motion.div variants={item} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1.2rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span style={{ color: 'var(--accent)' }}>▸</span>
                        <TypeWriter text="~/portfolio" delay={300} speed={60} />
                    </motion.div>

                    <motion.h1 variants={item} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: isMobile ? 'clamp(2.8rem, 12vw, 4rem)' : 'clamp(3.5rem, 9vw, 7rem)',
                        lineHeight: 0.95,
                        marginBottom: '1.2rem',
                        letterSpacing: '-0.04em',
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                    }}>
                        <ShinyText text="Aryan" speed={3} color="#ffffff" shineColor="#FF6A00" spread={120} />
                        <br />
                        <ShinyText text="Sharma" speed={3} color="#FF6A00" shineColor="#ffffff" spread={120} />
                    </motion.h1>

                    <motion.h2 variants={item} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: isMobile ? '0.9rem' : 'clamp(1rem, 2vw, 1.3rem)',
                        fontWeight: 400,
                        color: 'var(--text-body)',
                        marginBottom: '1.2rem',
                        maxWidth: '550px',
                        lineHeight: 1.6,
                        letterSpacing: '0.5px',
                    }}>
                        Developer <span style={{ color: 'var(--accent)' }}>//</span> Freelancer
                    </motion.h2>

                    <motion.div variants={item} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: isMobile ? '0.75rem' : '0.9rem',
                        color: 'var(--text-muted)',
                        marginBottom: isMobile ? '2.5rem' : '3.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                    }}>
                        <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                        <span>Tech Enthusiast | AI & Software Developer</span>
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
                    </motion.div>

                    <motion.div variants={item} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <MagneticButton primary onClick={() => window.location.href = 'mailto:aryanjohnsharma@gmail.com'}>
                            <Mail size={14} /> Email Me
                        </MagneticButton>
                        <MagneticButton href="resume.pdf" target="_blank">
                            <FileText size={14} /> Resume
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Desktop: Profile Picture on right */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, y: imageY }}
                    >
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '380px',
                            aspectRatio: '4/5',
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '15px', left: '15px', right: '-15px', bottom: '-15px',
                                border: '2px solid var(--accent)',
                                opacity: 0.6, zIndex: 0,
                                transition: 'all 0.5s ease'
                            }} className="pfp-border" />
                            <img
                                src="/assets/pfp_new.jpeg"
                                alt="Aryan Sharma"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    position: 'relative', zIndex: 1,
                                    filter: 'grayscale(80%) contrast(1.2) brightness(0.9)',
                                    transition: 'all 0.5s ease', cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1) brightness(1)';
                                    e.currentTarget.previousSibling.style.transform = 'translate(8px, 8px)';
                                    e.currentTarget.previousSibling.style.opacity = '1';
                                    e.currentTarget.previousSibling.style.boxShadow = '0 0 30px rgba(255,106,0,0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.filter = 'grayscale(80%) contrast(1.2) brightness(0.9)';
                                    e.currentTarget.previousSibling.style.transform = 'translate(0px, 0px)';
                                    e.currentTarget.previousSibling.style.opacity = '0.6';
                                    e.currentTarget.previousSibling.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Embedded About Section */}
            <About />
        </PageWrapper>
    );
};

export default Hero;
