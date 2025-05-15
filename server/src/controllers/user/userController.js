import User from "../../models/user.js";
import { UserDoesNotExist } from "../../utils/errors.js"

async function getUserById(userId) {
    const user = await User.findById(userId);
    if(user === null){
        throw new UserDoesNotExist();
    }
    return user;
}

async function getUserWins(userId) {
    const user = await User.findById(userId);
    if(user === null){
        throw new UserDoesNotExist();
    }
    return user.wins;
}

async function deleteUser(userId){
    const user = await User.findByIdAndDelete(userId);
    if(user === null){
        throw new UserDoesNotExist();
    }
    return user;
}

export {
    getUserWins,
    deleteUser,
    getUserById
}