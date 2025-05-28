class HistoryNotFound extends Error {
    constructor(){
        super("History not found");
        this.statusCode = 404;
    }
}

class InvalidNicknameForPlayerIndex extends Error {
    constructor(index){
        super(`Invalid nickname for player: ${index}`);
        this.statusCode = 400;
    }
}

class MissingNicknameForPlayerIndex extends Error {
    constructor(index){
        super(`Missing nickname for player: ${index}`);
       this.statusCode = 400;
    }
}

class ArrayRequired extends Error {
    constructor(){
        super("playersData must be an array");
        this.statusCode = 400;
    }
}

export default {
    HistoryNotFound,
    InvalidNicknameForPlayerIndex,
    MissingNicknameForPlayerIndex,
    ArrayRequired
}