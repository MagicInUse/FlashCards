export const isAuthenticated = () => !!localStorage.getItem('token');

export const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};