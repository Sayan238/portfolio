import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Sayan Barman. All rights reserved.</p>
            <p className="built-with">
                Built with <span style={{ color: 'var(--neon-blue)' }}>React</span> & <span style={{ color: 'var(--neon-purple)' }}>Coffee</span>
            </p>
        </footer>
    );
};

export default Footer;
