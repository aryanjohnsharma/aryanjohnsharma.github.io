import { useState } from 'react';
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

const Skills = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredSkills = skillsData.filter(skill =>
        activeFilter === 'All' ? true : skill.category === activeFilter
    );

    return (
        <PageWrapper>
            <div style={{ padding: '8rem 0', minHeight: '100vh', width: '100%' }}>
                <SectionHeader title="Skills." />

                <div style={{ marginBottom: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                backgroundColor: activeFilter === cat ? 'var(--text-primary)' : 'transparent',
                                color: activeFilter === cat ? 'var(--bg-base)' : 'var(--text-primary)',
                                border: `1px solid ${activeFilter === cat ? 'var(--text-primary)' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '30px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '1.5rem',
                        width: '100%'
                    }}
                >
                    <AnimatePresence>
                        {filteredSkills.map(skill => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={skill.id}
                                style={{
                                    padding: '2.5rem 1.5rem',
                                    backgroundColor: 'var(--bg-surface)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    color: 'var(--text-body)',
                                    fontWeight: 400,
                                    fontFamily: 'var(--font-sans)',
                                    borderRadius: '4px',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {skill.name}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default Skills;
