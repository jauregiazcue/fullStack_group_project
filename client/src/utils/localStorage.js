export function getToken() {
    return localStorage.getItem("authToken") || null;
}

export function clearToken() {
    localStorage.removeItem("authToken");
}