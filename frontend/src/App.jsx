import React, { useState } from 'react';
import './App.css';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer.jsx';

function App() {
    const [currentPage, setCurrentPage] = useState('signup');
    const [user, setUser] = useState(null);
    const [sessionToken, setSessionToken] = useState(null);

    const handleSignupSuccess = (data) => {
        setUser(data);
        setSessionToken(data.sessionToken);
        setCurrentPage('dashboard');
    };

    const handleLoginSuccess = (data) => {
        setUser(data);
        setSessionToken(data.sessionToken);
        setCurrentPage('dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        setSessionToken(null);
        setCurrentPage('signup');
    };

    return (
        <div className="app">
            <header className="header">
                <h1>User Management System</h1>
            </header>

            <main className="main">
                {currentPage === 'signup' && (
                    <SignupForm
                        onSuccess={handleSignupSuccess}
                        onToggle={() => setCurrentPage('login')}
                    />
                )}

                {currentPage === 'login' && (
                    <LoginForm
                        onSuccess={handleLoginSuccess}
                        onToggle={() => setCurrentPage('signup')}
                    />
                )}

                {currentPage === 'dashboard' && (
                    <Dashboard
                        user={user}
                        sessionToken={sessionToken}
                        onLogout={handleLogout}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;