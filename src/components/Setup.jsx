import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PikaIcon } from '@pikaicons/react';
import {
    LaptopIcon, PhoneIcon, KeyboardWirelessIcon, Settings01Icon,
    CodeIcon, GithubIcon, FigmaIcon, HeadphonesIcon, SpeakerOnIcon,
    LinkChainHorizontalIcon, VolumeTwoIcon, PhotoImageIcon, VideoCallIcon,
    SparkleAi01Icon, PhotoImagePlusIcon, PaintBrushIcon,
} from '@pikaicons/core-free';
import PageWrapper from './PageWrapper';

const HeliumBrowserIcon = () => (
    <svg role="img" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <title>Helium Browser</title>
        <path fill="#3450D1" d="M14.3081 22.2984 12 24l-2.3081-1.7016 1.0489-8.1189-6.5174 4.9661L1.5938 18l.321-2.8467L9.4808 12l-7.566-3.1533L1.5938 6l2.6296-1.1456 6.5174 4.9661-1.049-8.119L12 0l2.3081 1.7016-1.0488 8.1189 6.5173-4.9661L22.4062 6l-.321 2.8467L14.5192 12l7.566 3.1533.321 2.8467-2.6296 1.1456-6.5173-4.9661z" />
    </svg>
);

const ZenBrowserIcon = () => (
    <svg role="img" viewBox="0 0 64 64" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Zen Browser</title>
        <path fill="#F76F53" fillRule="evenodd" d="M32 44.308c6.797 0 12.308-5.51 12.308-12.308 0-6.797-5.51-12.308-12.308-12.308-6.797 0-12.308 5.51-12.308 12.308 0 6.797 5.51 12.308 12.308 12.308ZM41.846 32c0 5.438-4.408 9.846-9.846 9.846S22.154 37.438 22.154 32s4.408-9.846 9.846-9.846 9.846 4.408 9.846 9.846Z" clipRule="evenodd" />
        <path fill="#F76F53" fillRule="evenodd" d="M53.333 32c0 11.782-9.55 21.333-21.333 21.333-11.782 0-21.333-9.55-21.333-21.333 0-11.782 9.55-21.333 21.333-21.333 11.782 0 21.333 9.55 21.333 21.333ZM32 49.23c9.516 0 17.23-7.714 17.23-17.23S41.517 14.77 32 14.77 14.77 22.483 14.77 32 22.483 49.23 32 49.23Z" clipRule="evenodd" />
        <path fill="#F76F53" fillRule="evenodd" d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32ZM32 58.256c14.501 0 26.256-11.755 26.256-26.256S46.501 5.744 32 5.744 5.744 17.499 5.744 32 17.499 58.256 32 58.256Z" clipRule="evenodd" />
    </svg>
);

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
                    <PikaIcon icon={Icon} size={isMobile ? 18 : 22} color="var(--accent)" aria-hidden="true" />
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
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', lineHeight: 1.5, fontSize: isMobile ? '0.85rem' : '0.95rem', minWidth: 0 }}>
                            <span style={{ display: 'inline-flex', flex: '0 0 16px', width: '16px', height: '16px', marginTop: '0.15rem', color: 'var(--accent)' }}>
                                {item.customIcon || <PikaIcon icon={item.icon} size={16} color="currentColor" aria-hidden="true" />}
                            </span>
                            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.35rem', minWidth: 0, overflowWrap: 'anywhere' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.name}:</span>
                                {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                                        style={{ color: 'var(--text-body)', textDecoration: 'underline', textDecorationColor: 'rgba(255,106,0,0.3)', textUnderlineOffset: '3px', transition: 'color 0.2s', overflowWrap: 'anywhere' }}>
                                        {item.desc}
                                    </a>
                                ) : (
                                    <span>{item.desc}</span>
                                )}
                            </span>
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
        { name: 'Laptop', desc: 'MSI Alpha 15 (B5EX)', icon: LaptopIcon, link: 'https://www.msi.com/Laptop/Alpha-15-B5EX/Specification' },
        { name: 'Primary Phone', desc: 'Nothing Phone (3a)', icon: PhoneIcon, link: 'https://in.nothing.tech/products/phone-3a' },
        { name: 'Secondary Phone', desc: 'Pixel 4a', icon: PhoneIcon, link: 'https://www.gsmarena.com/google_pixel_4a-10123.php' },
        { name: 'Keyboard', desc: 'Redragon K617 Fizz', icon: KeyboardWirelessIcon, link: 'https://www.redragonzone.com/products/redragon-k617-fizz' },
        { name: 'Mouse', desc: 'Logitech G203', icon: Settings01Icon, link: 'https://www.logitechg.com/en-us/products/gaming-mice/g203-lightsync-rgb-gaming-mouse.910-005792.html' },
    ];

    const devTools = [
        { name: 'Firefox-based', desc: 'Zen Browser', customIcon: <ZenBrowserIcon /> },
        { name: 'Chromium-based', desc: 'Helium Browser', customIcon: <HeliumBrowserIcon /> },
        { name: 'VS Code', desc: 'Code editing', icon: CodeIcon },
        { name: 'IntelliJ IDEA', desc: 'Java & Kotlin', icon: CodeIcon },
        { name: 'Eclipse IDE', desc: 'Java & C++', icon: CodeIcon },
        { name: 'NetBeans', desc: 'Java & PHP', icon: CodeIcon },
        { name: 'GitHub Desktop', desc: 'Version control', icon: GithubIcon },
        { name: 'Figma', desc: 'UI/UX design', icon: FigmaIcon },
    ];

    const audio = [
        { name: 'Sony WH-CH720N', desc: 'Wireless ANC', icon: HeadphonesIcon },
        { name: '7Hz Salnotes Zero', desc: 'Neutral IEMs', icon: HeadphonesIcon },
        { name: 'KZ ZSN PRO 2', desc: 'Hybrid IEMs', icon: HeadphonesIcon },
        { name: 'AUDIOCULAR D07', desc: 'Portable DAC', icon: SpeakerOnIcon },
        { name: 'NICEHCK BlackCat', desc: 'IEM Cable', icon: LinkChainHorizontalIcon },
        { name: 'Moondrop Spring Tips', desc: 'Eartips', icon: VolumeTwoIcon },
    ];

    const creative = [
        { name: 'Adobe Photoshop', desc: 'Photo editing & design', icon: PhotoImageIcon },
        { name: 'DaVinci Resolve', desc: 'Video editing & color', icon: VideoCallIcon },
        { name: 'Adobe Lightroom', desc: 'Photo grading & tuning', icon: PhotoImageIcon },
        { name: 'Adobe Premiere Pro', desc: 'Timeline video edits', icon: VideoCallIcon },
        { name: 'CapCut Desktop', desc: 'Quick social edits', icon: VideoCallIcon },
        { name: 'Topaz Video AI', desc: 'AI video upscaling', icon: SparkleAi01Icon },
        { name: 'Topaz Photo AI', desc: 'Image enhancement', icon: PhotoImagePlusIcon },
        { name: 'Runway ML', desc: 'AI video tools', icon: SparkleAi01Icon },
        { name: 'HandBrake', desc: 'Video compression', icon: VideoCallIcon },
    ];

    return (
        <PageWrapper>
            <div style={{ paddingTop: isMobile ? '60px' : '80px' }}></div>
            <div className="pattern-separator"></div>
            <div className="panel" style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-line)'
            }}>
                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    fontWeight: 700,
                    marginBottom: '1rem'
                }}>
                    My Setup.
                </h2>
                <div style={{
                    maxWidth: '600px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.5px',
                    lineHeight: 1.6,
                }}>
                    <span style={{
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        color: 'var(--text-body)',
                        fontWeight: 500,
                    }}>
                        Hardware <span style={{ color: 'var(--accent)', fontWeight: 700 }}>&amp;&amp;</span> software I keep in my toolbox.
                    </span>
                </div>
            </div>

            <div className="panel" style={{ padding: '1.5rem' }}>

                <AnimatePresence mode="popLayout">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1rem',
                        marginTop: '2rem'
                    }}>
                        <SetupCard title="Hardware" icon={LaptopIcon} items={hardware} delay={0.1} isLoading={isLoading} isMobile={isMobile} />
                        <SetupCard title="Dev Tools" icon={CodeIcon} items={devTools} delay={0.2} isLoading={isLoading} isMobile={isMobile} />
                        <SetupCard title="Audio Gear" icon={HeadphonesIcon} items={audio} delay={0.3} isLoading={isLoading} isMobile={isMobile} />
                        <SetupCard title="Creative Tools" icon={PaintBrushIcon} items={creative} delay={0.4} isLoading={isLoading} isMobile={isMobile} />
                    </div>
                </AnimatePresence>
            </div>

        </PageWrapper>
    );
};

export default Setup;
