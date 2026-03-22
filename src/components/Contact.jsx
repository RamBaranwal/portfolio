import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'sending' | 'success'
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('sending');

    const dateStr = new Date().toLocaleString();
    const payload = {
      Name: formData.name,
      Email: formData.email,
      Message: formData.message,
      Date: dateStr
    };

    try {
      // 1. Send data to SheetDB API
      await fetch('https://sheetdb.io/api/v1/k025rxgp32qi3', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: [payload] })
      });

      // 2. Send email copy via FormSubmit
      await fetch('https://formsubmit.co/ajax/rambaranwalup50@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          date: dateStr,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      // Success UI feedback
      setSubmitState('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Auto reset after 3 seconds
      setTimeout(() => {
        setSubmitState('idle');
      }, 3000);

    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error sending your message. Please try again.");
      setSubmitState('idle');
    }
  };

  return (
    <section id="contact" className={`section contact ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's work together on something great</p>

        <div className="contact-grid">
          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary btn-submit ${submitState === 'success' ? 'btn-success' : ''}`}
              disabled={submitState === 'sending'}
            >
              {submitState === 'sending' ? 'Sending...' : 
               submitState === 'success' ? '✓ Message Sent!' : 
               <><FaPaperPlane /> Send Message</>}
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <p>rambaranwalup50@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><FaPhone /></div>
              <div>
                <h4>Phone</h4>
                <p>+91 99197 99661</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Location</h4>
                <p>India</p>
              </div>
            </div>

            <div className="contact-socials">
              <h4>Follow Me</h4>
              <div className="social-links">
                <a href="https://github.com/rambaranwal" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/ram-baranwal" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a> */}
                {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
