import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import './Hero.css';

export default function Hero({ loadingComplete = true }) {
  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ram-baranwal/', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/RamBaranwal', label: 'GitHub' },
    { icon: <FaEnvelope />, url: 'mailto:rambaranwalup50@gmail.com', label: 'Email' },
  ];

  return (
    <section id="home" className="hero-split">
      <div className="hero-left-panel">
        <ul className="social-list">
          {socialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* The centered circular profile picture overlapping the split view */}
      <div className={`profile-container ${loadingComplete ? '' : 'profile-hidden'}`}>
        <img src="/myprofile.jpg" alt="Ram Baranwal Profile" className="profile-image" />
      </div>

      <div className="hero-right-panel">
        <div className="hero-content-wrapper">
          <p className="hero-role-title">Cloud Computing</p>
          <h1 className="hero-main-name">Ram Baranwal</h1>
          <p className="hero-main-desc">
            The future isn’t something we wait for — it’s something we create.<br />
            With Cloud Computing and Web Development, I turn ideas into scalable, real-world solutions.<br />
            Always learning, always building, always moving forward.
          </p>

          <div className="hero-action-buttons">
            <div className="btn-hero-merged">
              <a href="/RamCV_gen.pdf" className="btn-merged-part btn-part-download" download>
                Download CV
              </a>
              <div className="btn-merged-divider"></div>
              <a href="/RamCV_gen.pdf" className="btn-merged-part btn-part-view" target="_blank" rel="noopener noreferrer" title="View CV" aria-label="View CV">
                <FiEye className="btn-icon-eye" />
              </a>
            </div>
            <a href="#contact" className="btn-hero btn-hero-fill">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
