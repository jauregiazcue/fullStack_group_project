function Logout() {const handleLogout = () => {
    ['authToken', '_id', 'email', 'nickname'].forEach(key =>
        localStorage.removeItem(key)
    );
};
    return <button onClick={handleLogout}>Cerrar sesión</button>;
}

export default Logout;