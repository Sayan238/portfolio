import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ComicCard from './ComicCard';
import ComicButton from './ComicButton';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import '../styles/Projects.css';

const projects = {
    coding: [
        {
            title: "PhysiqueAI",
            description: "A modern, AI-powered fitness web application featuring smart workouts and progress tracking.",
            tech: ["React", "Vite", "AI"],
            role: "Full Stack Developer",
            github: "https://github.com/Sayan238/PhysiqueAI",
            link: "http://physiqueai-ovn2.vercel.app/",
            linkText: "Get Started"
        },
        {
            title: "AI Voice Assistant",
            description: "A Python-based voice assistant capable of executing system commands, web scraping, and natural conversation.",
            tech: ["Python", "SpeechRecognition", "PyAudio", "OpenAI API"],
            role: "Developer",
            github: "https://github.com/Sayan238/project_Astra_GUI",
            link: "https://github.com/Sayan238/project_Astra_GUI",
            linkText: "Live"
        },
        {
            title: "3D Portfolio",
            description: "This very website! A cyberpunk/comic themed interactive portfolio featuring 3D elements and smooth animations.",
            tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
            role: "Frontend Developer",
            link: "https://sayan238.github.io/portfolio/",
            linkText: "Live",
            github: "https://github.com/Sayan238/portfolio"
        },
        {
            title: "Buro Bird",
            description: "A fun and interactive bird-flying game.",
            tech: ["React", "JavaScript", "HTML5", "CSS3"],
            role: "Game Developer",
            link: "https://sayan238.github.io/buro-bird-react/",
            linkText: "Play Now",
            github: "https://github.com/Sayan238/buro-bird-react"
        }
    ],
    hardware: [
        {
            title: "Smart Home Automation",
            description: "IoT-based home automation system using Arduino and NodeMCU for remote appliance control.",
            tech: ["Arduino", "C++", "IoT", "Blynk"],
            role: "Hardware Engineer",
            link: "https://github.com/Sayan238/Home-Automation",
            linkText: "View Project",
            github: "https://github.com/Sayan238/Home-Automation"
        },
        {
            title: "Line Following Robot",
            description: "Autonomous robot capable of navigating complex paths using IR sensors and PID control.",
            tech: ["Robotics", "Arduino", "Sensors", "Motors"],
            role: "Developer",
            link: "#",
            linkText: "Live",
            github: "#"
        }
    ]
};

const borderColors = ['var(--comic-red)', 'var(--comic-blue)', 'var(--comic-yellow)'];

const Projects = () => {
    const [activeTab, setActiveTab] = useState('coding');

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        className="section-title animate-pop"
                        initial={{ opacity: 0, y: -200, rotate: 20 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ type: 'spring', bounce: 0.6, duration: 1.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        style={{ transformOrigin: "top right" }}
                    >
                        My <span className="text-comic">Projects</span>
                    </motion.h2>
                </div>

                <div className="projects-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        className={`comic-button ${activeTab === 'coding' ? 'active' : ''}`}
                        onClick={() => setActiveTab('coding')}
                        style={activeTab !== 'coding' ? { background: '#1c1c24', color: 'white', border: 'var(--border-thick)', boxShadow: 'none', transform: 'none' } : {}}
                    >
                        Coding Projects
                    </button>
                    <button
                        className={`comic-button ${activeTab === 'hardware' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hardware')}
                        style={activeTab !== 'hardware' ? { background: '#1c1c24', color: 'white', border: 'var(--border-thick)', boxShadow: 'none', transform: 'none' } : {}}
                    >
                        Hardware Projects
                    </button>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    {/* We provide a key so ScrollStack remounts on tab change, resetting animations */}
                    <ScrollStack
                        key={activeTab}
                        useWindowScroll={true}
                        itemDistance={80}
                        itemStackDistance={40}
                        baseScale={0.8}
                        stackPosition="20%"
                        className="projects-scroll-stack"
                    >
                        {projects[activeTab].map((project, index) => (
                            <ScrollStackItem key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 50, rotate: (index % 2 === 0 ? 5 : -5) }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                    transition={{ delay: index * 0.1, type: "spring", bounce: 0.5, duration: 0.8 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className={`animate-pop comic-panel-tilt-${(index % 4) + 1}`}
                                    style={{ height: "100%" }}
                                >
                                    <ComicCard
                                        className="project-card"
                                        style={{
                                            borderWidth: '5px',
                                        }}
                                    >
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-role" style={{ color: 'var(--text-muted)', fontWeight: 800 }}>👉 {project.role}</p>
                                        <p className="project-desc">{project.description}</p>

                                        <div className="project-tech">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="tech-badge">{tech}</span>
                                            ))}
                                        </div>

                                        <div className="project-links" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                            {project.github && project.github !== '#' && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="comic-button link-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                                    <FaGithub /> Code
                                                </a>
                                            )}
                                            {project.link && project.link !== '#' && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="comic-button link-btn" style={{ background: 'var(--comic-blue)', color: 'black', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                                    <FaExternalLinkAlt /> {project.linkText || "Live"}
                                                </a>
                                            )}
                                        </div>
                                    </ComicCard>
                                </motion.div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </div>
        </section>
    );
};

export default Projects;
