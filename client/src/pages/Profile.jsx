import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { logout } from '../utils/auth';

const Profile = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_USER);

    const handleLogout = () => {
        logout();
        navigate('/');
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
                backgroundColor: '#f5f5f5',
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
                <h2>Profile Information</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading profile data</p>}
                {data && data.user && (
                    <div>
                        <p><strong>Username:</strong> {data.user.username}</p>
                        <p><strong>Email:</strong> {data.user.email}</p>
                        <p><strong>Member since:</strong> {new Date(parseInt(data.user.createdAt)).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;