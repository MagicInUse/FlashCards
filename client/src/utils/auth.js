import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => !!localStorage.getItem('token');

export const getCurrentUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    
    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (err) {
        console.error('Token decode error:', err);
        logout();
        return '';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};