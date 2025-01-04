import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_CARD } from '../utils/mutations';
import { GET_CARDS, GET_USER_BY_ID } from '../utils/queries';
import Card from '../components/Card';
import SyntaxGuide from '../components/SyntaxGuide';
import { getCurrentUserId } from '../utils/auth';

const EditCard = () => {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { id: userId }
    });
    const { loading, error, data } = useQuery(GET_CARDS);
    const [selectedCardId, setSelectedCardId] = useState('');
    const [formState, setFormState] = useState({
        front: '',
        back: '',
        cardClass: ''
    });

    const [updateCard] = useMutation(UPDATE_CARD, {
        onCompleted: () => navigate('/profile')
    });

    useEffect(() => {
        if (selectedCardId && data) {
            const selectedCard = data.cards.find(card => card.id === parseInt(selectedCardId));
            if (selectedCard) {
                setFormState({
                    front: selectedCard.front,
                    back: selectedCard.back,
                    cardClass: selectedCard.cardClass
                });
            }
        }
    }, [selectedCardId, data]);

    const handleCardSelect = (event) => {
        setSelectedCardId(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCard({
                variables: {
                    id: parseInt(selectedCardId),
                    front: formState.front,
                    back: formState.back,
                    cardClass: formState.cardClass,
                    cardUpdaterId: userId
                }
            });
        } catch (e) {
            console.error('Error updating card:', e);
        }
    };

    if (loading || userLoading) return <p>Loading...</p>;
    if (error || userError) return <p>Error loading data</p>;

    const isAuthorized = userData?.user?.authLevel > 0;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh',
            gap: '20px',
            padding: '20px'
        }}>
            <div>
                <h2>Edit Card</h2>
                <form onSubmit={handleSubmit} className="card-form">
                    <div className="form-group">
                        <label>Select Card:</label>
                        <select 
                            value={selectedCardId} 
                            onChange={handleCardSelect}
                            required
                        >
                            <option value="">Select a card</option>
                            {data.cards.map(card => (
                                <option key={card.id} value={card.id}>
                                    ID: {card.id} - Class: {card.cardClass}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Class:</label>
                        <input
                            type="text"
                            name="cardClass"
                            value={formState.cardClass}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Front:</label>
                        <textarea
                            name="front"
                            value={formState.front}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Back:</label>
                        <textarea
                            name="back"
                            value={formState.back}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" disabled={!isAuthorized || !selectedCardId}>
                            Update Card
                        </button>
                        <button type="button" onClick={() => navigate('/profile')}>
                            Cancel
                        </button>
                    </div>
                    {!isAuthorized && (
                        <div className="auth-error">
                            You need elevated privileges to edit cards. Please contact an administrator.
                        </div>
                    )}
                </form>

                <SyntaxGuide />
            </div>

            {/* Right Side - Preview */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <Card previewMode={true} previewData={formState} />
            </div>
        </div>
    );
};

export default EditCard;