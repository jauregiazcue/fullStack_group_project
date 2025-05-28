
class QuestionnaireDoesNotExist extends Error {
    constructor() {
        super("Questionnaire does not exist");
        this.statusCode = 401;
    }
}

class OwnerDoesNotHaveAnyQuestionnaires extends Error {
    constructor() {
        super("Questionnaire does not exist");
        this.statusCode = 204;
    }
}

class TitleNotProvided extends Error {
    constructor() {
        super("Title is not given");
        this.statusCode = 400;
    }
}

class QuestionsNotProvided extends Error {
    constructor() {
        super("Questions are not given");
        this.statusCode = 400;
    }
}

class OwnerNotProvided extends Error {
    constructor() {
        super("Owner is not given");
        this.statusCode = 400;
    }
}

export {
    QuestionnaireDoesNotExist,
    OwnerDoesNotHaveAnyQuestionnaires,
    TitleNotProvided,
    QuestionsNotProvided,
    OwnerNotProvided
}