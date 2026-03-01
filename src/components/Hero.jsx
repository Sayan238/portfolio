import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ComicButton from './ComicButton';
import myImg from '../assets/myimg.jpeg';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
                    className="hero-text-container"
                >
                    <motion.div
                        className="hero-subtitle-box"
                        whileHover={{ scale: 1.05, rotate: -2 }}
                    >
                        <span>AI & Robotics Developer | Creative Technologist</span>
                    </motion.div>

                    <motion.div
                        className="hero-title-wrapper"
                        initial={{ rotate: -2 }}
                        animate={{ rotate: [-2, 0, -2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <h1 className="hero-title">
                            SAYAN <br /> <span className="comic-glitch">BARMAN</span>
                        </h1>
                    </motion.div>

                    <p className="hero-description">
                        B.Tech CSE (AI & ML) student passionate about robotics, AI, and building real-world projects. I enjoy turning ideas into working systems using both software and hardware.
                    </p>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <ComicButton href="#projects" className="btn primary-btn" color="var(--comic-blue)">
                            View Projects
                        </ComicButton>
                        <ComicButton href="https://Sayan238.github.io/portfolio/resume.pdf" className="btn secondary-btn" color="var(--comic-red)">
                            Grab Resume!
                        </ComicButton>
                    </motion.div>

                    <motion.div
                        className="social-icons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <a href="https://github.com/Sayan238" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/sayan-barman-983491327/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://x.com/BarmanSaya82097" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </motion.div>
                </motion.div>

                {/* Photo Display Graphic */}
                <motion.div
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 5 }}
                    whileHover={{ scale: 1.05, rotate: 8 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="hero-graphic"
                >
                    <div className="comic-photo-container">
                        <img src={myImg} alt="Sayan Barman" className="comic-photo" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
