import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaRobot, FaMicrochip } from 'react-icons/fa';
import '../styles/Skills.css';

const skillsData = [
    {
        category: "Programming", skills: [
            { name: "Python", level: 90 },
            { name: "C++", level: 85 },
            { name: "JavaScript", level: 80 }
        ]
    },
    {
        category: "Web Dev", skills: [
            { name: "React", level: 85 },
            { name: "Node.js", level: 75 },
            { name: "CSS/Tailwind", level: 90 }
        ]
    },
    {
        category: "Robotics & AI", skills: [
            { name: "Arduino/ESP32", level: 95 },
            { name: "TensorFlow/PyTorch", level: 70 },
            { name: "ROS", level: 60 }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title">Technical <span className="text-gradient">Skills</span></motion.h2>

                <div className="skills-grid">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="skills-card glass-card"
                        >
                            <h3 className="skill-category-title">{category.category}</h3>
                            <div className="skill-list">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="skill-item">
                                        <div className="skill-info">
                                            <span>{skill.name}</span>
                                            <span>{skill.level}%</span>
                                        </div>
                                        <div className="progress-bar-bg">
                                            <motion.div
                                                className="progress-bar-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
