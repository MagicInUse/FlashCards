import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries.js';

const Card = () => {
    const { loading, error, data } = useQuery(GET_CARDS);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data && data.cards.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.cards.length);
            setCurrentIndex(randomIndex);
        }
    }, [data]);

    if (loading) return <p id="loading">Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.cards.length);
        setShowAnswer(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.cards.length) % data.cards.length);
        setShowAnswer(false);
    };

    const handleRandom = () => {
        const randomIndex = Math.floor(Math.random() * data.cards.length);
        setCurrentIndex(randomIndex);
        setShowAnswer(false);
    };

    const card = data.cards[currentIndex];

    return (
        <div id="flashcard-container">
            <div key={card.id} id="flashcard">
                <div id="class-id-container">
                    <div id="card-class">{card.cardClass}</div>
                    <div id="card-id">{card.id}</div>
                </div>
                <div id={showAnswer ? 'back' : 'front'}>
                    <p dangerouslySetInnerHTML={{ __html: showAnswer ? card.back : card.front }}></p>
                </div>
                <div id="button-container">
                    <button onClick={handlePrevious}>Previous Card</button>
                    <button onClick={handleNext}>Next Card</button>
                    <button onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? 'Show Front' : 'Show Back'}
                    </button>
                    <button onClick={handleRandom}>Random Card</button>
                </div>
            </div>
        </div>
    );
};

export default Card;