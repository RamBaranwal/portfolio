import { useEffect, useRef, useState } from 'react';
import './Certificates.css';

const certificates = [
  {
    title: 'Oracle Certified Foundations Associate',
    img: '/assets/images/Screenshot%202026-03-22%20043744.png',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=F12B5F7C1F4AFA907F3038014AC67C24AE533BBC566234CAA048A5CE041AC3A9'
  },
  {
    title: 'Social Networks - NPTEL',
    img: '/assets/images/Screenshot%202026-03-22%20043052.png',
    link: 'https://drive.google.com/file/d/1Shda1tN14MprQxoXvV6RRLIOX1Tk5zIq/view?usp=sharing'
  },
  {
    title: 'DSA using Java - CipherSchools',
    img: '/assets/images/Screenshot%202026-03-22%20042753.png',
    link: 'https://drive.google.com/file/d/1pNoTugUC52mJYKmWIzFBu6wXFptlmIeG/view?usp=sharing'
  },
  {
    title: 'MAIT 4.0 Hackathon',
    img: '/assets/images/Screenshot%202026-03-22%20043009.png',
    link: 'https://drive.google.com/file/d/1wXJyuf8xb8B6-PnJlgBgopuQttCZmdP8/view?usp=sharing'
  },
  {
    title: 'DUHacks 3.0',
    img: '/assets/images/Screenshot%202026-03-22%20044727.png',
    link: 'https://drive.google.com/file/d/1WUy0t_Sh8-dW81l6p_-EPd2li4XQh63g/view?usp=sharing'
  },
  {
    title: 'AWS Academy Graduate - Cloud Architecting',
    img: '/assets/images/Screenshot%202026-03-22%20045000.png',
    link: 'https://www.credly.com/badges/8881c4f4-ab87-444d-8b4f-72186e1a40ff/public_url'
  },
  {
    title: 'AWS Academy Graduate - Cloud Foundations',
    img: '/assets/images/Screenshot%202026-03-22%20045322.png',
    link: 'https://www.credly.com/badges/05877499-ab13-43e5-b00e-ce8e33f5348c/public_url'
  }
];

export default function Certificates() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInteracting = useRef(false);
  const resumeTimeout = useRef(null);
  const speed = 0.6; // Scroll speed

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId;

    // Start in the middle section to allow scrolling in both directions smoothly
    setTimeout(() => {
        if (el) el.scrollLeft = el.scrollWidth / 3;
    }, 100);

    const tick = () => {
      if (!isHovered && !isInteracting.current) {
        el.scrollLeft += speed;

        const contentWidth = el.scrollWidth / 3;
        
        // Loop continuously by resetting position when reaching bounds
        if (el.scrollLeft >= contentWidth * 2) {
          el.scrollLeft -= contentWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += contentWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isHovered]);

  const startInteraction = () => {
    isInteracting.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  const endInteraction = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      isInteracting.current = false;
      const el = containerRef.current;
      if (el) {
         const contentWidth = el.scrollWidth / 3;
         if (el.scrollLeft >= contentWidth * 2) {
           el.scrollLeft -= contentWidth;
         } else if (el.scrollLeft <= 0) {
           el.scrollLeft += contentWidth;
         }
      }
    }, 500); // Resume auto-scroll after 500ms of inactivity
  };

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section-title">Certificates</h2>
        <p className="section-subtitle">Done some important Certifications</p>

        <div className="certificates-container">
          <div
            className="certificates-track"
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); endInteraction(); }}
            onPointerDown={startInteraction}
            onPointerUp={endInteraction}
            onPointerCancel={endInteraction}
            onTouchStart={startInteraction}
            onTouchEnd={endInteraction}
            onWheel={() => { startInteraction(); endInteraction(); }}
            onScroll={() => {
              // Only trigger as user interaction if they are hovering or actively interating.
              // We do not want programmatic scroll to infinitely pause itself.
              if (isHovered || isInteracting.current) {
                  startInteraction();
                  endInteraction();
              }
            }}
          >
            {[...certificates, ...certificates, ...certificates].map((c, idx) => (
              <article className="cert-card" key={`cert-${idx}`}>
                <a href={c.link} target="_blank" rel="noreferrer" className="cert-image-link">
                  <img src={c.img} alt={c.title} className="cert-image" />
                </a>
                <div className="cert-meta">
                  <a href={c.link} target="_blank" rel="noreferrer" className="cert-title">{c.title}</a>
                  <a href={c.link} target="_blank" rel="noreferrer" className="cert-btn">View Certificate</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
