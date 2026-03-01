import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Terminal, Headphones, Palette } from 'lucide-react';
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

const SetupCard = ({ title, icon: Icon, items, delay, isLoading, isMobile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="glass-panel"
            style={{
                padding: isMobile ? '1.5rem' : '2.5rem',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
                {isLoading ? (
                    <div className="shimmer-effect" style={{ width: '22px', height: '22px', backgroundColor: 'rgba(255,106,0,0.1)', position: 'relative', overflow: 'hidden' }} />
                ) : (
                    <Icon size={isMobile ? 18 : 22} color="var(--accent)" />
                )}
                {isLoading ? (
                    <div className="shimmer-effect" style={{ width: '100px', height: '22px', backgroundColor: 'rgba(255,106,0,0.05)', position: 'relative', overflow: 'hidden' }} />
                ) : (
                    <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: 600, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginRight: '6px' }}>//</span>
                        {title}
                    </h3>
                )}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-body)' }}>
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <li key={i} className="shimmer-effect" style={{ width: '100%', height: '18px', backgroundColor: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }} />
                    ))
                ) : (
                    items.map((item, i) => (
                        <li key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', lineHeight: 1.5, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.name}:</span>
                            {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer"
                                    style={{ color: 'var(--text-body)', textDecoration: 'underline', textDecorationColor: 'rgba(255,106,0,0.3)', textUnderlineOffset: '3px', transition: 'color 0.2s' }}>
                                    {item.desc}
                                </a>
                            ) : (
                                <span>{item.desc}</span>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </motion.div>
    );
};

const Setup = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const hardware = [
        { name: 'Laptop', desc: 'MSI Alpha 15 (B5EX)', link: 'https://www.msi.com/Laptop/Alpha-15-B5EX/Specification' },
        { name: 'Primary Phone', desc: 'Nothing Phone (3a)', link: 'https://in.nothing.tech/products/phone-3a' },
        { name: 'Secondary Phone', desc: 'Pixel 4a', link: 'https://www.gsmarena.com/google_pixel_4a-10123.php' },
        { name: 'Keyboard', desc: 'Redragon K617 Fizz', link: 'https://www.redragonzone.com/products/redragon-k617-fizz' },
        { name: 'Mouse', desc: 'Logitech G203', link: 'https://www.logitechg.com/en-us/products/gaming-mice/g203-lightsync-rgb-gaming-mouse.910-005792.html' },
    ];

    const devTools = [
        { name: 'Firefox-based', desc: 'Zen Browser' },
        { name: 'Chromium-based', desc: 'Vivaldi' },
        { name: 'VS Code', desc: 'Code editing' },
        { name: 'IntelliJ IDEA', desc: 'Java & Kotlin' },
        { name: 'Eclipse IDE', desc: 'Java & C++' },
        { name: 'NetBeans', desc: 'Java & PHP' },
        { name: 'GitHub Desktop', desc: 'Version control' },
        { name: 'Figma', desc: 'UI/UX design' },
    ];

    const audio = [
        { name: 'Sony WH-CH720N', desc: 'Wireless ANC' },
        { name: '7Hz Salnotes Zero', desc: 'Neutral IEMs' },
        { name: 'KZ ZSN PRO 2', desc: 'Hybrid IEMs' },
        { name: 'AUDIOCULAR D07', desc: 'Portable DAC' },
        { name: 'NICEHCK BlackCat', desc: 'IEM Cable' },
        { name: 'Moondrop Spring Tips', desc: 'Eartips' },
    ];

    const creative = [
        { name: 'Adobe Photoshop', desc: 'Photo editing & design' },
        { name: 'DaVinci Resolve', desc: 'Video editing & color' },
        { name: 'Adobe Lightroom', desc: 'Photo grading & tuning' },
        { name: 'Adobe Premiere Pro', desc: 'Timeline video edits' },
        { name: 'CapCut Desktop', desc: 'Quick social edits' },
        { name: 'Topaz Video AI', desc: 'AI video upscaling' },
        { name: 'Topaz Photo AI', desc: 'Image enhancement' },
        { name: 'Runway ML', desc: 'AI video tools' },
        { name: 'HandBrake', desc: 'Video compression' },
    ];

    return (
        <PageWrapper>
            <div style={{
                paddingTop: isMobile ? '6rem' : '8rem',
                paddingBottom: '4rem',
                minHeight: '100vh',
                width: '100%'
            }}>
                <SectionHeader title="My Setup." />
                <div style={{
                    marginBottom: '1.5rem',
                    maxWidth: '600px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.5px',
                    lineHeight: 1.6,
                }}>
                    <span style={{
                        fontSize: isMobile ? '1rem' : '1.15rem',
                        color: 'var(--text-body)',
                        fontWeight: 500,
                    }}>
                        Hardware <span style={{ color: 'var(--accent)', fontWeight: 700 }}>&amp;&amp;</span> software
                    </span>
                    <br />
                    <span style={{
                        fontSize: isMobile ? '0.85rem' : '0.95rem',
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                    }}>
                        I keep in my toolbox.
                    </span>
                </div>

                <AnimatePresence mode="popLayout">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1rem',
                        marginTop: '2rem'
                    }}>
                        <SetupCard title="Hardware" icon={Monitor} items={hardware} delay={0.1} isLoading={isLoading} isMobile={isMobile} />
                        <SetupCard title="Dev Tools" icon={Terminal} items={devTools} delay={0.2} isLoading={isLoading} isMobile={isMobile} />
                        <SetupCard title="Audio Gear" icon={Headphones} items={audio} delay={0.3} isLoading={isLoading} isMobile={isMobile} />
                        <SetupCard title="Creative Tools" icon={Palette} items={creative} delay={0.4} isLoading={isLoading} isMobile={isMobile} />
                    </div>
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
};

export default Setup;
