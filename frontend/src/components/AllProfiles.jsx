import React, { useState, useEffect } from 'react';
import { getAllProfiles } from '../api/auth';
import Button from './Button';
import Card from './Card';
import './AllProfiles.css';

const AllProfiles = ({ sessionToken }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLoadProfiles = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await getAllProfiles(sessionToken);
            if (Array.isArray(response)) {
                setProfiles(response);
                setMessage(`✅ Found ${response.length} user(s)`);
            } else {
                setMessage('❌ Failed to load profiles');
            }
        } catch (err) {
            setMessage('❌ Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="👥 All Users Directory">
            {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <Button onClick={handleLoadProfiles} disabled={loading} variant="secondary">
                {loading ? 'Loading...' : '📋 Load All Profiles'}
            </Button>

            {profiles.length > 0 && (
                <div className="profiles-list">
                    {profiles.map((profile, index) => (
                        <div key={profile.id} className="profile-item">
                            <p><strong>{index + 1}. {profile.username}</strong></p>
                            <p>📧 {profile.email}</p>
                            <p>📝 {profile.bio || '(No bio)'}</p>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default AllProfiles;