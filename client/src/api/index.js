import axios from 'axios'

// const API = axios.create({baseURL: `https://youtubeclone-qa7u.onrender.com`})
const API = axios.create({baseURL: `http://localhost:5500/`})
API.interceptors.request.use(req=>{
    if(localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const signup = (authData) => API.post('/user/signup', authData)
export const signin = (authData) => API.post('/user/signin', authData) 
export const login = (authData) => API.post('/user/login',authData)

export const updateChannelData = (id, updateData) => API.patch(`/user/update/${id}`, updateData)
export const fetchAllChannel = () => API.get('/user/getAllChannels')
export const toggleRestriction = (channelId, isRestricted) => API.patch(`/user/${channelId}/toggleRestriction`, isRestricted)

export const uploadVideo = (fileData, fileOptions) => API.post('/video/uploadVideo', fileData, fileOptions) 
export const getVideos = () => API.get('/video/getvideos')
export const likeVideo = (id, like) => API.patch(`/video/like/${id}`, {like})
export const viewsVideo = (id) => API.patch(`/video/view/${id}`)

export const addToLikedVideo = (likedVedioData) => API.post('/video/likedVideo', likedVedioData)
export const getAllLikedVideo = () => API.get('/video/getAllLikedVideo')
export const deleteLikedVideo = (videoId, viewer) => API.delete(`/video/deleteLikedVideo/${videoId}/${viewer}`)

export const addToWatchLater = (watchLaterData) => API.post('/video/watchLater', watchLaterData)
export const getAllWatchLater = () => API.get('/video/getAllWatchLater')
export const deleteWatchLater = (videoId, viewer) => API.delete(`/video/deleteWatchLater/${videoId}/${viewer}`)

export const addToHistory = (historyData) => API.post('/video/history', historyData)
export const getAllHistory = () => API.get('/video/getAllHistory')
export const clearHistory = (userId) => API.delete(`/video/clearHistory/${userId}`)

export const postComment = (commentData) => API.post('/comment/post', commentData)
export const deleteComment = (id) => API.delete(`/comment/delete/${id}`)
export const editComment = (id, commentBody) => API.patch(`/comment/edit/${id}`,{commentBody})
export const getAllComment = () => API.get('/comment/get')

export const subscribe = (userId , channelId) => API.post('/user/subscribe', userId , channelId)
export const unsubscribe = ({userId, channelId}) => API.delete(`/user/unsubscribe/${userId}/${channelId}`)
export const subscriptionStatus = ({userId, channelId})=>API.get(`/user/subscriptionStatus/${userId}/${channelId}`)