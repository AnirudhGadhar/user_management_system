import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ onAuthSuccess }) => {
    const [showSignup, setShowSignup] = useState(true);
    const navigate = useNavigate();

    const handleAuthSuccess = (userData) => {
        onAuthSuccess(userData);
        navigate('/dashboard');
    };

    return (
        <div className="home">
            <div className="home-container">
                {showSignup ? (
                    <SignupForm
                        onSignupSuccess={handleAuthSuccess}
                        onToggleForm={() => setShowSignup(false)}
                    />
                ) : (
                    <LoginForm
                        onLoginSuccess={handleAuthSuccess}
                        onToggleForm={() => setShowSignup(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;