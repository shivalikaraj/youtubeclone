import mongoose from "mongoose";
import videoFiles from "../models/videoFiles.js";
  
export const likeController = async (req, res) => {
    const {id:_id} = req.params;
    const {like} = req.body;

    // console.log(_id, like)
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Video Unavailable")
    }

    try {
        const updateLike = await videoFiles.findByIdAndUpdate(
            _id,
            {
                $set: {"like":like}
            }
        )
        res.status(200).json(updateLike)
    } catch (error) {
        res.status(400).json("error:", error)
    }
}
  