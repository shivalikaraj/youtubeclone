import mongoose from 'mongoose'

const subscriberSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Subscriber', subscriberSchema)