import mongoose from 'mongoose'
import likedVideo from '../models/likedVideo.js'

export const likedVideoController = async(req, res) => {
    const likedVideoData = req.body;
    // console.log(likedVideoData)

    const addToLikedVideo = new likedVideo(likedVideoData)

    try {
        await addToLikedVideo.save();
        res.status(200).json('added to likedVideo')
        // console.log('done')
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllLikedVideoController = async(req, res) => {
    try {
        const files = await likedVideo.find();
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export const deleteLikedVideoController = async(req, res) => {
    const {videoId: videoId, viewer: viewer} = req.params;
    try {
        await likedVideo.findOneAndDelete({
            videoId: videoId, viewer: viewer
        })
        res.status(200).json({message: "Removed for liked videos"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}