import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Cards = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card />
            <br />
            <button onClick={() => navigate('/profile')}>
                Quit Session
            </button>
        </div>
    );
}

export default Cards;