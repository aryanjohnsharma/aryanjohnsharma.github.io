import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Setup from './components/Setup';
import SpotifyWidget from './components/SpotifyWidget';

function App() {
    const location = useLocation();

    return (
        <div className="app-container">
            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
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
