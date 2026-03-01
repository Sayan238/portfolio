import React from 'react';
import { motion } from 'framer-motion';

const ComicCard = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            className={`comic-card ${className}`}
            whileHover={{
                scale: 1.02,
                rotate: Math.random() > 0.5 ? 1 : -1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default ComicCard;
