import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-title">
                    <h1>🔐 User Management System</h1>
                </div>
                {user && (
                    <div className="header-user">
                        <span>👤 Welcome, {user.username}</span>
                        <button onClick={onLogout} className="logout-btn">
                            🚪 Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;