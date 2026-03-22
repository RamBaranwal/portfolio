import { useEffect, useRef, useState, useMemo } from 'react';
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaPython, FaDocker, FaJava, FaAws, FaLinux, FaGithub, FaFigma
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMongodb, SiPostgresql, SiMysql, SiJavascript, SiKubernetes, SiUbuntu, SiPostman, SiVite
} from 'react-icons/si';
import './Skills.css';

const cloudSlugs = ['java', 'python', 'javascript', 'mysql', 'react', 'figma', 'tailwindcss', 'html5', 'css3', 'nodedotjs', 'mongodb', 'postgresql', 'postman', 'amazonaws', 'docker', 'kubernetes', 'linux', 'ubuntu', 'github', 'git', 'gitbash'];

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: <FaJava color="#007396" /> },
      { name: "Python", icon: <FaPython color="#3776AB" /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" /> }
    ]
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", icon: <FaReact color="#61DAFB" /> },
      { name: "Swing", icon: <FaJava color="#007396" /> },
      { name: "Figma", icon: <FaFigma color="#F24E1E" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
      { name: "HTML5", icon: <FaHtml5 color="#E34F26" /> },
      { name: "CSS3", icon: <FaCss3Alt color="#264DE4" /> }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: <FaNodeJs color="#68A063" /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
      { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> },
      { name: "Postman", icon: <SiPostman color="#FF6C37" /> }
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: <FaAws color="#FF9900" /> },
      { name: "Docker", icon: <FaDocker color="#2496ED" /> },
      { name: "Kubernetes", icon: <SiKubernetes color="#326CE5" /> },
      { name: "Linux (Ubuntu)", icon: <SiUbuntu color="#E95420" /> },
      { name: "Git/GitHub", icon: <FaGithub color="#ffffff" /> },
      { name: "Git Bash", icon: <FaGitAlt color="#F05032" /> }
    ]
  }
];

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }
  },
  options: {
    clickToFront: 500,
    depth: 0.95,
    radiusX: 1,
    radiusY: 1,
    radiusZ: 1,
    imageScale: 1.5, /* Force crisp scaling inside depth constraints */
    initial: [0.03, -0.03], /* Slower stable default rotation */
    outlineColour: '#0000',
    reverse: true, // This enforces the exact specified "revolve opposite from mouse direction" logic
    tooltip: 'none',
    tooltipDelay: 0,
    wheelZoom: false,
    dragControl: false,
    minSpeed: 0.05,
  }
};

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);

    // Fetch simple icons
    fetchSimpleIcons({ slugs: cloudSlugs }).then(setData);

    return () => observer.disconnect();
  }, [JSON.stringify(cloudSlugs)]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    
    const icons = [];
    const iconSize = 55; // Adjusted down to 55 to prevent geometric collision

    // 1. Render all officially fetched icons
    cloudSlugs.forEach((slug) => {
      if (data.simpleIcons[slug]) {
        icons.push(
          renderSimpleIcon({
            icon: data.simpleIcons[slug],
            size: iconSize,
            aProps: {
              href: undefined,
              target: undefined,
              rel: undefined,
              onClick: (e) => e.preventDefault(),
              title: '',
              alt: '',
            },
          })
        );
      }
    });

    // 2. Explicitly fallback rendering for potentially missing simple-icons as white SVGs
    if (!data.simpleIcons['java']) icons.push(<a key="fallback-java" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><FaJava size={iconSize} color="#ffffff" /></a>);
    if (!data.simpleIcons['amazonaws']) icons.push(<a key="fallback-aws" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><FaAws size={iconSize} color="#ffffff" /></a>);
    if (!data.simpleIcons['docker']) icons.push(<a key="fallback-docker" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><FaDocker size={iconSize} color="#ffffff" /></a>);
    if (!data.simpleIcons['kubernetes']) icons.push(<a key="fallback-kube" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><SiKubernetes size={iconSize} color="#ffffff" /></a>);
    if (!data.simpleIcons['linux']) icons.push(<a key="fallback-linux" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><FaLinux size={iconSize} color="#ffffff" /></a>);
    if (!data.simpleIcons['gitbash']) icons.push(<a key="fallback-gitbash" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><FaGitAlt size={iconSize} color="#ffffff" /></a>);
    if (!data.simpleIcons['postman']) icons.push(<a key="fallback-postman" href="#" title="" alt="" onClick={(e) => e.preventDefault()}><SiPostman size={iconSize} color="#ffffff" /></a>);

    return icons;
  }, [data]);

  return (
    <section id="skills" className={`section skills ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="container">

        <div className="skills-header-block">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and tools I specialize in</p>
        </div>

        <div className="skills-layout">
          {/* Left Side: 2/3 Coverage for Skills List */}
          <div className="skills-left">
            <div className="skills-categories">
              {skillCategories.map((category, idx) => (
                <div key={idx} className="skill-category-block">
                  <h4 className="skill-category-title">{category.title}</h4>
                  <div className="skills-chip-grid">
                    {category.skills.map((skillObj, index) => (
                      <div
                        key={index}
                        className="skill-chip"
                        style={{ animationDelay: `${(idx * 0.15) + (index * 0.05)}s` }}
                      >
                        <span className="skill-chip-icon">{skillObj.icon}</span>
                        <span className="skill-chip-name">{skillObj.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: 1/3 Coverage for Globe */}
          <div className="skills-right">
            <div
              className="sphere-wrapper"
              onMouseLeave={() => {
                if (window.TagCanvas) {
                  // Resumes default revolving animation smoothly when mouse is not present
                  window.TagCanvas.SetSpeed('skills-cloud', [0.03, -0.03]);
                }
              }}
            >
              {renderedIcons ? (
                <Cloud id="skills-cloud" {...cloudProps}>
                  {renderedIcons}
                </Cloud>
              ) : (
                <div className="loading-sphere">Loading Sphere...</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
