
function saveToLocalStorage(key, value) {
 
    if (value !== undefined && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.removeItem(key); 
    }
}


function getFromLocalStorage(key, defaultValue = null) {
    const result = localStorage.getItem(key);
    if (result) {
        try {
            return JSON.parse(result); 
        } catch (error) {
            console.error(`Error al parsear: ${key}`, error);
            localStorage.removeItem(key);
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}



function saveToken(token) {
    if (token) {
        saveToLocalStorage("token", token);
    }
}

function getToken(){
    return getFromLocalStorage("token", null);
}

function removeToken(){
    removeFromLocalStorage("token");
}



export {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    saveToken,
    getToken,
    removeToken
}