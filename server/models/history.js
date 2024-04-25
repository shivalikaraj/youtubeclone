import mongoose from 'mongoose'

const historySchema = mongoose.Schema({
    videoId: {
        type: String,
        require: true,
    },
    viewer: {
        type: String,
        require: true,
    },
    addedOn: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('History', historySchema)