import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title">Get In <span className="text-gradient">Touch</span></motion.h2>

                <div className="contact-content glass-card">
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
                        <a href="mailto:sayanbarman30062005@gmail.com" className="btn primary-btn">Say Hello</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
