import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ElectricCard from './ElectricCard';
import '../styles/Projects.css';

const projects = {
    coding: [
        {
            title: "AI Voice Assistant",
            description: "A voice-activated assistant capable of natural language processing and task automation.",
            tech: ["Python", "NLTK", "SpeechRecognition"],
            github: "https://github.com/SayanBarman/voice-assistant",
            demo: "#"
        },
        {
            title: "Flappy Bird Clone",
            description: "A Python-based clone of the popular game Flappy Bird using Pygame.",
            tech: ["Python", "Pygame"],
            github: "https://github.com/SayanBarman/flappy-bird",
            demo: "#"
        },
        {
            title: "Portfolio Website",
            description: "A futuristic portfolio website built with React and Framer Motion.",
            tech: ["React", "Vite", "Framer Motion"],
            github: "#",
            demo: "#"
        },
        {
            title: "Finger Fruit Game",
            description: "A computer vision game where players slice fruits using hand gestures.",
            tech: ["Python", "OpenCV", "MediaPipe"],
            github: "#",
            demo: "#"
        },
        {
            title: "Python Shooting Game",
            description: "A 2D arcade-style shooting game built with Python and Pygame.",
            tech: ["Python", "Pygame"],
            github: "#",
            demo: "#"
        }
    ],
    hardware: [
        {
            title: "Arduino Robot Car",
            description: "A Bluetooth-controlled robot car with obstacle avoidance capabilities.",
            tech: ["Arduino", "C++", "Sensors"],
            github: "#",
            demo: "#"
        },
        {
            title: "Smart Home System",
            description: "IoT-based home automation utilizing ESP32 for remote control.",
            tech: ["ESP32", "IoT", "C++"],
            github: "#",
            demo: "#"
        },
        {
            title: "Line Follower Robot",
            description: "An autonomous line-following robot built with ESP32 and IR sensors.",
            tech: ["ESP32", "C++", "IR Sensors"],
            github: "#",
            demo: "#"
        }
    ]
};

const Projects = () => {
    const [activeTab, setActiveTab] = useState('coding');

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title">My <span className="text-gradient">Projects</span></motion.h2>

                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'coding' ? 'active' : ''}`}
                        onClick={() => setActiveTab('coding')}
                    >
                        Coding Projects
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'hardware' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hardware')}
                    >
                        Hardware Projects
                    </button>
                </div>

                <div className="projects-grid">
                    {projects[activeTab].map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ElectricCard className="project-card">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((tech, idx) => (
                                        <span key={idx} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live</a>
                                </div>
                            </ElectricCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
