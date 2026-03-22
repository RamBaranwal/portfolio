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
              I’m <strong>Ram Baranwal</strong>, a certified AWS Cloud Architect and full-stack developer passionate about building scalable cloud infrastructures and high-performance web applications. I specialize in AWS services (EC2, S3, VPC, Auto Scaling, Docker) and the MERN stack (React, Node.js, MongoDB), with a strong focus on system design, performance optimization, and clean architecture.
            </p>
            <p>
              I have solved 350+ coding problems and consistently sharpen my problem-solving and analytical thinking skills. Along with achieving top positions in national hackathons, I enjoy tackling complex challenges and continuously learning new technologies to stay ahead in the evolving tech landscape. My goal is to write clean, efficient, and maintainable code while building reliable solutions that create real-world impact.
            </p>
          </div>

          <div className="about-image-container">
            <Lottie animationData={developerAnimation} loop={true} className="about-image" />
          </div>
        </div>
      </div>
    </section>
  );
}
