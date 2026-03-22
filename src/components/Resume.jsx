import { useEffect, useRef, useState } from 'react';
import './Resume.css';
import eduImg from '../assets/eduOrange.svg';

const education = [
  {
    degree: 'B.Tech in Computer Science',
    school: 'Lovely Professional University',
    year: '2023 - Present',
    score: 'CGPA: 7.77/10', // You can update this score
  },
  {
    degree: 'Intermediate (12th Grade)',
    school: 'Decent School, Kota Rajasthan',
    year: '2022 - 2023',
    score: 'Percentage: 73.2%', // Update as needed
  },
  {
    degree: 'Matriculation (10th Grade)',
    school: 'Sunbeam School Azamgarh, Uttar Pradesh',
    year: '2019 - 2020',
    score: 'Percentage: 86.4%', // Update as needed
  },
];

export default function Resume() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className={`section education ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">My academic history & qualifications</p>

        <div className="education-layout">
          {/* Left Side: SVG Illustration */}
          <div className="education-image">
            <img src={eduImg} alt="Study Illustration" />
          </div>

          {/* Right Side: Education Cards */}
          <div className="education-cards">
            {education.map((item, i) => (
              <div
                className="edu-card"
                key={i}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="edu-card-icon">
                  <div className="icon-circle"></div>
                </div>
                <div className="edu-card-content">
                  <span className="edu-year">{item.year}</span>
                  <h4 className="edu-degree">{item.degree}</h4>
                  <p className="edu-school">{item.school}</p>
                  <p className="edu-score">{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
