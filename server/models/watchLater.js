import mongoose from 'mongoose'

const watchLaterSchema = mongoose.Schema({
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

export default mongoose.model('WatchLater', watchLaterSchema)