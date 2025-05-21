
//Errores referentes al player

class PlayerDoesNotExist extends Error {
    constructor(){
        super("User does not exist");
        this.statusCode = 204;
    }
}

class PlayerAlredyExist extends Error {
    constructor(){
        super("Player name alredy exist");
        this.statusCode = 400;
    }
}
class AvatarIsAlredySelected extends Error {
    constructor(){
        super("Avatar is alredy selected");
        this.statusCode = 400;
    }
}

export {
    PlayerDoesNotExist,
    PlayerAlredyExist,
    AvatarIsAlredySelected
}