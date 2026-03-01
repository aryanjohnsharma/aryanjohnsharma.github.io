import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from './PageWrapper';

const skillsData = [
    { id: 'java', name: 'Java', category: 'Languages' },
    { id: 'js', name: 'JavaScript', category: 'Languages' },
    { id: 'python', name: 'Python', category: 'Languages' },
    { id: 'html', name: 'HTML5', category: 'Frontend' },
    { id: 'css', name: 'CSS3', category: 'Frontend' },
    { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend' },
    { id: 'react', name: 'React.js', category: 'Frontend' },
    { id: 'spring', name: 'Spring Boot', category: 'Backend' },
    { id: 'express', name: 'Express.js', category: 'Backend' },
    { id: 'mysql', name: 'MySQL', category: 'Databases' },
    { id: 'mongo', name: 'MongoDB', category: 'Databases' },
    { id: 'supabase', name: 'Supabase', category: 'Databases' },
    { id: 'docker', name: 'Docker', category: 'Tools' },
    { id: 'postman', name: 'Postman', category: 'Tools' },
    { id: 'git', name: 'Git', category: 'Tools' },
    { id: 'github', name: 'GitHub', category: 'Tools' },
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
            <div style={{
                paddingTop: isMobile ? '6rem' : '8rem',
                paddingBottom: '4rem',
                minHeight: '100vh',
                width: '100%'
            }}>
                <SectionHeader title="Skills." />

                {/* Filter buttons — scrollable on mobile */}
                <div style={{
                    marginBottom: '3rem',
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            style={{
                                padding: isMobile ? '0.5rem 1rem' : '0.7rem 1.5rem',
                                backgroundColor: activeFilter === cat ? 'var(--accent)' : 'transparent',
                                color: activeFilter === cat ? '#000000' : 'var(--text-muted)',
                                border: activeFilter === cat ? '1px solid var(--accent)' : '1px solid var(--bg-elevated)',
                                borderRadius: '0',
                                fontFamily: 'var(--font-mono)',
                                fontSize: isMobile ? '0.7rem' : '0.8rem',
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

                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile
                            ? 'repeat(2, 1fr)'
                            : 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '1px',
                        width: '100%',
                        backgroundColor: 'var(--bg-elevated)',
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
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    key={skill.id}
                                    style={{
                                        padding: isMobile ? '1.5rem 0.8rem' : '2.5rem 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        color: 'var(--text-body)',
                                        fontWeight: 500,
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: isMobile ? '0.85rem' : '1rem',
                                        letterSpacing: '0.5px',
                                        cursor: 'default',
                                        backgroundColor: 'var(--bg-surface)',
                                        transition: 'all 0.3s ease',
                                        borderLeft: '2px solid transparent',
                                    }}
                                >
                                    {skill.name}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default Skills;
