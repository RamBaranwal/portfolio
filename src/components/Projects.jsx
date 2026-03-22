import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'AWS To-Do Project',
    description: 'Developed a containerized task management solution using Docker and AWS to ensure high availability and seamless deployment.',
    tags: ['AWS', 'Docker', 'Linux'],
    github: 'https://github.com/RamBaranwal/aws-first-project',
    image: '/assets/images/aws_todo.png',
  },
  {
    title: 'Hospital Management System',
    description: 'A full-stack solution for patient record tracking and medical data persistence using React and MongoDB to improve administrative efficiency.',
    tags: ['React', 'MongoDB', 'CSS'],
    github: 'https://github.com/RamBaranwal/hospital',
    live: 'https://hospital-98tq.vercel.app/',
    image: '/assets/images/hospital_sys.png',
  },
  {
    title: 'Foodora (Food Delivery)',
    description: 'A MERN-stack platform designed for seamless food ordering with integrated menu and order data management.',
    tags: ['React', 'MongoDB', 'Node.js'],
    github: 'https://github.com/RamBaranwal/Foodora',
    image: '/assets/images/foodora_app.png',
  },
  {
    title: 'Scalable Food Delivery System',
    description: 'Engineered a resilient multi-tier cloud architecture on AWS using EC2 and Load Balancers to handle 1,000+ simultaneous requests.',
    tags: ['AWS (EC2, S3, RDS, VPC, ALB, Auto Scaling)', 'Linux'],
    image: '/assets/images/scalable_aws.png',
  },
  {
    title: 'Movie Ticket Booking',
    description: 'An interactive booking platform utilizing browser local storage to manage predefined locations and user selections efficiently.',
    tags: ['React', 'LocalStorage', 'CSS'],
    github: 'https://github.com/RamBaranwal/MoviesBooking',
    live: 'https://movies-booking-hkvq.vercel.app/',
    image: '/assets/images/movie_booking.png',
  },
  {
    title: 'Library Management System',
    description: 'A robust desktop application for organizing student registration and book inventory modules with reliable MySQL data handling.',
    tags: ['Java', 'Apache NetBeans', 'MySQL'],
    github: 'https://github.com/RamBaranwal/Updated-LMS',
    image: '/assets/images/library_sys.png',
  },
  {
    title: 'Mini Projects Collection',
    description: 'A diverse repository of utility-based applications showcasing foundational programming and logic building.',
    tags: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/RamBaranwal/MiniProjects',
    live: 'https://rambaranwal.github.io/MiniProjects/',
    image: '/assets/images/mini_projects.png',
  },
  {
    title: 'Monitor Task Management',
    description: 'Built a live monitoring solution to observe CPU and memory consumption with precise tracking and task termination capabilities.',
    tags: ['Python', 'Psutil', 'Matplotlib'],
    github: 'https://github.com/RamBaranwal/Monitoring-Dashboard',
    image: '/assets/images/monitor_dash.png',
  },
  {
    title: 'Weather Forecast App',
    description: 'Designed a mobile-optimized platform delivering instant weather insights through external API integration.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/RamBaranwal/Weather',
    live: 'https://rambaranwal.github.io/Weather/',
    image: '/assets/images/weather_app.png',
  }
];

export default function Projects() {
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
    <section id="projects" className={`section projects ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Some of my recent work</p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className="project-card vertical-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              
              {/* Top Visual Architecture Image */}
              <div className="project-image-top">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Bottom Content Area */}
              <div className="project-content-bottom">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, j) => (
                    <span className="project-tag" key={j}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link accent">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
