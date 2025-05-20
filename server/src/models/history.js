import mongoose from "mongoose";
/* TODO: import players schema */

const historySchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, //es un puntero al modelo User, específicamente al _id. Optimiza pq no duplica datos del user
        ref: "User"
    },
    questionnaire_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "questionnaire"
    },
    players: [{
        nickname: {
            type: String,
            required: true,
            trim: true
        }
    }],
    playedAt: { 
        type: Date, 
    }
});

export default mongoose.model("History", historySchema);

