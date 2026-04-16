import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            href: "https://github.com/aryanjohnsharma",
            icon: <Github size={32} />,
            label: "GitHub",
        },
        {
            href: "https://linkedin.com/in/aryanjohnsharma",
            icon: <Linkedin size={32} />,
            label: "LinkedIn",
        },
        {
            href: "https://signal.me/#eu/DotlTZjESTGpeLRaWfriysKBF5ZbSsqkFXoMK26N9it0fnMk49tPTqsmO1BxXzhP",
            icon: <svg role="img" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Signal</title><path d="M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125" /></svg>,
            label: "Signal",
        },
        {
            href: "https://x.com/aryanjohnsharma",
            icon: <svg role="img" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>,
            label: "X (Twitter)",
        },
        {
            href: "mailto:aryanjohnsharma@gmail.com",
            icon: <Mail size={32} />,
            label: "Email",
        },
    ];

    const techStack = [
        {
            desc: "Built with",
            name: "React",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="20" height="20" className="tech-icon"><circle cx="0" cy="0" r="2.05" fill="currentColor" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>,
        },
        {
            desc: "Styled with",
            name: "CSS",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="tech-icon"><path d="M5 3L4.35 10H20.6L19 21L12 23L5 21L4.6 18H6.5L6.85 20L12 21.45L17.5 20L18.6 12H6.55L6.2 8H19.2L19.45 6H5.9L5 3Z" /></svg>,
        },
        {
            desc: "Deployed on",
            name: "GitHub Pages",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="tech-icon"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>,
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

                    {/* Column 3 */}
                    <div className="footer-col footer-col-widget">
                        <div className="footer-spotify-widget">
                            <a href="https://open.spotify.com/user/r95f1qecgkdxt73wiyorgokf2" target="_blank" rel="noopener noreferrer" className="footer-spotify-link">
                                <img
                                    src="https://spotify-recently-played-readme.vercel.app/api?user=r95f1qecgkdxt73wiyorgokf2&count=4"
                                    alt="Spotify recently played"
                                    className="footer-spotify-img"
                                    loading="lazy"
                                />
                            </a>
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
