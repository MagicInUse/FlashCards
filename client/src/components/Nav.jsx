import React from 'react';

const Nav = ({ navigate, handleLogout, filteredCards }) => {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#151515',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <button onClick={() => navigate('/cards', { state: { filteredCards } })}>Study</button>
            <button onClick={() => navigate('/add')}>Add Card</button>
            <button onClick={() => navigate('/edit')}>Edit Card</button>
            <button onClick={() => navigate('/delete')}>Delete Card</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Nav;