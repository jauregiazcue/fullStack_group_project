import { getToken } from "./localStorage.js";
const BASE_URL = "http://localhost:3000"; //TODO: pasar url

async function fetchData(route, method="GET", data=null) {
    const url = BASE_URL + route;
    const token = getToken();
    const options = {
        method: method,
        headers: {}
    };

    
    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }
    
    if (data) {
        options.headers["Content-Type"] = "application/json"; 
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const responseData = await response.json(); 
        if (!response.ok) { 
            responseData.status = response.status;
        }
        return responseData;
    } catch (error) {
        console.error("Error de fetch", error);
        return { error: "Error al hacer el fetch de los datos" }; 
    }
}

export default fetchData;