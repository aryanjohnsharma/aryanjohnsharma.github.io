import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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

const AboutCard = ({ children, delay, colSpan, accent, className = "", style: extraStyle = {} }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay }}
            className={`glass-panel ${className}`}
            style={{
                gridColumn: colSpan,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1rem',
                borderTop: accent ? '2px solid var(--accent)' : '1px solid var(--bg-elevated)',
                ...extraStyle,
            }}
        >
            {children}
        </motion.div>
    );
};

const getMapHTML = (isDark) => {
    const tileLayer = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    const bodyBackground = isDark ? '#0b0b0c' : '#f7f4ee';
    const overlayBackground = isDark ? 'rgba(20,20,20,0.65)' : 'rgba(255,255,255,0.78)';
    const overlayBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,20,0.08)';
    const overlayColor = isDark ? '#ffffff' : '#1f1f1f';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body {
      background: ${bodyBackground};
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100vw;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
    }
    #map {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .overlay {
      position: absolute;
      bottom: 12px;
      left: 14px;
      color: ${overlayColor};
      font-size: 13px;
      letter-spacing: 0.4px;
      background: ${overlayBackground};
      padding: 7px 12px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid ${overlayBorder};
      z-index: 2;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    .glow-marker {
      width: 14px;
      height: 14px;
      background: #4ade80;
      border-radius: 50%;
      box-shadow: 0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 30px rgba(74,222,128,0.6);
    }
    .leaflet-control-attribution {
      display: none !important;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="overlay">Based in Dhanbad, India</div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const coords = [23.7957, 86.4304];
    const map = L.map('map', {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView(coords, 8);
    L.tileLayer('${tileLayer}', {
      maxZoom: 19
    }).addTo(map);
    setTimeout(() => {
      map.flyTo(coords, 11, { duration: 2 });
    }, 400);
    const glowIcon = L.divIcon({
      className: '',
      html: '<div class="glow-marker"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
    L.marker(coords, { icon: glowIcon }).addTo(map);
  </script>
</body>
</html>`;
};

const About = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') !== 'light'
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div id="about" style={{
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <SectionHeader title="About." />

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gridAutoRows: 'auto',
                gap: '1rem',
                width: '100%',
                marginTop: '1rem'
            }}>

                {/* Main Narrative */}
                <AboutCard delay={0.1} colSpan={isMobile ? 'auto' : '1 / -1'} accent className="shimmer-effect">
                    <div style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                        lineHeight: 1.6,
                        color: 'var(--text-body)',
                    }}>
                        <p style={{ marginBottom: '1.2rem' }}>
                            I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Aryan Sharma</strong>, a final-year B.Tech IT student who builds things for the web.
                        </p>
                        <p style={{ marginBottom: '1.2rem', fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>
                            Frontend is where I spend most of my time. Picking up full-stack MERN as I go, building projects that actually connect both ends.
                        </p>
                        <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}>
                            Curious about how AI gets used in real products, not just talked about.
                        </p>
                    </div>
                </AboutCard>

                {/* Location Card */}
                <AboutCard delay={0.2} style={{ padding: 0, overflow: 'hidden', minHeight: '220px' }}>
                    <iframe
                        key={isDark ? 'dark-location-map' : 'light-location-map'}
                        srcDoc={getMapHTML(isDark)}
                        style={{ width: '100%', height: '100%', minHeight: '220px', border: 'none', display: 'block' }}
                        title="Location Map"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </AboutCard>

                {/* Philosophy Card */}
                <AboutCard delay={0.3}>
                    <div style={{ width: '30px', height: '2px', backgroundColor: 'var(--accent)', marginBottom: '0.8rem' }} />
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', lineHeight: 1.3, color: 'var(--text-primary)', fontWeight: 600 }}>
                        "Figure it out, then build it. Usually in that order."
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.5rem', letterSpacing: '1px' }}>
                            // Philosophy
                    </p>
                </AboutCard>

                {/* Current Focus Card */}
                <AboutCard delay={0.4}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>Current Focus</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-body)', fontSize: '0.95rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Generative AI & LLMs</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Scalable Backend Architecture</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} /> Modern Frontend Experiences</li>
                    </ul>
                </AboutCard>
            </div>
        </div>
    );
};

export default About;
