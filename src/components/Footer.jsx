import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-body)',
            backgroundColor: 'var(--bg-base)',
            zIndex: 10,
            position: 'relative'
        }}>
            <p>© {new Date().getFullYear()} Aryan Sharma</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="https://github.com/aryanjohnsharma" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.2s' }}>
                    <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/aryanjohnsharma" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.2s' }}>
                    <Linkedin size={18} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
