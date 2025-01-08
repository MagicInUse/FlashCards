import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';

const Card = ({ previewMode = false, previewData = null, cards = null }) => {
    const { loading, error, data } = !previewMode && !cards ? useQuery(GET_CARDS) : { loading: false, error: null, data: { cards } };
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!previewMode && !cards && loading) return <p>Loading...</p>;
    if (!previewMode && !cards && error) return <p>Error loading cards</p>;
    if (!previewMode && (!data || !data.cards || data.cards.length === 0)) return <p>No cards found</p>;

    const handleNext = () => {
        setShowAnswer(false);
        setCurrentIndex((prevIndex) => 
            prevIndex === data.cards.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setShowAnswer(false);
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? data.cards.length - 1 : prevIndex - 1
        );
    };

    const handleRandom = () => {
        setShowAnswer(false);
        const randomIndex = Math.floor(Math.random() * data.cards.length);
        setCurrentIndex(randomIndex);
    };

    const card = previewMode ? {
        id: 'Preview',
        cardCreatorId: 'Card Creator',
        ...previewData
    } : data.cards[currentIndex];

    return (
        <div id="flashcard-container">
            <div key={previewMode ? 'preview' : card.id} id="flashcard">
                <div id="class-id-container">
                    <div id="card-class">{card?.cardClass || ''}</div>
                    <div id="card-id">{previewMode ? 'Preview' : card?.id}</div>
                </div>
                <div id={showAnswer ? 'back' : 'front'}>
                    <p id="card-content" 
                       dangerouslySetInnerHTML={{ 
                           __html: showAnswer ? card?.back : card?.front 
                       }}>
                    </p>
                </div>
                <div id="button-container">
                    <button onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? 'Show Front' : 'Show Back'}
                    </button>
                    {!previewMode && (
                    <>
                        <button onClick={handlePrevious}>Previous Card</button>
                        <button onClick={handleNext}>Next Card</button>
                        <button onClick={handleRandom}>Random Card</button>
                    </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;