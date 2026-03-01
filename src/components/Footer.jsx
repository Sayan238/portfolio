import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Sayan Barman. All rights reserved.</p>
            <p className="built-with">
                Built with <span style={{ color: 'var(--comic-blue)', textShadow: '1px 1px 0 #000' }}>React</span> & <span style={{ color: 'var(--comic-red)', textShadow: '1px 1px 0 #000' }}>Coffee</span>
            </p>
        </footer>
    );
};

export default Footer;
