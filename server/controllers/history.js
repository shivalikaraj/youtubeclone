import mongoose from 'mongoose'
import history from '../models/history.js'

export const historyController = async(req, res) => {
    const historyData = req.body;
    // console.log(historyData)

    const addToHistory = new history(historyData)

    try {
        await addToHistory.save();
        res.status(200).json("added to history")
        // console.log('done')
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllHistoryController = async(req, res) => {
    try {
        const files = await history.find();
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export const clearHistoryController = async(req, res) => {
    const {userId: userId} = req.params;
    try {
        await history.deleteMany({
            viewer: userId
        })
        res.status(200).json({message: "history cleared"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}