import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const timelineData = [
    {
        year: "2026",
        title: "AI & Robotics Developer",
        description: "Developing autonomous systems and machine learning models for real-world applications.",
    },
    {
        year: "2024 - 2028",
        title: "Computer Science Student",
        description: "B.Tech CSE (AI & ML) student at KIIT University (2024–2028), focused on developing practical skills through projects and continuous learning.",
    },
    {
        year: "2024",
        title: "Started Coding",
        description: "Began the journey with Python and C++, building small automation scripts.",
    }
];

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title">About <span className="text-gradient">Me</span></motion.h2>

                <div className="about-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="about-text glass-card"
                    >
                        <p>
                            I am a passionate developer with a deep interest in <strong>Artificial Intelligence</strong> and <strong>Robotics</strong>.
                            My journey involves bridging the gap between software and hardware to create intelligent systems.
                        </p>
                        <p>
                            When I'm not coding, you can find me tinkering with Arduino boards, exploring new tech stacks, or building cool DIY projects.
                        </p>
                    </motion.div>

                    <div className="timeline">
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                className="timeline-item"
                            >
                                <div className="timeline-dot"></div>
                                <div className="timeline-content glass-card">
                                    <span className="timeline-year">{item.year}</span>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-desc">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
