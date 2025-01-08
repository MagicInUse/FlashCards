import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId, logout } from '../utils/auth';
import Profile from '../components/Profile';
import Nav from '../components/Nav';
import StudyOptions from '../components/StudyOptions';

const ProfilePage = () => {
    const navigate = useNavigate();
    const userId = getCurrentUserId() || '';

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
            <Nav navigate={navigate} handleLogout={handleLogout} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StudyOptions />
                <Profile userId={userId} />
            </div>
        </div>
    );
};

export default ProfilePage;