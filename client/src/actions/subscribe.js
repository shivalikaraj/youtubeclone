import * as api from "../api"

export const subscribe = (userId , channelId) => async(dispatch) => {
    try {
        const data = await api.subscribe(userId, channelId)
        dispatch({type: "SUBSCRIBE", data})
        dispatch(subscriptionStatus(userId, channelId))
    } catch (error) {
        console.log(error)
    }
}

export const unsubscribe = (subscribeData) => async(dispatch) => {
    try {
        const {userId, channelId} = subscribeData
        await api.unsubscribe({userId, channelId})
        dispatch(subscriptionStatus({userId, channelId}))
    } catch (error) {
        console.log(error)
    }
}

export const subscriptionStatus = (subscribeData) => async(dispatch) => {
    try{
        const {userId, channelId} = subscribeData
        const data = await api.subscriptionStatus({userId, channelId})
        dispatch({type: "FETCH_SUBSCRIPTION_STATUS", payload: data})
    } catch (error) {
        console.log(error)
    }
}
