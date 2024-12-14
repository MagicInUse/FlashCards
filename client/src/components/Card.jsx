import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries.js';

const Card = () => {
    const { loading, error, data } = useQuery<CardsData>(GET_CARDS);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.cards.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.cards.length) % data.cards.length);
    };

    const handleRandom = () => {
        const randomIndex = Math.floor(Math.random() * data.cards.length);
        setCurrentIndex(randomIndex);
    };

    const card = data.cards[currentIndex];

    return (
        <div id="flashcard-container">
            <div key={card.id} id="flashcard">
                <div id="class-id-container">
                    <div id="card-class">{card.class}</div>
                    <div id="card-id">{card.id}</div>
                </div>
                <div id={showAnswer ? 'back' : 'front'}>
                    <p>{showAnswer ? card.front : card.back}</p>
                </div>
                <div id="button-container">
                    <button onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? 'Show Question' : 'Show Answer'}
                    </button>
                    <button onClick={handlePrevious}>Previous Card</button>
                    <button onClick={handleNext}>Next Card</button>
                    <button onClick={handleRandom}>Random Card</button>
                </div>
            </div>
        </div>
    );
};

export default Card;