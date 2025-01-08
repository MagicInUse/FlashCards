import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/queries';

const Profile = ({ userId }) => {
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id: userId }
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Profile Information</h2>
            <br />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading profile data</p>}
            {data && data.user && (
                <div>
                    <p><strong>Username:</strong> {data.user.username}</p>
                    <p><strong>Authorization level:</strong> {data.user.authLevel}</p>
                    <p><strong>Member since:</strong> {formatDate(data.user.createdAt)}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;