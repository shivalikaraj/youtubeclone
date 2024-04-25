import express from 'express'
import {signup, login, signin} from '../controllers/auth.js'
import {updateChannelData, getAllChannels, toggleRestriction} from '../controllers/channel.js'
import { emailMiddleware } from '../middleware/emailMiddleware.js'
import auth from '../middleware/auth.js'
import { subscribe, unsubscribe, fetchSubscriptionStatus } from '../controllers/subscribe.js'

const routes = express.Router()


routes.post('/signup', signup)
routes.post('/signin',auth ,emailMiddleware, signin)
routes.post('/login',login)
routes.patch('/update/:id', updateChannelData);
routes.patch('/:channelId/toggleRestriction', toggleRestriction)
routes.get('/getAllChannels', getAllChannels);
routes.post('/subscribe', auth, subscribe)
routes.get('/subscriptionStatus/:userId/:channelId', auth, fetchSubscriptionStatus)
routes.delete('/unsubscribe/:userId/:channelId', auth, unsubscribe)


export default routes