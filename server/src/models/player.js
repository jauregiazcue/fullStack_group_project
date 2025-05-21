import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        enum: ["avatar_img1.png", "avatar_img2.png", "favatar_img3.png"],
        default: "avatar_img1",
        required: true
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
    socketId: {
        type: String
    }
});

const playerModel = mongoose.model("Player", playerSchema);

export default {
    playerModel,
    playerSchema
};
