
class QuestionnaireDoesNotExist extends Error {
    constructor(){
        super("Questionnaire does not exist");
        this.statusCode = 204;
    }
}

export  {
    QuestionnaireDoesNotExist
}