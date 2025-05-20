
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

export {
    PlayerDoesNotExist,
    PlayerAlredyExist

}