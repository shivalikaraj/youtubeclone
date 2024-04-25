import mongoose from "mongoose";

const videoFileSchema = new mongoose.Schema({
    videoTitle: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: String,
        required: true,
    },
    videoChannel:{
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    Uploader: {
        type: String,
    },
},
{
    timestamps: true
});

export default mongoose.model("VideoFiles", videoFileSchema);