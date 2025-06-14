import mongoose from "mongoose"

const gameSchema = new mongoose.Schema({
  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionnaire",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ["pending", "started", "finished"],
    default: "pending",
    required: true
  },
  questionIndex: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  players: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: false
    }]
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  /*hostSocketId: {
    type: String,
    required: true
  }*/
});

export default mongoose.model("Game", gameSchema);