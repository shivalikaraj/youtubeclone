import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    videoId: String,
    userId: String,
    commentBody: String,
    userCommented: String,
    CommentOn: {
        type: String,
        default: Date.now
    }
})

export default mongoose.model("Comment", commentSchema)