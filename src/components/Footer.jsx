import { PikaIcon } from '@pikaicons/react';
import { GithubIcon, LinkedinIcon, EnvelopeIcon, ChatIcon, XComIcon, CodeIcon, PaintBrushIcon } from '@pikaicons/core-free';

const Footer = ({ hideSocials = false }) => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            href: "https://github.com/aryanjohnsharma",
            icon: <PikaIcon icon={GithubIcon} size={32} aria-hidden="true" />,
            label: "GitHub",
        },
        {
            href: "https://linkedin.com/in/aryanjohnsharma",
            icon: <PikaIcon icon={LinkedinIcon} size={32} aria-hidden="true" />,
            label: "LinkedIn",
        },
        {
            href: "https://signal.me/#eu/DotlTZjESTGpeLRaWfriysKBF5ZbSsqkFXoMK26N9it0fnMk49tPTqsmO1BxXzhP",
            icon: <PikaIcon icon={ChatIcon} size={32} aria-hidden="true" />,
            label: "Signal",
        },
        {
            href: "https://x.com/aryanjohnsharma",
            icon: <PikaIcon icon={XComIcon} size={32} aria-hidden="true" />,
            label: "X (Twitter)",
        },
        {
            href: "mailto:aryanjohnsharma@gmail.com",
            icon: <PikaIcon icon={EnvelopeIcon} size={32} aria-hidden="true" />,
            label: "Email",
        },
    ];

    const techStack = [
        {
            name: "React",
            icon: <PikaIcon icon={CodeIcon} size={20} className="tech-icon" aria-hidden="true" />,
        },
        {
            name: "CSS",
            icon: <PikaIcon icon={PaintBrushIcon} size={20} className="tech-icon" aria-hidden="true" />,
        },
        {
            name: "GitHub Pages",
            icon: <PikaIcon icon={GithubIcon} size={20} className="tech-icon" aria-hidden="true" />,
        },
    ];

    return (
        <>
            <div className="page-container">
                <div className="pattern-separator"></div>
            </div>
            <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-grid">
                    {/* Column 1 */}
                    {!hideSocials && (
                    <div className="footer-col footer-col-socials">
                        <div className="footer-social-links">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="footer-social-link"
                                >
                                    <div className="footer-social-icon">
                                        {link.icon}
                                    </div>
                                </a>
                            ))}
                        </div>
                        {/* Empty placeholder for LikeButton layout balance */}
                        <div className="footer-like-placeholder"></div>
                    </div>
                    )}

                    {/* Column 2 */}
                    <div className="footer-col footer-col-tech">
                        <div className="footer-tech-stack">
                            {techStack.map((tech, index) => (
                                <div key={index} className="footer-tech-item">
                                    <span className="footer-tech-desc">{tech.desc}</span>
                                    {tech.icon}
                                    <span className="footer-tech-name">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        <span className="block sm:inline">
                            Copyright © {currentYear} <a href="https://github.com/aryanjohnsharma">Aryan Sharma</a>. All rights reserved.
                        </span>
                    </p>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;
