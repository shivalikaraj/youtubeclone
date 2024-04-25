import React, { useState } from 'react'
import './VideoUpload.css'
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../../actions/videoAction';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'

function VideoUpload({setVidUploadPage}) {

    const currentUser = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [videoFile, setVideoFile] = useState("");


    const handleSetVideoFile = (e) => {
        setVideoFile(e.target.files[0]);
    }

    const [progress, setProgress] = useState(0)

    const fileOptions = {
        onUploadProgress: (progressEvent)=>{
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded/1000)*100)/(total/1000))
            setProgress(percentage)
            if(percentage === 100) {
                setTimeout(function() {}, 3000)
                setVidUploadPage(false)
            }
        }
    }
    
    const uploadVideoFile = () => {
        if(!title) {
            alert("Please enter a title of the video")
        } else if (!videoFile) {
            alert("Please attach video file")
        } else if(videoFile.size > 10000000) {
            alert("Please attach video file less than 1kB")   
        } else {
            const fileData = new FormData();
            fileData.append("file", videoFile)
            fileData.append("title", title)
            fileData.append("channel", currentUser?.result._id)
            fileData.append("Uploader", currentUser?.result.name)
            dispatch(uploadVideo({
                fileData: fileData,
                fileOptions: fileOptions,
            }))
        }
    }

  return (
    <div className='container_VidUpload'>
        <input type="submit" 
            name='text'
            value={'X'}
            className='ibtn_x'
            onClick={()=>setVidUploadPage(false)}
        />
        <div className="container2_VidUpload">
            <div className="ibox_div_vidupload">
                <input type="text" 
                    className='ibox_vidupload'
                    maxLength={50}
                    placeholder='Enter Title of your video'
                    onChange={(e)=>{setTitle(e.target.value)}}
                />
            
                <label htmlFor="file" className='ibox_vidupload btn_vidUpload'>
                    <input type="file" 
                        className='ibox_vidupload'
                        name='file'
                        style={{fontSize: '1rem'}}
                        onChange={e=>{handleSetVideoFile(e)}}
                    />
                </label>
            </div>
            <div className="ibox_div_vidupload">
                <input type="submit" 
                    value="Upload"
                    className='ibox_vidupload btn_vidUpload'
                    onClick={uploadVideoFile}
                />
            </div>
            <div className="loader ibox_div_vidupload">
                <CircularProgressbar 
                    value={progress}
                    text={`${progress}`}
                    styles={
                        buildStyles({
                            rotation: 0.25,
                            strokeLinecap: "butt",
                            textSize: "20px",
                            pathTransitionDuration: 0.5,
                            pathColor: `rgba(255,255,255 ${progress/100})`,
                            textColor: "#f88",
                            trailColor: "#adff2f",
                            backgroundColor: "#3e98c7"
                        })
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default VideoUpload