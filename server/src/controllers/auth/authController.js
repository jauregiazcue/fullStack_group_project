import User from "../../models/user.js";
import { hash, compare } from "../../utils/bcrypt.js";
import {
    UserNicknameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials
} from "../../utils/errors/userErrors.js";


async function register(userData) {

    if (!userData.nickname) {
        throw new UserNicknameNotProvided();
    }
    if (!userData.email) {
        throw new UserEmailNotProvided();
    }
    if (!userData.password) {
        throw new UserPasswordNotProvided();
    }

    const oldUser = await User.findOne({email: userData.email});

    if (oldUser) {
        throw new UserEmailAlreadyExists();
    }

    const hashedPassword = await hash(userData.password);

    userData.password = hashedPassword;
    const newUser = new User(userData);
    await newUser.save();

    return newUser;
}

async function login(email, password) {

    if (!email) {
        throw new UserEmailNotProvided();
    }

    if (!password) {
        throw new UserPasswordNotProvided();
    }

    const user = await User.findOne({email});

    if (!user) throw new UserInvalidCredentials();

    const isSamePassword = await compare(password, user.password);

    if (!isSamePassword) throw new UserInvalidCredentials();

    return user;

}

export default {
    register,
    login
}