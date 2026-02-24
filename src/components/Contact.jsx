import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, MapPin, Mail } from 'lucide-react';
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
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Please fill in all fields.');
            return;
        }
        // Simulate generic submission
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
    };

    const inputStyle = {
        width: '100%',
        padding: '1.2rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        marginBottom: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s'
    };

    return (
        <PageWrapper>
            <div style={{ padding: '8rem 0', minHeight: '100vh', width: '100%' }}>
                <SectionHeader title="Contact." />

                <div ref={ref} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.2rem',
                            color: 'var(--text-primary)',
                            marginBottom: '2rem',
                            fontWeight: 400
                        }}>Let's Build Something</h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />

                            {status && <p style={{ color: status.includes('successfully') ? '#4ade80' : '#f87171', marginBottom: '1rem', fontSize: '0.9rem', fontFamily: 'var(--font-sans)' }}>{status}</p>}

                            <button type="submit" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                padding: '1rem 2.5rem',
                                backgroundColor: 'var(--accent)',
                                color: 'var(--bg-base)',
                                border: 'none',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                alignSelf: 'flex-start',
                                marginTop: '1rem'
                            }}>
                                <Send size={16} /> Send Message
                            </button>
                        </form>
                    </motion.div>

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
