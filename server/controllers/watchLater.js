import mongoose from 'mongoose'
import watchLater from '../models/watchLater.js'

export const watchLaterController = async(req, res) => {
    const watchLaterData = req.body;
    // console.log(watchLaterData)

    const addToWatchLater = new watchLater(watchLaterData)

    try {
        await addToWatchLater.save();
        res.status(200).json('added to watchLater')
        // console.log('done')
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllWatchLaterController = async(req, res) => {
    try {
        const files = await watchLater.find();
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export const deleteWatchLaterController = async(req, res) => {
    const {videoId: videoId, viewer: viewer} = req.params;
    try {
        await watchLater.findOneAndDelete({
            videoId: videoId, viewer: viewer
        })
        res.status(200).json({message: "Removed for watch later"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}