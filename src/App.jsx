import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Setup from './components/Setup';
import SpotifyWidget from './components/SpotifyWidget';
import DarkVeil from './components/DarkVeil/DarkVeil';

function App() {
    const location = useLocation();
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') !== 'light'
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="app-container">
            {/* Dark mode: animated DarkVeil background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: isDark ? 0.35 : 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                transition: 'opacity 0.6s ease',
            }}>
                <DarkVeil
                    hueShift={204}
                    noiseIntensity={0}
                    scanlineIntensity={0.02}
                    speed={1.6}
                    scanlineFrequency={1.1}
                    warpAmount={1.5}
                />
            </div>

            {/* Light mode: subtle warm gradient background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: isDark ? 0 : 1,
                pointerEvents: 'none',
                overflow: 'hidden',
                transition: 'opacity 0.6s ease',
                background: 'radial-gradient(ellipse at 20% 20%, rgba(224, 85, 0, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(224, 85, 0, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.01) 0%, transparent 70%)',
            }} />

            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </AnimatePresence>
            <Footer />
            <SpotifyWidget />
        </div>
    );
}

export default App;

