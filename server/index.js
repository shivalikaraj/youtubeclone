import mongoose from 'mongoose'
import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import path from 'path'


//USING .ENV FILE
dotenv.config()
 
const app = express()
app.use(cors())
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use('/uploads', express.static(path.join('uploads')))
app.use(bodyParser.json())

app.use('/user',userRoutes)
app.use('/video', videoRoutes)
app.use('/comment', commentsRoutes)

//CONNECTING TO DATABASE
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log("Connected to MongoDB"))
    .catch((error)=> console.log(error));

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

 