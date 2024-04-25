import * as api from '../api'

export const addToLikedVideo = (likedVideoData) => async(dispatch) => {
    try {
        const {data} = await api.addToLikedVideo(likedVideoData)
        dispatch({type: "POST_LIKEDVIDEO", data})
        dispatch(getAllLikedVideo())
    } catch (error) {
        console.log(error)
    }
}

export const getAllLikedVideo = () => async(dispatch) => {
    try {
        const {data} = await api.getAllLikedVideo();
        dispatch({type: 'FETCH_ALL_LIKED_VIDEOS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteLikedVideo =(likedVideoData) => async(dispatch) => {
    try {
        const {videoId, viewer} = likedVideoData
        await api.deleteLikedVideo(videoId, viewer)
        dispatch(getAllLikedVideo())
    } catch (error) {
        console.log(error)
    }
}