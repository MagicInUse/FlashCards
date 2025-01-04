import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CARD } from '../utils/mutations';
import { GET_CARDS, GET_USER_BY_ID } from '../utils/queries';
import Card from '../components/Card';
import { getCurrentUserId } from '../utils/auth';

const DeleteCard = () => {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
        variables: { id: userId }
    });
    const { loading, error, data } = useQuery(GET_CARDS);
    const [selectedCardId, setSelectedCardId] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [deleteCard] = useMutation(DELETE_CARD, {
        onCompleted: () => navigate('/profile'),
        refetchQueries: [{ query: GET_CARDS }]
    });

    const handleCardSelect = (event) => {
        setSelectedCardId(event.target.value);
        setShowConfirmation(false);
    };

    const handleDelete = async () => {
        try {
            await deleteCard({
                variables: {
                    id: parseInt(selectedCardId)
                }
            });
        } catch (e) {
            console.error('Error deleting card:', e);
        }
    };

    if (loading || userLoading) return <p>Loading...</p>;
    if (error || userError) return <p>Error loading data</p>;

    const isAuthorized = userData?.user?.authLevel > 0;
    const selectedCard = data?.cards.find(card => card.id === parseInt(selectedCardId));

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh',
            gap: '20px',
            padding: '20px'
        }}>
            <div>
                <h2>Delete Card</h2>
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
                <div className="button-group">
                    {!showConfirmation ? (
                        <>
                            <button 
                                onClick={() => setShowConfirmation(true)}
                                disabled={!selectedCardId || !isAuthorized}
                            >
                                Delete Card
                            </button>
                            <button onClick={() => navigate('/profile')}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <div className="confirmation-dialog">
                            <p>Are you sure you want to delete this card?</p>
                            <button onClick={handleDelete}>Yes, Delete</button>
                            <button onClick={() => setShowConfirmation(false)}>No, Cancel</button>
                        </div>
                    )}
                    </div>
                    {!isAuthorized && (
                        <div className="auth-error">
                            You need elevated privileges to delete cards. Please contact an administrator.
                        </div>
                    )}
                </div>
            {/* Right Side - Preview */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                {selectedCard && (
                    <Card 
                        previewMode={true} 
                        previewData={selectedCard} 
                    />
                )}
            </div>
        </div>
    );
};

export default DeleteCard;