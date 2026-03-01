import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub } from 'react-icons/fa';
import ComicCard from './ComicCard';
import ComicButton from './ComicButton';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -100, rotate: -10, originX: 0.5, originY: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="section-title">Get In <span className="text-comic">Touch</span></motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: -150, rotate: 10, originX: 0.5, originY: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.6, duration: 0.9 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="animate-pop comic-panel-tilt-2"
                >
                    <ComicCard className="contact-content">
                        <div className="contact-info">
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <a href="mailto:sayanbarman30062005@gmail.com">sayanbarman30062005@gmail.com</a>
                            </div>
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <span>+91 9395639289</span>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>West Bengal, India</span>
                            </div>
                            <div className="contact-item">
                                <FaGithub className="contact-icon" />
                                <a href="https://github.com/Sayan238" target="_blank" rel="noopener noreferrer">github.com/Sayan238</a>
                            </div>
                        </div>

                        <div className="contact-form-placeholder">
                            <p>Open for collaborations and new opportunities.</p>
                            <ComicButton href="mailto:sayanbarman30062005@gmail.com" className="contact-btn" color="var(--comic-blue)">
                                SAY HELLO
                            </ComicButton>
                        </div>
                    </ComicCard>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
