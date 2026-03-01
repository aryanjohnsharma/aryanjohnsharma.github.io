import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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

    return (
        <div className="app-container">
            {/* Global animated background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.35,
                pointerEvents: 'none',
                overflow: 'hidden',
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

