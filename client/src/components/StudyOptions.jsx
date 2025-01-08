import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS, GET_USERS } from '../utils/queries';
import { getCurrentUserId } from '../utils/auth';

const StudyOptions = ({ onCardsFiltered }) => {
    const currentUserId = getCurrentUserId() || '';
    const [selectedUserId, setSelectedUserId] = useState(currentUserId);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [selectedClass, setSelectedClass] = useState('all');
    const [timerEnabled, setTimerEnabled] = useState(false);
    const [timerDuration, setTimerDuration] = useState(15);
    
    // Add cards query
    const { loading: cardsLoading, error: cardsError, data: cardsData } = useQuery(GET_CARDS);
    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);

    // Update parent component when filters change
    useEffect(() => {
        const filteredCards = getFilteredCards();
        onCardsFiltered(filteredCards);
    }, [showAllUsers, selectedUserId, selectedClass, cardsData]);

    // Get unique classes from filtered cards
    const getAvailableClasses = () => {
        if (!cardsData?.cards) return [];
        
        const filteredCards = showAllUsers 
            ? cardsData.cards
            : cardsData.cards.filter(card => card.cardCreatorId === selectedUserId);
            
        const uniqueClasses = [...new Set(filteredCards.map(card => card.cardClass))];
        return uniqueClasses.sort();
    };

    // Get filtered cards based on selections
    const getFilteredCards = () => {
        if (!cardsData?.cards) return [];
        
        return cardsData.cards.filter(card => {
            const userMatch = showAllUsers || card.cardCreatorId === selectedUserId;
            const classMatch = selectedClass === 'all' || card.cardClass === selectedClass;
            return userMatch && classMatch;
        });
    };

    return (
        <div style={{
            padding: '20px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            borderBottom: '1px solid var(--secondary-text)'
        }}>
            <h2>Study Options</h2>
            <div className="form-group-h" style={{ minWidth: '200px' }}>
                <input
                    type="checkbox"
                    checked={showAllUsers}
                    onChange={(e) => {
                        setShowAllUsers(e.target.checked);
                        if (e.target.checked) {
                            setSelectedUserId(currentUserId);
                        }
                    }}
                />
                <label>
                    {' '}All Users
                </label>
                <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    disabled={showAllUsers}
                    style={{ marginLeft: '10px' }}
                >
                    <option value={currentUserId}>{showAllUsers ? 'All Cards' : 'My Cards'}</option>
                    {usersLoading ? (
                        <option disabled>Loading users...</option>
                    ) : usersError ? (
                        <option disabled>Error loading users</option>
                    ) : (
                        usersData?.users
                            ?.filter(user => user.id !== currentUserId)
                            ?.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))
                    )}
                </select>
            </div>

            <div className="form-group-h" style={{ minWidth: '200px' }}>
                <label>Class:</label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="all">All Classes</option>
                    {cardsLoading ? (
                        <option disabled>Loading classes...</option>
                    ) : cardsError ? (
                        <option disabled>Error loading classes</option>
                    ) : (
                        getAvailableClasses().map(className => (
                            <option key={className} value={className}>
                                {className}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="form-group-h" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    type="checkbox"
                    checked={timerEnabled}
                    onChange={(e) => setTimerEnabled(e.target.checked)}
                />
                <label>
                    {' '}Timer
                </label>
                <input
                    type="number"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                    min="5"
                    max="60"
                    disabled={!timerEnabled}
                    style={{ width: '70px' }}
                />
                <span>minutes</span>
            </div>
        </div>
    );
};

export default StudyOptions;