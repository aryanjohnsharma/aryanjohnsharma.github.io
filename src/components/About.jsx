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

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <PageWrapper>
            <div style={{ padding: '8rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <SectionHeader title="About." />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        maxWidth: '800px',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        lineHeight: 1.8,
                        color: 'var(--text-body)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}
                >
                    <p>
                        I'm <span style={{ color: 'var(--text-primary)' }}>Aryan Sharma</span>, a Tech Enthusiast, AI & Software Developer, and IT Professional based in Dhanbad, Jharkhand, India.
                    </p>
                    <p>
                        I'm currently pursuing a B.Tech in IT from Asansol Engineering College. I am deeply passionate about Engineering, Large Language Models (LLMs), Generative AI, and building highly scalable software solutions.
                    </p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginTop: '2rem',
                        padding: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backgroundColor: 'var(--bg-surface)'
                    }}>
                        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--accent)' }} />
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', letterSpacing: '0.5px' }}>
                            "I build things that live on the internet."
                        </p>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default About;
