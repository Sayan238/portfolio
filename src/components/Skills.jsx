import React from 'react';
import { motion } from 'framer-motion';
import ComicCard from './ComicCard';
import '../styles/Skills.css';

const skillsData = [
    {
        category: "Programming", skills: [
            { name: "Python", level: 90, color: "var(--comic-red)" },
            { name: "C++", level: 85, color: "var(--comic-blue)" },
            { name: "JavaScript", level: 80, color: "var(--comic-yellow)" }
        ]
    },
    {
        category: "Web Dev", skills: [
            { name: "React", level: 85, color: "var(--comic-blue)" },
            { name: "Node.js", level: 75, color: "var(--comic-yellow)" },
            { name: "CSS/Tailwind", level: 90, color: "var(--comic-red)" }
        ]
    },
    {
        category: "Robotics & AI", skills: [
            { name: "Arduino/ESP32", level: 95, color: "var(--comic-yellow)" },
            { name: "TensorFlow/PyTorch", level: 70, color: "var(--comic-red)" },
            { name: "ROS", level: 60, color: "var(--comic-blue)" }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -100, rotate: -10, originX: 0.5, originY: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="section-title">Technical <span className="text-comic">Skills</span></motion.h2>

                <div className="skills-grid">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -150, rotate: index % 2 === 0 ? 15 : -15, originX: 0.5, originY: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{ delay: 0.1 * index, type: 'spring', bounce: 0.6, duration: 0.9 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`animate-pop comic-panel-tilt-${(index % 4) + 1}`}
                        >
                            <ComicCard className="skills-card">
                                <h3 className="skill-category-title">{category.category}</h3>
                                <div className="skill-list">
                                    {category.skills.map((skill, idx) => (
                                        <div key={idx} className="skill-item">
                                            <div className="skill-info">
                                                <span className="skill-name">{skill.name}</span>
                                                <span className="skill-level">{skill.level}%</span>
                                            </div>
                                            <div className="progress-bar-bg">
                                                <motion.div
                                                    className="progress-bar-fill comic-bar"
                                                    style={{ backgroundColor: skill.color }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1.2, delay: 0.3 + (idx * 0.1), type: 'spring', stiffness: 80 }}
                                                    viewport={{ once: true }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ComicCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
