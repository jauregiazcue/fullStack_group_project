
const avatars = [
    "/public/avatars/avatar(01).svg",
    "/public/avatars/avatar(02).svg",
    "/public/avatars/avatar(03).svg",    
    "/public/avatars/avatar(04).svg",    
    "/public/avatars/avatar(05).svg",    
    "/public/avatars/avatar(06).svg",    
    "/public/avatars/avatar(07).svg",    
    "/public/avatars/avatar(08).svg",    
    "/public/avatars/avatar(09).svg",    
    "/public/avatars/avatar(10).svg",
]

function getAvatars() {
    return avatars;
}

function getAvatarById(id) {
    if (id >= avatars.length) {
        return avatars[avatars.length - 1];
    }else if (id < 0) {
        return avatars[0];
    }
    return avatars[id];
}

export default {
    getAvatars,
    getAvatarById
}