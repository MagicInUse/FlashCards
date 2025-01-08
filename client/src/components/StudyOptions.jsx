import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { getCurrentUserId } from '../utils/auth';

const StudyOptions = () => {
    const currentUserId = getCurrentUserId() || '';
    const [selectedUserId, setSelectedUserId] = useState(currentUserId);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [selectedClass, setSelectedClass] = useState('all');
    const [timerEnabled, setTimerEnabled] = useState(false);
    const [timerDuration, setTimerDuration] = useState(15);
    const { loading, error, data } = useQuery(GET_USERS);

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
                    <option value={currentUserId}>My Cards</option>
                    {loading ? (
                        <option disabled>Loading users...</option>
                    ) : error ? (
                        <option disabled>Error loading users</option>
                    ) : (
                        data?.users
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
                    <option disabled>Loading classes...</option>
                </select>
            </div>

            <div className="form-group-h" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={timerEnabled}
                        onChange={(e) => setTimerEnabled(e.target.checked)}
                    />
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