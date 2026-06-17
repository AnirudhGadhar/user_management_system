import React, { useState } from 'react';
import { updateProfile, deleteUser } from '../api/auth';
import Button from './Button';
import Card from './Card';
import './Profile.css';

const Profile = ({ user, sessionToken, onProfileUpdated, onDeleteAccount }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        bio: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await updateProfile(user.email, formData.username, formData.bio, sessionToken);
            if (response.id) {
                setMessage('✅ Profile updated successfully!');
                onProfileUpdated(response);
                setIsEditing(false);
                setFormData({ username: '', bio: '' });
            } else {
                setMessage('❌ Update failed');
            }
        } catch (err) {
            setMessage('❌ Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('⚠️ Are you sure? This cannot be undone!')) return;

        setLoading(true);
        try {
            await deleteUser(user.email, sessionToken);
            onDeleteAccount();
        } catch (err) {
            setMessage('❌ Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="✏️ Update Your Profile">
            <div className="profile-info">
                <p><strong>👤 Username:</strong> {user.username}</p>
                <p><strong>📧 Email:</strong> {user.email}</p>
                <p><strong>🆔 User ID:</strong> {user.id}</p>
                <p><strong>📝 Bio:</strong> {user.bio || 'No bio'}</p>
            </div>

            {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="secondary">
                    Edit Profile
                </Button>
            ) : (
                <form onSubmit={handleUpdate} className="form">
                    <div className="form-group">
                        <label>New Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Leave empty to keep current"
                        />
                    </div>

                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Write a short bio..."
                            rows="3"
                        />
                    </div>

                    <div className="form-buttons">
                        <Button disabled={loading} variant="primary">
                            {loading ? 'Saving...' : '💾 Save Changes'}
                        </Button>
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="secondary"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            <Button onClick={handleDelete} variant="danger" disabled={loading}>
                🗑️ Delete Account
            </Button>
        </Card>
    );
};

export default Profile;