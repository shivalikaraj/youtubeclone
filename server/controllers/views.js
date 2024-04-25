import mongoose from 'mongoose';
import videoFiles from "../models/videoFiles.js";

export const viewsController = async (req, res) => {
    const {id: _id} = req.params

    // console.log(_id)
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Video Unavailable")
    }

    try {
        const file = await videoFiles.findById(_id)
        const views = file.views
        const updateView = await videoFiles.findByIdAndUpdate(
            _id,
            {
                $set: {"views":views + 1}
            }
        )
        res.status(200).json(updateView)
    } catch (error) {
        res.status(400).json("error:", error)
    }
}