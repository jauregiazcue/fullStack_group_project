import mongoose from "mongoose"

const questionnaireSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  questions: {
    type: [{
      question: {
        type: String,
        required: true,
        trim: true
      },

      timer: {
        type: Number,
        required: false
      }
    }],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.model("Questionnaire", questionnaireSchema);