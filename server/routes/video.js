import express from 'express'
import {uploadVideo, getAllVideos} from '../controllers/video.js'
import { likeController } from '../controllers/like.js'
import { viewsController } from '../controllers/views.js'
import { likedVideoController, getAllLikedVideoController, deleteLikedVideoController } from '../controllers/likedVedio.js'
import { watchLaterController, getAllWatchLaterController, deleteWatchLaterController } from '../controllers/watchLater.js'
import { historyController, getAllHistoryController, clearHistoryController } from '../controllers/history.js'
import upload from '../helpers/fileHelpers.js'
import auth from '../middleware/auth.js'

const routes = express.Router();

routes.post("/uploadVideo",auth, upload.single("file"), uploadVideo)
routes.get("/getvideos", getAllVideos)
routes.patch("/like/:id",auth, likeController)
routes.patch("/view/:id", viewsController)

routes.post("/likedVideo",auth, likedVideoController)
routes.get("/getAllLikedVideo", getAllLikedVideoController)
routes.delete("/deleteLikedVideo/:videoId/:viewer",auth, deleteLikedVideoController)

routes.post("/watchLater",auth, watchLaterController)
routes.get("/getAllWatchLater", getAllWatchLaterController)
routes.delete("/deleteWatchLater/:videoId/:viewer",auth, deleteWatchLaterController)

routes.post("/history",auth, historyController)
routes.get("/getAllHistory", getAllHistoryController)
routes.delete("/clearHistory/:userId",auth, clearHistoryController)


export default routes ;