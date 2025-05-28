
const avatars = [
    "/public/avatars/avatar(01).png",
    "/public/avatars/avatar(02).png",
    "/public/avatars/avatar(03).png",    
    "/public/avatars/avatar(04).png",    
    "/public/avatars/avatar(05).png",    
    "/public/avatars/avatar(06).png",    
    "/public/avatars/avatar(07).png",    
    "/public/avatars/avatar(08).png",    
    "/public/avatars/avatar(09).png",    
    "/public/avatars/avatar(10).png",
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