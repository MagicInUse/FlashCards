import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_CARD } from '../utils/mutations';
import Card from '../components/Card';
import SyntaxGuide from '../components/SyntaxGuide';
import { getCurrentUserId } from '../utils/auth';

const AddCard = () => {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const [formState, setFormState] = useState({
        front: '',
        back: '',
        cardClass: '',
        cardCreatorId: userId
    });

    const [addCard] = useMutation(ADD_CARD, {
        onCompleted: () => navigate('/profile')
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addCard({
                variables: { 
                    ...formState,
                    cardCreatorId: userId
                }
            });
        } catch (e) {
            console.error('Error adding card:', e);
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh',
            gap: '20px',
            padding: '20px'
        }}>
            <div>
                <h2>Add New Card</h2>
                <form onSubmit={handleSubmit} className="add-card-form">
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
                        <button type="submit">Add Card</button>
                        <button type="button" onClick={() => navigate('/profile')}>
                            Cancel
                        </button>
                    </div>
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

export default AddCard;