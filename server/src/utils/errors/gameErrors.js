
class GameDoesNotExist extends Error {
    constructor() {
        super("Game does not exist");
        this.statusCode = 401;
    }
}

class QuestionsNotProvided extends Error {
    constructor() {
        super("Questions are not given");
        this.statusCode = 400;
    }
}


class QuestionnaireNotProvided extends Error {
    constructor() {
        super("Questions are not given");
        this.statusCode = 400;
    }
}

class HostNotProvided extends Error {
    constructor() {
        super("Host is not given");
        this.statusCode = 400;
    }
}

export {
    GameDoesNotExist,
    QuestionsNotProvided,
    QuestionnaireNotProvided,
    HostNotProvided
}