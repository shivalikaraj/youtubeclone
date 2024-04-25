import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type:String, 
        require: true
    },
    name: {
        type: String
    },
    desc: {
        type: String
    },
    password: {
        type: String
    },
    joinedOn: {
        type: Date,
        default: Date.now
    },
    failedAttempts: {
        type: Number,
        default: 0
    }, 
    blockedUntil: {
        type: Date,
        default: null,
    },
    isRestricted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", userSchema)