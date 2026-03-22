import { FaHeart } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <span className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">RB</span>
            <span className="logo-bracket">/&gt;</span>
          </span>
          <p className="footer-text">
            Made with <FaHeart className="heart-icon" /> by Ram Baranwal
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
