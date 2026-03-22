import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onLogoClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = navLinks.map(link => document.getElementById(link.id));
      // Use a more generous threshold (e.g., 1/3 of the viewport)
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }

      // If hit the absolute bottom, always activate the last link
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        setActiveSection(navLinks[navLinks.length - 1].id);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#home" className="navbar-logo" onClick={(e) => { 
            e.preventDefault(); 
            if (onLogoClick) onLogoClick();
            handleClick('home'); 
          }}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">RamBaranwal</span>
            <span className="logo-bracket">/&gt;</span>
          </a>
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleClick(link.id); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">RamBaranwal</span>
            <span className="logo-bracket">/&gt;</span>
          </div>
        </div>
        <ul className="sidebar-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleClick(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
