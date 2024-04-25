import subscriber from '../models/subscriber.js';


export const subscribe = async (req, res) => {
    const {userId, channelId} = req.body;

    const subscribe = new subscriber({userId, channelId})

    try{
        await subscribe.save();
        res.status(200).json("subscribed")
    } catch (error) {
        res.status(400).json(error)
    }
}

export const unsubscribe = async( req, res) => {
    const {userId: userId, channelId: channelId} = req.params;   
    try {
        await subscriber.deleteMany({
            userId: userId,
            channelId: channelId
        });      
        res.status(200).json({message: "unsubscribed"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const fetchSubscriptionStatus = async(req, res) => {
    const {userId, channelId} = req.params;
    try {
        const existingSubscriber = await subscriber.findOne({userId, channelId})
        const isSubscribed = !!existingSubscriber;
        res.status(200).json({isSubscribed})
    } catch (error) {
        console.error("Error fetching Subscription Status", error)
        res.status(500).json({error: "Internal server error"})
    }
}