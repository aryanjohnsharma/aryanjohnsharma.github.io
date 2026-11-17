import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MagicCard, GlobalSpotlight } from './MagicBento';

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
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
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
            style={{
                gridColumn: colSpan,
                height: '100%',
            }}
        >
            <MagicCard
                className={`glass-panel ${className}`}
                style={{
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '1rem',
                    height: '100%',
                    borderTop: accent ? '2px solid var(--accent)' : '1px solid var(--bg-elevated)',
                    ...extraStyle,
                }}
                enableStars={accent}
                enableTilt={true}
                enableMagnetism={true}
                glowColor="255, 106, 0"
            >
                {children}
            </MagicCard>
        </motion.div>
    );
};

const About = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') !== 'light'
    );
    const gridRef = useRef(null);

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
        <div id="about" style={{
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <SectionHeader title="About." />

            <GlobalSpotlight gridRef={gridRef} glowColor="255, 106, 0" />

            <div ref={gridRef} className="bento-section" style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gridAutoRows: 'auto',
                gap: '1rem',
                width: '100%',
                marginTop: '1rem'
            }}>

                {/* Main Narrative */}
                <AboutCard delay={0.1} colSpan={isMobile ? 'auto' : '1 / -1'} accent className="shimmer-effect">
                    <div style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                        lineHeight: 1.6,
                        color: 'var(--text-body)',
                    }}>
                        <p style={{ marginBottom: '1.2rem' }}>
                            I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Aryan Sharma</strong>, a recent B.Tech IT graduate who builds things for the web.
                        </p>
                        <p style={{ marginBottom: '1.2rem', fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>
                            Frontend is where I spend most of my time. Picking up full-stack MERN as I go, building projects that actually connect both ends.
                        </p>
                    </div>
                </AboutCard>

                {/* Location Card */}
                <AboutCard delay={0.2} style={{ padding: 0, overflow: 'hidden', minHeight: '220px' }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '56.25%',
                        minHeight: '220px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        background: 'var(--bg-elevated)',
                    }}>
                        <iframe
                            src="https://maps.google.com/maps?q=Jharkhand&t=m&z=6&ie=UTF8&iwloc=B&output=embed"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                                filter: isDark ? 'invert(0.9) hue-rotate(180deg) brightness(0.86) contrast(0.9)' : 'none',
                                transition: 'filter 0.35s ease',
                            }}
                            title="Map of Jharkhand, India"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </AboutCard>

                {/* Current Focus Card */}
                <AboutCard delay={0.3}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>Current Focus</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> AI Agents</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Personal Growth Systems</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Modern Frontend Experiences</li>
                    </ul>
                </AboutCard>
            </div>
        </div>
    );
};

export default About;
