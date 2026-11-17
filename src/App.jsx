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
import CalWidget from './components/CalWidget';
import GradientASCII from './components/GradientASCII';

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
            <div className="site-background" aria-hidden="true" style={{ opacity: isDark ? 0.46 : 0.52 }}>
                <GradientASCII
                    colors={isDark
                        ? ['#1d0b02', '#451a03', '#a44408', '#e9853c']
                        : ['#fff5d3', '#ffdfbc', '#ffa37e', '#ff822d']}
                    shape="horizon"
                    characters=" =+xX0S8#@"
                    cellSize={24}
                    density={0.52}
                    glyphOpacity={0.3}
                    gradientOpacity={0.68}
                    glow={0.18}
                    flicker={0.08}
                    softness={0.83}
                    flow={0.35}
                    speed={0.45}
                    mouseInteraction={false}
                    scrambleRadius={0.12}
                    lightMode={!isDark}
                    dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
                />
            </div>

            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </AnimatePresence>
            <Footer hideSocials={location.pathname === '/contact'} />
            <SpotifyWidget />
            <CalWidget />
        </div>
    );
}

export default App;

