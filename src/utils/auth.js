export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
};