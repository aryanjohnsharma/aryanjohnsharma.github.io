import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PageWrapper from './PageWrapper';

const SectionHeader = ({ title }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '3rem' }}
        >
            <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                display: 'inline-block',
                position: 'relative'
            }}>
                {title}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '-20px',
                    right: '-20px',
                    height: '1px',
                    backgroundColor: 'var(--accent)',
                    opacity: 0.5,
                    zIndex: -1
                }} />
            </h2>
        </motion.div>
    );
};

const AboutCard = ({ children, delay, colSpan, rowSpan, className = "" }) => {
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
                gridRow: rowSpan,
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.5rem'
            }}
        >
            {children}
        </motion.div>
    );
};

const About = () => {
    return (
        <PageWrapper>
            <div style={{ padding: '8rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <SectionHeader title="About." />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gridAutoRows: 'minmax(250px, auto)',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '2rem auto 0'
                }}>

                    {/* Main Narrative - Large Card */}
                    <AboutCard delay={0.1} colSpan="1 / -1" className="shimmer-effect">
                        <div style={{
                            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                            lineHeight: 1.6,
                            color: 'var(--text-body)',
                            maxWidth: '900px'
                        }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Aryan Sharma</strong>, a Tech Enthusiast, AI & Software Developer, and IT Professional.
                            </p>
                            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
                                I'm currently pursuing a B.Tech in IT from Asansol Engineering College. I am deeply passionate about Engineering, Large Language Models (LLMs), Generative AI, and building highly scalable software solutions that don't just work, but feel incredible to use.
                            </p>
                        </div>
                    </AboutCard>

                    {/* Location Card */}
                    <AboutCard delay={0.2} style={{ alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(245, 166, 35, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent)', boxShadow: '0 0 20px var(--accent)' }} />
                            {/* Pulse effect */}
                            <motion.div
                                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                                style={{ position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}
                            />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Based In</h3>
                        <p style={{ color: 'var(--text-body)', fontFamily: 'var(--font-mono)' }}>Dhanbad, JH, India</p>
                    </AboutCard>

                    {/* Philosophy Card */}
                    <AboutCard delay={0.3}>
                        <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)', marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', lineHeight: 1.3, color: 'var(--text-primary)' }}>
                            "I build things that live on the internet."
                        </h3>
                        <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '1rem' }}>
                            // Philosophy
                        </p>
                    </AboutCard>

                    {/* Education/Detail Card */}
                    <AboutCard delay={0.4}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Focus</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-body)' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} /> Generative AI & LLMs</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} /> Scalable Backend Architecture</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} /> Modern Frontend Experiences</li>
                        </ul>
                    </AboutCard>

                </div>
            </div>
        </PageWrapper>
    );
};

export default About;
