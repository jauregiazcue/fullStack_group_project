function saveToLocalStorage(key, value,parse=true) {
    if(parse){
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

function getFromLocalStorage(key, defaultValue = null,parse=true) {
    const result = localStorage.getItem(key);
    if (result && parse) {
        return JSON.parse(result);
    } else {
        return defaultValue;
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}

function saveToken(token) {
    saveToLocalStorage("token", token);
}

function getToken(){
    try{
        return getFromLocalStorage("token",null);
    }catch(e){
        return null;
    }
}
function savePlayerNickname(nickname) {
    saveToLocalStorage("nickname", nickname,false);
}

function getPlayerNickname(){
    return getFromLocalStorage("nickname",null,false);
}
function removePlayerNickname(){
    removeFromLocalStorage("nickname");
}

function removeToken(){
    removeFromLocalStorage("token");
}

export {
    saveToken,
    getToken,
    removeToken,
    savePlayerNickname,
    getPlayerNickname,
    removePlayerNickname
}