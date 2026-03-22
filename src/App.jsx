import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="app">
      {!loadingComplete && <Loader onLoadingComplete={() => setLoadingComplete(true)} />}
      <Navbar onLogoClick={() => setLoadingComplete(false)} />
      <Hero loadingComplete={loadingComplete} />
      <About />
      <Resume />
      <Skills />
      <Projects />
      <Certificates />
      <Achievements />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
