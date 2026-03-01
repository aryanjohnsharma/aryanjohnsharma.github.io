import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const SectionHeader = ({ title }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2rem' }}
        >
            <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                display: 'inline-block',
                position: 'relative',
                fontWeight: 700,
            }}>
                {title}
                <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '-10px',
                    right: '-10px',
                    height: '2px',
                    backgroundColor: 'var(--accent)',
                    opacity: 0.6,
                    zIndex: -1
                }} />
            </h2>
        </motion.div>
    );
};

const AboutCard = ({ children, delay, colSpan, accent, className = "", style: extraStyle = {} }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay }}
            className={`glass-panel ${className}`}
            style={{
                gridColumn: colSpan,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                borderTop: accent ? '2px solid var(--accent)' : '1px solid var(--bg-elevated)',
                ...extraStyle,
            }}
        >
            {children}
        </motion.div>
    );
};

const About = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div id="about" style={{
            paddingTop: '4rem',
            paddingBottom: '6rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <SectionHeader title="About." />

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gridAutoRows: 'auto',
                gap: '1rem',
                width: '100%',
                maxWidth: '1200px',
                margin: '1rem auto 0'
            }}>

                {/* Main Narrative */}
                <AboutCard delay={0.1} colSpan={isMobile ? 'auto' : '1 / -1'} accent className="shimmer-effect">
                    <div style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                        lineHeight: 1.6,
                        color: 'var(--text-body)',
                    }}>
                        <p style={{ marginBottom: '1rem' }}>
                            I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Aryan Sharma</strong>, a Tech Enthusiast, AI & Software Developer, and IT Professional.
                        </p>
                        <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>
                            I'm currently pursuing a B.Tech in IT from Asansol Engineering College. I am deeply passionate about Engineering, Large Language Models (LLMs), Generative AI, and building highly scalable software solutions that don't just work, but feel incredible to use.
                        </p>
                    </div>
                </AboutCard>

                {/* Location Card */}
                <AboutCard delay={0.2}>
                    <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255, 106, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent)', boxShadow: '0 0 20px var(--accent)' }} />
                        <motion.div
                            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                            style={{ position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}
                        />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: 600 }}>Based In</h3>
                    <p style={{ color: 'var(--text-body)', fontFamily: 'var(--font-mono)', textAlign: 'center', fontSize: '0.85rem' }}>Dhanbad, JH, India</p>
                </AboutCard>

                {/* Philosophy Card */}
                <AboutCard delay={0.3}>
                    <div style={{ width: '30px', height: '2px', backgroundColor: 'var(--accent)', marginBottom: '0.8rem' }} />
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', lineHeight: 1.3, color: 'var(--text-primary)', fontWeight: 600 }}>
                        "I build things that live on the internet."
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.5rem', letterSpacing: '1px' }}>
                            // Philosophy
                    </p>
                </AboutCard>

                {/* Current Focus Card */}
                <AboutCard delay={0.4}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>Current Focus</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Generative AI & LLMs</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Scalable Backend Architecture</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Modern Frontend Experiences</li>
                    </ul>
                </AboutCard>
            </div>
        </div>
    );
};

export default About;
