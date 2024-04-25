import mongoose from 'mongoose';
import users from '../models/auth.js'

export const updateChannelData = async (req, res) => {
    const {id: _id} = req.params;
    const {name, desc} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Channel Unavailable...")
    }
   try {
    const updateData = await users.findByIdAndUpdate(_id, {
        $set: {
            'name': name, 'desc': desc
        }
    }, {new:true})
    res.status(200).json(updateData)
   } catch (error) {
    res.status(405).json({message: error.message})
   } 
} 

export const toggleRestriction = async (req, res) => {
    const {channelId} = req.params
    const {isRestricted} = req.body
    try {
        const updateChannel = await users.findByIdAndUpdate(channelId, {
           isRestricted : isRestricted
        }, {new: true});

        if(!updateChannel) {
            return res.status(404).json({message: 'Channel not found'})
        }

        res.status(200).json({message: updateChannel})
    } catch (error) {
        console.error('Error toggling restriction', error)
        res.status(500).json({message: 'Internal server error'})
    }
} 

export const getAllChannels = async (req, res) => {
    try {
        const allChannels = await users.find();
        const allChannelDetails = [];
        allChannels.forEach(channel => {
            allChannelDetails.push({
                _id: channel._id,
                name: channel.name,
                email: channel.email,
                desc: channel.desc,
                isRestricted: channel.isRestricted,
            })
        });
        res.status(200).json(allChannelDetails)
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}