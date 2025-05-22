
// Errores referentes al modelo de usuario

class UserNicknameNotProvided extends Error {
    constructor(){
        super("User name not provided");
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    constructor(){
        super("User email not provided");
        this.statusCode = 400;
    }
}
class UserPasswordNotProvided extends Error {
    constructor(){
        super("User password not provided");
        this.statusCode = 400;
    }
}

class UserEmailAlreadyExists extends Error{
    constructor(){
        super("User email already exists");
        this.statusCode = 400;
    }
}
class UserInvalidCredentials extends Error {
    constructor(){
        super("Invalid credentials");
        this.statusCode = 401;
    }
}

class UserDoesNotExist extends Error {
    constructor(){
        super("User does not exist");
        this.statusCode = 204;
    }
}

export {
    UserNicknameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserDoesNotExist
}