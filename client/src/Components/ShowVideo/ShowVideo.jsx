import React from 'react'
import './ShowVideo.css'
import {Link} from 'react-router-dom'
import moment from 'moment'

function ShowVideo({vid}) {
    // console.log(vid)
  return (
    <div>
        <Link to={`/videopage/${vid?._id}`}>
            <video 
            // src={`https://youtubeclone-wwgf.onrender.com/${vid.filePath}`} 
            src={`http://localhost:5500/${vid.filePath}`} 
            className='video_ShowVideo'
            />
        </Link>
        <div className="video_description">
            <div className="Channel_logo_App">
                <div className="fstChar_logo_App">
                    <p>{vid?.Uploader?.charAt(0).toUpperCase()}</p>
                </div>
            </div>
            <div className="video_details">
                <p className="title_vid_ShowVideo">{vid?.videoTitle}</p>
                <pre className="vid_view_UploadTime">{vid?.Uploader}</pre>
                <pre className="vid_view_UploadTime">
                {vid?.views} views <div className="dot"></div>{moment(vid?.createdAt).fromNow()}
                </pre>
            </div>
        </div>
    </div>
  )
}

export default ShowVideo