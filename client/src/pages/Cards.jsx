import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';

const Cards = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { filteredCards } = location.state || { filteredCards: [] };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card cards={filteredCards} />
            <br />
            <button onClick={() => navigate('/profile')}>
                Quit Session
            </button>
        </div>
    );
}

export default Cards;