import { useEffect, useRef, useState } from 'react';
import { FaCode, FaPalette, FaServer } from 'react-icons/fa';
import LottiePackage from 'lottie-react';
const Lottie = LottiePackage.default || LottiePackage;
import developerAnimation from '../developer.json';
import './About.css';

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={`section about ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Who I Am</h2>
        <p className="section-subtitle">Get to know me better</p>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I’m <strong>Ram Baranwal</strong>, an aspiring cloud architect and full-stack developer passionate about building scalable cloud infrastructures and high-performance web applications. I have completed AWS Academy training, gaining hands-on experience in cloud computing.
            </p>
            <p>
              I work with AWS services such as EC2, S3, VPC, Auto Scaling, and Docker, along with the MERN stack (React, Node.js, MongoDB). My focus is on system design, performance optimization, and writing clean, maintainable code.
            </p>
            <p>
              I am continuously developing strong problem-solving skills, demonstrated by securing top positions in national-level hackathons while tackling real-world challenges.
            </p>
            <p>
              I am driven by continuous learning and aim to build scalable, reliable solutions that create meaningful impact.
            </p>
          </div>

          <div className="about-image-container">
            <div className="about-image-wrapper">
              <Lottie animationData={developerAnimation} loop={true} className="about-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
