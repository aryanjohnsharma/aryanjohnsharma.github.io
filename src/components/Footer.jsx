import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--accent)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-base)',
            zIndex: 10,
            position: 'relative',
            letterSpacing: '1px',
            textTransform: 'uppercase',
        }}>
            <p>© {new Date().getFullYear()} Aryan Sharma</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a
                    href="https://github.com/aryanjohnsharma"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                    <Github size={18} />
                </a>
                <a
                    href="https://linkedin.com/in/aryanjohnsharma"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                    <Linkedin size={18} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
