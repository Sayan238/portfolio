import React from 'react';
import { motion } from 'framer-motion';
import ComicCard from './ComicCard';
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
                    initial={{ opacity: 0, y: -100, rotate: 10, originX: 0.5, originY: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="section-title">About <span className="text-comic">Me</span></motion.h2>

                <ComicCard className="animate-pop about-panel">
                    <div className="about-content">
                        <motion.div
                            initial={{ opacity: 0, y: -150, rotate: -15, originX: 0, originY: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring', bounce: 0.5, duration: 0.9 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="about-text"
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
                                    initial={{ opacity: 0, y: -100, rotate: 20, originX: 1, originY: 0 }}
                                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.15), type: 'spring', bounce: 0.6, duration: 0.8 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="timeline-item"
                                >
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <span className="timeline-year">{item.year}</span>
                                        <h3 className="timeline-title">{item.title}</h3>
                                        <p className="timeline-desc">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </ComicCard>
            </div>
        </section>
    );
};

export default About;
