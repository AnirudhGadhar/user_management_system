import React, { useState } from 'react';
import { getAllProfiles, updateProfile } from '../api/auth';
import './Dashboard.css';

function Dashboard({ user, sessionToken, onLogout }) {
    const [profiles, setProfiles] = useState([]);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [profilesLoaded, setProfilesLoaded] = useState(false);

    const handleLoadProfiles = async () => {
        try {
            const response = await getAllProfiles(sessionToken);
            if (Array.isArray(response)) {
                setProfiles(response);
                setProfilesLoaded(true);
                setMessage('Profiles loaded successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to load profiles');
                setMessageType('error');
            }
        } catch (err) {
            setMessage('Error: ' + err.message);
            setMessageType('error');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!username && !bio) {
            setMessage('Please enter username or bio');
            setMessageType('error');
            return;
        }

        try {
            const response = await updateProfile(user.email, username, bio, sessionToken);
            if (response.id) {
                setMessage('Profile updated successfully');
                setMessageType('success');
                setUsername('');
                setBio('');
            } else {
                setMessage('Failed to update profile');
                setMessageType('error');
            }
        } catch (err) {
            setMessage('Error: ' + err.message);
            setMessageType('error');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="dashboard-container">
            {/* Top Section - User Welcome */}
            <div className="dashboard-welcome">
                <div className="welcome-content">
                    <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                    <div className="welcome-text">
                        <h1>Welcome, {user.username}! 👋</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">

                {/* Left Column - Update Profile */}
                <div className="dashboard-section update-section">
                    <div className="section-header">
                        <h2>📝 Update Profile</h2>
                    </div>

                    <div className="user-current-info">
                        <div className="info-item">
                            <span className="info-label">Current Username:</span>
                            <span className="info-value">{user.username}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Current Bio:</span>
                            <span className="info-value">{user.bio || 'No bio added yet'}</span>
                        </div>
                    </div>

                    {message && (
                        <div className={`alert alert-${messageType}`}>
                            {messageType === 'success' ? '✓' : '!'} {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdateProfile} className="update-form">
                        <div className="form-group">
                            <label>New Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter new username"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us about yourself..."
                                rows="4"
                                className="form-textarea"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Right Column - All Users */}
                <div className="dashboard-section users-section">
                    <div className="section-header">
                        <h2>👥 All Users</h2>
                    </div>

                    <button
                        onClick={handleLoadProfiles}
                        className="btn btn-secondary"
                    >
                        {profilesLoaded ? 'Refresh Profiles' : 'Load All Profiles'}
                    </button>

                    <div className="profiles-container">
                        {profilesLoaded && profiles.length > 0 ? (
                            <div className="profiles-grid">
                                {profiles.map((profile) => (
                                    <div key={profile.id} className="profile-card">
                                        <div className="profile-avatar">
                                            {profile.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="profile-info">
                                            <h3>{profile.username}</h3>
                                            <p className="profile-email">{profile.email}</p>
                                            <p className="profile-bio">{profile.bio || 'No bio'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : profilesLoaded && profiles.length === 0 ? (
                            <div className="empty-state">
                                <p>No profiles found</p>
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>Click "Load All Profiles" to see users</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;