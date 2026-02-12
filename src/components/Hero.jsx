import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content container">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-text"
                >
                    <h2 className="hero-subtitle">Hello, I'm</h2>
                    <h1 className="hero-title">
                        SAYAN <span className="text-gradient">BARMAN</span>
                    </h1>
                    <div className="typing-effect">
                        <span>AI & Robotics Developer | Creative Technologist</span>
                    </div>

                    <p className="hero-description">
                        B.Tech CSE (AI & ML) student passionate about robotics, AI, and building real-world projects.
                        I enjoy turning ideas into working systems using both software and hardware.
                    </p>

                    <div className="hero-buttons">
                        <a href="#projects" className="btn primary-btn">View Projects</a>
                        <a href="/resume.pdf" download className="btn secondary-btn">Download Resume</a>
                    </div>

                    <div className="social-icons">
                        <a href="https://github.com/Sayan238" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/sayan-barman-983491327/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://x.com/BarmanSaya82097" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-image-container"
                >
                    <div className="hero-image-glow"></div>
                    <div className="hero-image">
                        {/* Placeholder for actual image */}
                        <div className="placeholder-avatar">SB</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
