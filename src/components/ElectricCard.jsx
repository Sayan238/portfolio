import React from 'react';
import '../styles/ElectricCard.css';

const ElectricCard = ({ children, className = "" }) => {
    return (
        <div className={`electric-card-wrapper ${className}`}>
            <div className="electric-card-border"></div>
            <div className="electric-card-content">
                {children}
            </div>
        </div>
    );
};

export default ElectricCard;
