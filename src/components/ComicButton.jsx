import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ComicButton.css';

const ComicButton = ({
    children,
    onClick,
    href,
    className = "",
    type = "button",
    color = "var(--comic-red)"
}) => {
    const isLink = !!href;
    const Component = isLink ? motion.a : motion.button;

    // We override CSS custom variable to dynamically change the shadow color based on prop
    const style = {
        '--btn-color': color
    };

    return (
        <Component
            href={href}
            onClick={onClick}
            type={isLink ? undefined : type}
            className={`comic-button ${className}`}
            style={style}
            whileHover={{
                x: -3,
                y: -3,
                boxShadow: `6px 6px 0px ${color}, 8px 8px 0px #000`,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{
                x: 0,
                y: 0,
                boxShadow: `0px 0px 0px ${color}, 0px 0px 0px #000`,
                transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
        >
            {children}
        </Component>
    );
};

export default ComicButton;
