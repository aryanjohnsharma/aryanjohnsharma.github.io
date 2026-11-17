import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PikaIcon } from '@pikaicons/react';
import {
    CodeIcon, PaintBrushIcon, GridDashboard02Icon, LayerThreeIcon, CloudIcon,
    DatabaseIcon, Package01Icon, SendPlaneHorizontalIcon, GitBranchIcon,
    GithubIcon, PhotoImageIcon, SparkleAi01Icon, VideoCallIcon,
} from '@pikaicons/core-free';
import PageWrapper from './PageWrapper';

const skillsData = [
    { id: 'java', name: 'Java', category: 'Languages', href: 'https://www.java.com/', icon: CodeIcon },
    { id: 'js', name: 'JavaScript', category: 'Languages', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', icon: CodeIcon },
    { id: 'python', name: 'Python', category: 'Languages', href: 'https://www.python.org/', icon: CodeIcon },
    { id: 'html', name: 'HTML5', category: 'Frontend', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML', icon: CodeIcon },
    { id: 'css', name: 'CSS3', category: 'Frontend', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: PaintBrushIcon },
    { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', href: 'https://getbootstrap.com/', icon: GridDashboard02Icon },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', href: 'https://tailwindcss.com/', icon: PaintBrushIcon },
    { id: 'react', name: 'React.js', category: 'Frontend', href: 'https://react.dev/', icon: LayerThreeIcon },
    { id: 'spring', name: 'Spring Boot', category: 'Backend', href: 'https://spring.io/projects/spring-boot', icon: CloudIcon },
    { id: 'express', name: 'Express.js', category: 'Backend', href: 'https://expressjs.com/', icon: CodeIcon },
    { id: 'mysql', name: 'MySQL', category: 'Databases', href: 'https://www.mysql.com/', icon: DatabaseIcon },
    { id: 'mongo', name: 'MongoDB', category: 'Databases', href: 'https://www.mongodb.com/', icon: DatabaseIcon },
    { id: 'supabase', name: 'Supabase', category: 'Databases', href: 'https://supabase.com/', icon: DatabaseIcon },
    { id: 'docker', name: 'Docker', category: 'Tools', href: 'https://www.docker.com/', icon: Package01Icon },
    { id: 'postman', name: 'Postman', category: 'Tools', href: 'https://www.postman.com/', icon: SendPlaneHorizontalIcon },
    { id: 'git', name: 'Git', category: 'Tools', href: 'https://git-scm.com/', icon: GitBranchIcon },
    { id: 'github', name: 'GitHub', category: 'Tools', href: 'https://github.com/', icon: GithubIcon },
    { id: 'photoshop', name: 'Photoshop', category: 'Tools', href: 'https://www.adobe.com/products/photoshop.html', icon: PhotoImageIcon },
    { id: 'topaz-video-ai', name: 'Topaz Video AI', category: 'Tools', href: 'https://www.topazlabs.com/topaz-video-ai', icon: SparkleAi01Icon },
    { id: 'handbrake', name: 'HandBrake', category: 'Tools', href: 'https://handbrake.fr/', icon: VideoCallIcon },
    { id: 'davinci-resolve', name: 'DaVinci Resolve', category: 'Tools', href: 'https://www.blackmagicdesign.com/products/davinciresolve', icon: VideoCallIcon },
];

const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools'];

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

const Skills = () => {
    const [activeFilter, setActiveFilter] = useState('All');
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

    const filteredSkills = skillsData.filter(skill =>
        activeFilter === 'All' ? true : skill.category === activeFilter
    );

    return (
        <PageWrapper>
            <div style={{ paddingTop: isMobile ? '60px' : '80px' }}></div>
            <div className="panel" style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '100%',
                borderBottom: '1px solid var(--border-line)'
            }}>
                <div style={{ marginBottom: isMobile ? '1rem' : '0' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        display: 'inline-block',
                        position: 'relative',
                        fontWeight: 700,
                    }}>
                        Skills.
                    </h2>
                </div>

                {/* Filter buttons */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            style={{
                                padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                                backgroundColor: activeFilter === cat ? 'var(--accent)' : 'var(--bg-surface)',
                                color: activeFilter === cat ? '#000000' : 'var(--text-muted)',
                                border: '1px solid var(--border-line)',
                                borderRadius: '0',
                                fontFamily: 'var(--font-mono)',
                                fontSize: isMobile ? '0.65rem' : '0.75rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: activeFilter === cat ? 600 : 400,
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="panel" style={{ padding: '0', width: '100%' }}>
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile
                            ? 'repeat(2, 1fr)'
                            : 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1px',
                        width: '100%',
                        backgroundColor: 'var(--border-line)',
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="shimmer-effect"
                                    style={{
                                        padding: isMobile ? '1.5rem 1rem' : '2.5rem 1.5rem',
                                        height: isMobile ? '70px' : '100px',
                                        backgroundColor: 'var(--bg-surface)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                />
                            ))
                        ) : (
                            filteredSkills.map(skill => (
                                <motion.a
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    key={skill.id}
                                    href={skill.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${skill.name} website`}
                                    className="skill-link"
                                    style={{
                                        padding: isMobile ? '1rem 0.8rem' : '1.35rem 1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: isMobile ? '0.65rem' : '0.85rem',
                                        minHeight: isMobile ? '84px' : '94px',
                                        textAlign: 'left',
                                        color: 'var(--text-body)',
                                        fontWeight: 500,
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: isMobile ? '0.82rem' : '0.95rem',
                                        letterSpacing: '0',
                                        cursor: 'pointer',
                                        backgroundColor: 'var(--bg-surface)',
                                        transition: 'all 0.3s ease',
                                        borderLeft: '2px solid transparent',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: isMobile ? '34px' : '40px',
                                            height: isMobile ? '34px' : '40px',
                                            flex: '0 0 auto',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid var(--border-line)',
                                            backgroundColor: 'var(--bg-elevated)',
                                        }}
                                    >
                                        <PikaIcon
                                            icon={skill.icon}
                                            size={26}
                                            aria-hidden="true"
                                            className="skill-icon"
                                        />
                                    </span>
                                    <span style={{
                                        minWidth: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.25rem',
                                    }}>
                                        <span style={{
                                            color: 'var(--text-primary)',
                                            lineHeight: 1.1,
                                            overflowWrap: 'anywhere',
                                        }}>
                                            {skill.name}
                                        </span>
                                        <span style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: isMobile ? '0.58rem' : '0.65rem',
                                            letterSpacing: '0.08em',
                                            lineHeight: 1,
                                            textTransform: 'uppercase',
                                        }}>
                                            {skill.category}
                                        </span>
                                    </span>
                                </motion.a>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

        </PageWrapper>
    );
};

export default Skills;
