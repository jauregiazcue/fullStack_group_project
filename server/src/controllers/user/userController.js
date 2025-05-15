import User from "../../models/user.js";
import { UserDoesNotExist } from "../../utils/errors.js"

async function getUserById(userId) {
    const user = await User.findById(userId).select("-password");
    if(user === null){
        throw new UserDoesNotExist();
    }
    return user;
}

async function getUserNickname(userId) {
    const user = await User.findById(userId);
    if(user === null){
        throw new UserDoesNotExist();
    }
    return user.nickname;
}

async function getUserWins(userId) {
    const user = await User.findById(userId);
    if(user === null){
        throw new UserDoesNotExist();
    }
    return user.wins;
}

async function editUserNickname(id,data) {
    const user = await User.findByIdAndUpdate(id, data, {new: true}).select("-password");
    return user;
}

async function removeUser(userId){
    const user = await User.findByIdAndDelete(userId);
    if(user === null){
        throw new UserDoesNotExist();
    }
}

export default {
    getUserWins,
    getUserById,
    getUserNickname,
    editUserNickname,
    removeUser
}