import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';
import { getCurrentUserId, logout } from '../utils/auth';

const Profile = () => {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id: userId }
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            minHeight: '100vh',
            gap: '20px'
        }}>
            {/* Left Menu */}
            <div style={{
                padding: '20px',
                backgroundColor: '#151515',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <button onClick={() => navigate('/cards')}>Study</button>
                <button onClick={() => navigate('/edit')}>Edit Cards</button>
                <button onClick={() => navigate('/delete')}>Delete Card</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Right Content */}
            <div style={{ padding: '20px' }}>
                <h1>Profile Information</h1>
                <br />
                {loading && <p>Loading...</p>}
                {error && <p>Error loading profile data</p>}
                {data && data.user && (
                    <div>
                        <p><strong>Username:</strong> {data.user.username}</p>
                        <p><strong>Authorization level:</strong> {data.user.authLevel}</p>
                        <p><strong>Member since:</strong> {formatDate(data.user.createdAt)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;