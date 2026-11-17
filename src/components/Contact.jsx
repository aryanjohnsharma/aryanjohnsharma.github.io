import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { PikaIcon } from '@pikaicons/react';
import { MapPinIcon, EnvelopeIcon, GithubIcon, LinkedinIcon, CalendarIcon, ChatIcon, XComIcon, MultipleCrossCancelIcon } from '@pikaicons/core-free';
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
        icon: <PikaIcon icon={GithubIcon} size={16} />,
        label: "GitHub",
    },
    {
        href: "https://linkedin.com/in/aryanjohnsharma",
        icon: <PikaIcon icon={LinkedinIcon} size={16} />,
        label: "LinkedIn",
    },
    {
        href: "https://signal.me/#eu/DotlTZjESTGpeLRaWfriysKBF5ZbSsqkFXoMK26N9it0fnMk49tPTqsmO1BxXzhP",
        icon: <PikaIcon icon={ChatIcon} size={16} />,
        label: "Signal",
    },
    {
        href: "https://x.com/aryanjohnsharma",
        icon: <PikaIcon icon={XComIcon} size={16} />,
        label: "X",
    },
    {
        href: "mailto:aryanjohnsharma@gmail.com",
        icon: <PikaIcon icon={EnvelopeIcon} size={16} />,
        label: "Email",
    },
    {
        href: "https://cal.com/aryan-sharma-amw1me/15min",
        icon: <PikaIcon icon={CalendarIcon} size={16} />,
        label: "Book a call",
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
                            <PikaIcon icon={MultipleCrossCancelIcon} size={24} />
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
                                        <PikaIcon icon={MapPinIcon} size={14} color="var(--accent)" />
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
