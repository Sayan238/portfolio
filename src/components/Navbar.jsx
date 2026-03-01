import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('light-mode');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <a href="#home" className="logo">
                    SAYAN<span className="logo-accent">.DEV</span>
                </a>

                <div className="mobile-actions">
                    <button className="theme-toggle mobile-toggle" onClick={toggleTheme}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="menu-icon" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <a href="#about" className="nav-links" onClick={toggleMenu}>About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#skills" className="nav-links" onClick={toggleMenu}>Skills</a>
                    </li>
                    <li className="nav-item">
                        <a href="#projects" className="nav-links" onClick={toggleMenu}>Projects</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-links" onClick={toggleMenu}>Contact</a>
                    </li>
                    <li className="nav-item">
                        <button className="theme-toggle desktop-toggle" onClick={toggleTheme}>
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </li>
                    <li className="nav-item">
                        <a href="https://Sayan238.github.io/portfolio/resume.pdf" className="nav-links-btn" download="Sayan_Barman_Resume.pdf">Resume</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
