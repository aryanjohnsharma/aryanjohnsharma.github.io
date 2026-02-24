import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail } from 'lucide-react';
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

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <PageWrapper>
            <div style={{ padding: '8rem 0', minHeight: '100vh', width: '100%' }}>
                <SectionHeader title="Contact." />

                <div ref={ref} style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    gap: '4rem',
                    alignItems: 'stretch'
                }}>

                    {/* Right Side - Info & QR */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                        <div style={{
                            padding: '2.5rem',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '4px'
                        }}>
                            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Direct Contact</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', color: 'var(--text-body)' }}>
                                <Mail size={18} color="var(--accent)" />
                                <a href="mailto:aryanjohnsharma@gmail.com" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>aryanjohnsharma@gmail.com</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-body)' }}>
                                <MapPin size={18} color="var(--accent)" />
                                <span>Dhanbad, Jharkhand, India</span>
                            </div>
                        </div>

                        <div style={{
                            padding: '2.5rem',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Buy me a Diet Coke</h4>
                            <img src="/assets/QR.jpg" alt="Diet Coke QR" style={{ width: '180px', height: '180px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Contact;
