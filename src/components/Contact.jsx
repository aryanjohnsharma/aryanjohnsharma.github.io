import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Mail } from 'lucide-react';
import PageWrapper from './PageWrapper';

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

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <PageWrapper>
            <div style={{
                paddingTop: isMobile ? '6rem' : '8rem',
                paddingBottom: '4rem',
                minHeight: '100vh',
                width: '100%'
            }}>
                <SectionHeader title="Contact." />

                <div ref={ref} style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '1rem' : '2rem',
                    alignItems: 'stretch'
                }}>

                    {/* Direct Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            padding: isMobile ? '1.5rem' : '2.5rem',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--bg-elevated)',
                            borderTop: '2px solid var(--accent)',
                            flex: '1',
                            minWidth: 0,
                        }}
                    >
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: isMobile ? '1.1rem' : '1.3rem', marginBottom: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginRight: '6px' }}>//</span>
                            Direct Contact
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-body)', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                            <Mail size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <a href="mailto:aryanjohnsharma@gmail.com"
                                style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s', wordBreak: 'break-all' }}>
                                aryanjohnsharma@gmail.com
                            </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-body)', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                            <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <span>Dhanbad, Jharkhand, India</span>
                        </div>
                    </motion.div>

                    {/* QR Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            padding: isMobile ? '1.5rem' : '2.5rem',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--bg-elevated)',
                            borderTop: '2px solid var(--accent)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: isMobile ? '1rem' : '1.2rem', marginBottom: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>Buy me a Diet Coke</h4>
                        <img
                            src="/assets/QR.jpg"
                            alt="Diet Coke QR"
                            style={{
                                width: isMobile ? '150px' : '180px',
                                height: isMobile ? '150px' : '180px',
                                border: '1px solid var(--bg-elevated)',
                                filter: 'contrast(1.1)',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Contact;
