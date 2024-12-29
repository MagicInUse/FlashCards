import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { logout } from '../utils/auth.js';

const Cards = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card />
            <br />
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Cards;