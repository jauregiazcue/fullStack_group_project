import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    gameId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    gamePoints:{
        type:Number,
        default:0
    },
    avatar:{
        type: String,
        required: true,
        default: "/public/avatars/avatar(01).svg"
    },
    socketId: {
        type: String
    }
});

const playerModel = mongoose.model("Player", playerSchema);

export default {
    playerModel,
    playerSchema
};
