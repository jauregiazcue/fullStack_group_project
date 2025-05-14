import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    nickname: {
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model("User",userSchema)
