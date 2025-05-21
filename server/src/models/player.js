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
    avatar: {
        type: String,
        enum: ["avatar_img1", "avatar_img2", "favatar_img3"],
        default: "avatar_img1",
        required: true
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
