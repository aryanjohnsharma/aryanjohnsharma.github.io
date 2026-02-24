import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, FileText, Code, Cpu, Sparkles } from 'lucide-react';
import PageWrapper from './PageWrapper';

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

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const style = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 2.5rem',
        borderRadius: '2px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: '0.9rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        border: primary ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
        backgroundColor: primary ? 'var(--accent)' : 'transparent',
        color: primary ? 'var(--bg-base)' : 'var(--text-primary)',
        transition: 'background-color 0.3s, color 0.3s',
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
            <Elem href={href} style={style} onClick={onClick}>
                {children}
            </Elem>
        </motion.div>
    );
};

const Hero = () => {
    // Scroll parallax setup
    const { scrollY } = useScroll();
    const textY = useTransform(scrollY, [0, 500], [0, 150]);
    const imageY = useTransform(scrollY, [0, 500], [0, 50]);

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
                justifyContent: 'space-between',
                flexWrap: 'wrap-reverse',
                gap: '4rem',
                paddingTop: '5rem',
                overflow: 'hidden'
            }}>

                {/* Floating Decorative Icons (Background) */}
                <Code className="floating-icon" size={120} style={{ position: 'absolute', top: '15%', left: '-5%', zIndex: 0, opacity: 0.05 }} />
                <Cpu className="floating-icon" size={80} style={{ position: 'absolute', bottom: '20%', left: '40%', zIndex: 0, animationDelay: '1s' }} />
                <Sparkles className="floating-icon" size={100} style={{ position: 'absolute', top: '25%', right: '10%', zIndex: 0, animationDelay: '2s', opacity: 0.05 }} />

                {/* Left Side: Text Content */}
                <motion.div variants={container} initial="hidden" animate="show" style={{ flex: '1 1 500px', y: textY, position: 'relative', zIndex: 1 }}>
                    <motion.div variants={item} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: 'var(--accent)',
                        marginBottom: '1rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        Hello! I'm
                    </motion.div>
                    <motion.h1 variants={item} style={{
                        fontFamily: 'var(--font-hero)',
                        fontSize: 'clamp(4rem, 10vw, 8rem)',
                        lineHeight: 1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)'
                    }}>
                        Aryan Sharma
                    </motion.h1>

                    <motion.h2 variants={item} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                        fontWeight: 400,
                        color: 'var(--text-body)',
                        marginBottom: '1.5rem',
                        maxWidth: '600px',
                        lineHeight: 1.4
                    }}>
                        Developer // Freelancer
                    </motion.h2>

                    <motion.div variants={item} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        color: 'var(--text-body)',
                        marginBottom: '3.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>Tech Enthusiast | AI & Software Developer</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                            style={{ display: 'inline-block', width: '10px', height: '1.2em', backgroundColor: 'var(--accent)' }}
                        />
                    </motion.div>

                    <motion.div variants={item} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <MagneticButton primary onClick={() => window.location.href = 'mailto:aryanjohnsharma@gmail.com'}>
                            <Mail size={16} /> Email Me
                        </MagneticButton>
                        <MagneticButton href="resume.pdf" target="_blank">
                            <FileText size={16} /> View Resume
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Right Side: Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', y: imageY, position: 'relative', zIndex: 1 }}
                >
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '380px',
                        aspectRatio: '4/5',
                    }}>
                        {/* Minimal Decorative Offset Border */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            right: '-20px',
                            bottom: '-20px',
                            border: '1px solid var(--accent)',
                            opacity: 0.5,
                            zIndex: 0,
                            transition: 'transform 0.5s ease'
                        }}
                            className="pfp-border"
                        />
                        {/* The Image */}
                        <img
                            src="/assets/pfp_new.jpeg"
                            alt="Aryan Sharma"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'relative',
                                zIndex: 1,
                                filter: 'grayscale(100%) contrast(1.1)',
                                transition: 'all 0.5s ease',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                                e.currentTarget.previousSibling.style.transform = 'translate(10px, 10px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)';
                                e.currentTarget.previousSibling.style.transform = 'translate(0px, 0px)';
                            }}
                        />
                    </div>
                </motion.div>

            </div>
        </PageWrapper>
    );
};

export default Hero;
