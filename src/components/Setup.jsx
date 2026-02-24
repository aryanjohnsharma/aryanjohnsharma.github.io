import { motion } from 'framer-motion';
import { Monitor, Terminal, Headphones, Palette } from 'lucide-react';
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

const SetupCard = ({ title, icon: Icon, items, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                <Icon size={24} color="var(--accent)" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 500, fontFamily: 'var(--font-serif)' }}>{title}</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-body)' }}>
                {items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.name}:</span>
                        {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-body)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)', textUnderlineOffset: '3px' }}>
                                {item.desc}
                            </a>
                        ) : (
                            <span>{item.desc}</span>
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const Setup = () => {
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
            <div style={{ padding: '8rem 0', minHeight: '100vh', width: '100%' }}>
                <SectionHeader title="My Setup." />
                <div style={{ marginBottom: '2rem', color: 'var(--text-body)', fontSize: '1.2rem', maxWidth: '600px' }}>
                    The tools and gear that power my work
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginTop: '3rem'
                }}>
                    <SetupCard title="Hardware" icon={Monitor} items={hardware} delay={0.1} />
                    <SetupCard title="Dev Tools" icon={Terminal} items={devTools} delay={0.2} />
                    <SetupCard title="Audio Gear" icon={Headphones} items={audio} delay={0.3} />
                    <SetupCard title="Creative Tools" icon={Palette} items={creative} delay={0.4} />
                </div>
            </div>
        </PageWrapper>
    );
};

export default Setup;
