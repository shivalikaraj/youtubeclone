import React, { useEffect } from 'react'
import './VideoPage.css'
// import vid from '../../Components/Video/vid.mp4'
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns'
import Comments from '../../Components/Comments/Comments'
import {Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { addToHistory } from '../../actions/history'
import { viewsVideo } from '../../actions/videoAction'
import Subscribe from '../../Components/Subscribe/Subscribe'

function VideoPage() {

  const {vid} = useParams();
  // console.log(vid)

  const vids = useSelector(state=>state.videoReducer)
  // console.log(vids)
  const vv = vids?.data.filter(q=>q._id === vid)[0]
  //  console.log(vv)
  

  const channels = useSelector(state => state?.channelReducers)
  const currentChannel = channels.filter(c => c._id === vv.videoChannel)[0];
  const currentUser = useSelector(state=>state?.currentUserReducer)
  const isSubscribed = useSelector(state=>state?.subscribeReducer.isSubscribed)
  const dispatch = useDispatch();

  const isUploader = currentUser?.result._id === currentChannel?._id;
  const isRestrictedAndNotSubscribed = currentChannel.isRestricted && !isSubscribed;

  const handleViews = () => {
    if (isUploader || !isRestrictedAndNotSubscribed) {
      dispatch(viewsVideo({ id: vid }));
    }
  }
  const handleHistory = () => {
    if (isUploader || !isRestrictedAndNotSubscribed) {
      dispatch(addToHistory({ videoId: vid, viewer: currentUser?.result._id }));
    }
  }

  useEffect(()=>{
    if(currentUser) {
      handleHistory()
    }
    handleViews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
        <div className="container_videoPage">
            <div className="container2_videoPage">
                <div className="video_display_screen_videoPage">
                {
                  (isRestrictedAndNotSubscribed) && (currentUser?.result._id !== currentChannel?._id)? (
                    <div className="restricted-video-message"><p>Subscribe to watch video</p></div>
                  ):(
                    <>
                    <video 
                    // src={`https://youtubeclone-qa7u.onrender.com/${vv?.filePath}`}
                    src={`http://localhost:5500/${vv?.filePath}`}
                    className='video_ShowVideo_videoPage'
                    controls
                    autoPlay
                    muted
                    />
                    </>
                  )
                }
                    
                    <div className="video_details_videoPage">
                      <div className="video_btns_title_VideoPage_cont">
                        <p className="video_title_VideoPage">{vv?.videoTitle}</p>
                        <div className="views_date_btns_VideoPage">
                          <div className="views_videoPage">
                            {vv?.views} views <div className="dot"></div>{moment(vv?.createdAt).fromNow()}
                          </div>
                          <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                        </div>
                      </div>
                      
                      <div className="channel_details_videoPage">
                      <Link to={`/channel/${vv?.videoChannel}`} className='link'>
                        <b className="channel_logo_videoPage">
                          <p>{vv?.Uploader.charAt(0).toUpperCase()}</p>
                        </b>
                        <p className="channel_name_videoPage">{vv?.Uploader}</p>
                      </Link>
                      {
                        currentUser?.result._id !== vv?.videoChannel &&
                        <Subscribe userId={currentUser?.result._id} channelId = {vv?.videoChannel} />
                      }
                  
                      </div>
                     
            
                      <div className="comments_VideoPage">
                        <h2>
                          <u>Comments</u>
                        </h2>
                        <Comments videoId={vv._id} videoChannel={vv.videoChannel}/>
                      </div>
                    </div>
                </div>
                <div className="moreVideoBar">More Video</div>
            </div>
        </div>
    </>
  )
}

export default VideoPage