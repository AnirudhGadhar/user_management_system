import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            className={`btn btn-${variant}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;