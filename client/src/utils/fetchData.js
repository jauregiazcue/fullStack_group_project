// import { getToken } from "../utils/localStorage";

const BASE_URL = "http://localhost:3000";

async function fetchData(route, method="GET", data=null) {
    console.log("Vamos a ver");
    const url = BASE_URL + route;
    console.log("This is the url", url);
    // const token = getToken();
    const options = { 
        method: method,
        headers: {} 
    };
    
    // if (token) {
    //     options.headers["Authorization"] = `Bearer ${token}`;
    // }
    
    if (data) {
        options.headers["Content-Type"] = "application/json"; 
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        console.log("Response is: ", response);
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