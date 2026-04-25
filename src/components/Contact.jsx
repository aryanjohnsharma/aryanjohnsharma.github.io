import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Mail, Github, Linkedin, X as XIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import PageWrapper from './PageWrapper';
import BorderGlow from './BorderGlow';

const GLOW_COLOR = '24 100 50';
const GRADIENT_COLORS = ['#FF6A00', '#FF8C33', '#FFB366'];
const BG_DARK = '#0b0b0c';
const BG_LIGHT = '#f7f4ee';

// Replace this with your actual UPI payment link
const UPI_QR_VALUE = 'upi://pay?pa=6200649708@kotakbank&pn=ARYAN%20SHARMA';

const socialLinks = [
    {
        href: "https://github.com/aryanjohnsharma",
        icon: <Github size={16} />,
        label: "GitHub",
    },
    {
        href: "https://linkedin.com/in/aryanjohnsharma",
        icon: <Linkedin size={16} />,
        label: "LinkedIn",
    },
    {
        href: "https://signal.me/#eu/DotlTZjESTGpeLRaWfriysKBF5ZbSsqkFXoMK26N9it0fnMk49tPTqsmO1BxXzhP",
        icon: <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Signal</title><path d="M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125" /></svg>,
        label: "Signal",
    },
    {
        href: "https://x.com/aryanjohnsharma",
        icon: <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>,
        label: "X",
    },
    {
        href: "mailto:aryanjohnsharma@gmail.com",
        icon: <Mail size={16} />,
        label: "Email",
    },
];

const QRLightbox = ({ isOpen, onClose, isDark }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        cursor: 'pointer',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: isDark ? 'rgba(20,20,20,0.85)' : 'rgba(255,255,255,0.92)',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            position: 'relative',
                            cursor: 'default',
                        }}
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            style={{
                                position: 'absolute',
                                top: '-2.5rem',
                                right: '-0.5rem',
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                        >
                            <XIcon size={24} />
                        </button>
                        <QRCodeSVG
                            value={UPI_QR_VALUE}
                            size={280}
                            level="H"
                            bgColor={isDark ? '#1a1a1a' : '#ffffff'}
                            fgColor={isDark ? '#ffffff' : '#000000'}
                        />
                        <p style={{
                            color: isDark ? '#ccc' : '#333',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                        }}>
                            Scan to support
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') !== 'light'
    );
    const [qrOpen, setQrOpen] = useState(false);

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

    const cardBg = isDark ? BG_DARK : BG_LIGHT;
    const qrSize = isMobile ? 120 : 140;

    return (
        <PageWrapper>
            <div style={{ paddingTop: isMobile ? '60px' : '80px' }}></div>
            <div className="pattern-separator"></div>
            <div className="panel" style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-line)'
            }}>
                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    fontWeight: 700,
                }}>
                    Contact.
                </h2>
            </div>

            <div className="panel" style={{ padding: isMobile ? '1rem' : '1.5rem' }}>

                <div ref={ref} style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                    gap: '1rem',
                }}>

                    {/* Contact Surface — socials & location */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ display: 'flex' }}
                    >
                        <BorderGlow
                            edgeSensitivity={7}
                            glowColor={GLOW_COLOR}
                            backgroundColor={cardBg}
                            borderRadius={0}
                            glowRadius={46}
                            glowIntensity={0.8}
                            coneSpread={13}
                            colors={GRADIENT_COLORS}
                            className="contact-card-fill"
                        >
                            <div style={{
                                padding: isMobile ? '1.25rem' : '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '100%',
                                gap: '1.25rem',
                            }}>
                                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                                    // Open Channels
                                </h4>

                                {/* All links as small pill boxes */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                }}>
                                    {/* Location pill (non-link) */}
                                    <div
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '7px 12px',
                                            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                                            color: 'var(--text-body)',
                                            fontSize: '0.78rem',
                                            fontFamily: 'var(--font-mono)',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        <MapPin size={14} color="var(--accent)" />
                                        <span>Dhanbad, IN</span>
                                    </div>
                                    {socialLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.label}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '7px 12px',
                                                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                                                color: 'var(--text-body)',
                                                textDecoration: 'none',
                                                fontSize: '0.78rem',
                                                fontFamily: 'var(--font-mono)',
                                                letterSpacing: '0.5px',
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,106,0,0.1)' : 'rgba(255,106,0,0.08)';
                                                e.currentTarget.style.borderColor = 'var(--accent)';
                                                e.currentTarget.style.color = 'var(--accent)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
                                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                                                e.currentTarget.style.color = 'var(--text-body)';
                                            }}
                                        >
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </BorderGlow>
                    </motion.div>

                    {/* QR Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'flex' }}
                    >
                        <BorderGlow
                            edgeSensitivity={7}
                            glowColor={GLOW_COLOR}
                            backgroundColor={cardBg}
                            borderRadius={0}
                            glowRadius={46}
                            glowIntensity={0.8}
                            coneSpread={13}
                            colors={GRADIENT_COLORS}
                            className="contact-card-fill"
                        >
                            <div
                                onClick={() => setQrOpen(true)}
                                style={{
                                    padding: isMobile ? '1.25rem' : '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    height: '100%',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                            >
                                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: isMobile ? '1rem' : '1.1rem', marginBottom: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Buy me a Diet Coke</h4>
                                <div style={{
                                    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                                    padding: '8px',
                                    display: 'inline-flex',
                                    lineHeight: 0,
                                }}>
                                    <QRCodeSVG
                                        value={UPI_QR_VALUE}
                                        size={qrSize}
                                        level="H"
                                        bgColor={isDark ? '#1a1a1a' : '#ffffff'}
                                        fgColor={isDark ? '#ffffff' : '#000000'}
                                    />
                                </div>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    marginTop: '0.6rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                }}>
                                    Tap to enlarge
                                </p>
                            </div>
                        </BorderGlow>
                    </motion.div>
                </div>
            </div>

            {/* QR Lightbox Modal */}
            <QRLightbox isOpen={qrOpen} onClose={() => setQrOpen(false)} isDark={isDark} />

        </PageWrapper>
    );
};

export default Contact;
