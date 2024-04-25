import React, { useEffect, useState } from 'react'
import {BsThreeDots} from 'react-icons/bs'
import {MdPlaylistAddCheck} from 'react-icons/md'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import {RiHeartAddFill, RiPlayListAddFill, RiShareForwardLine} from 'react-icons/ri'
import './LikeWatchLaterSaveBtns.css'
import { useDispatch, useSelector } from 'react-redux'
import { likeVideo } from '../../actions/videoAction'
import { addToLikedVideo, deleteLikedVideo } from '../../actions/likedVideo'
import { addToWatchLater, deleteWatchLater } from '../../actions/watchLater'

function LikeWatchLaterSaveBtns({vv, vid}) {

  const currentUser = useSelector(state=>state?.currentUserReducer)  
  const [saveVideo, setSaveVideo] = useState(false)
  const [dislikeBtn, setDislikeBtn] = useState(false)
  const [likeBtn, setLikeBtn] = useState(false)
  const dispatch = useDispatch();
  const likedVideoList = useSelector(state=>state.likedVideoReducer)
  const watchLater = useSelector(state=>state.watchLaterReducer)
  const channels = useSelector(state => state?.channelReducers)
  const currentChannel = channels.filter(c => c._id === vv.videoChannel)[0];
  const isSubscribed = useSelector(state=>state?.subscribeReducer.isSubscribed)

  useEffect(()=>{
    likedVideoList?.data.filter(q=>q?.videoId === vid && currentUser?.result._id).map(m=>setLikeBtn(true))
    watchLater?.data.filter(q=>q?.videoId === vid && currentUser?.result._id).map(m=>setSaveVideo(true))
  },[])

  const toggleSavedVideo=() => {
    if(currentUser) {
      if (currentChannel?.isRestricted && !isSubscribed) {
        alert('Please subscribe to this channel to save the video.');
      } else {
        if (saveVideo) {
          setSaveVideo(false)
          dispatch(deleteWatchLater({
            videoId: vid,
            viewer: currentUser?.result._id,
          }))
        } else {
          setSaveVideo(true)
          dispatch(addToWatchLater({
            videoId: vid,
            viewer: currentUser?.result._id,
          }))
        }
      }
    } else {
      alert('Please Login First')
    }
  }

  const toggleLikeBtn=(e, lk)=>{
    if(currentUser) {
      if (currentChannel?.isRestricted && !isSubscribed) {
        alert('Please subscribe to this channel to like the video.');
      } else {
        if (likeBtn) {
          setLikeBtn(false)
          dispatch(
            likeVideo({
              id: vid,
              like: lk - 1,
            })
          )
          dispatch(
            deleteLikedVideo({
              videoId: vid,
              viewer: currentUser?.result._id,
            })
          )
        } else {
          setLikeBtn(true)
          dispatch(
            likeVideo({
              id: vid,
              like: lk + 1,
            })
          )
          dispatch(addToLikedVideo({
            videoId: vid,
            viewer: currentUser?.result._id,
          }))
          setDislikeBtn(false)
        }
      }
      
    } else {
      alert("Please Login first")
    }
    
  }

  const toggleDislikeBtn=(e, lk)=>{
    if(currentUser) {
      if (currentChannel?.isRestricted && !isSubscribed) {
        alert('Please subscribe to this channel to dislike the video.');
      } else {
        if (dislikeBtn) {
          setDislikeBtn(false)
        } else {
          setDislikeBtn(true)
          if(likeBtn){
            dispatch(
              likeVideo({
                id: vid,
                like: lk - 1
              })
            )
            dispatch(
              deleteLikedVideo({
                videoId: vid,
                viewer: currentUser?.result._id,
              })
            )
          }
          setLikeBtn(false)
        }
      }
    } else {
      alert("Please Login first")
    }
    
  }  

  return (
    <div className='btns_cont_videoPage'>
        <div className="btn_VideoPage">
            <BsThreeDots />
        </div>
        <div className="btn_VideoPage">
          <div className="like_videoPage" onClick={(e)=>toggleLikeBtn(e, vv.like)}>
          {
            likeBtn ? (
              <>
                <AiFillLike size={22} className='btns_videoPage'/>
              </>
            ) : (
              <>
                <AiOutlineLike size={22} className='btns_videoPage'/>
              </>
            )
          } 
          <b>{vv?.like}</b>
          </div>

          <div className="like_videoPage" onClick={(e)=>toggleDislikeBtn(e, vv.like)}>
          {
            dislikeBtn ? (
              <>
                <AiFillDislike size={22} className='btns_videoPage'/>
              </>
            ) : (
              <>
                <AiOutlineDislike size={22} className='btns_videoPage'/>
              </>
            )
          } 
          <b>Dislike</b>
          </div>

          <div className="like_videoPage">
              <>
                <RiHeartAddFill size={22} className='btns_videoPage'/>
                <b>Thanks</b>
              </>
          </div>
          <div className="like_videoPage">
              <>
                <RiShareForwardLine size={22} className='btns_videoPage'/>
                <b>Share</b>
              </>
          </div>
          <div className="like_videoPage" onClick={()=>toggleSavedVideo()}>
          {
            saveVideo ? (
              <>
                <MdPlaylistAddCheck size={22} className='btns_videoPage'/>
                <b>Saved</b>
              </>
            ) : (
              <>
                <RiPlayListAddFill size={22} className='btns_videoPage'/>
                <b>Save</b>
              </>
            )
          } 
          </div>
        </div>
    </div>
  )
}

export default LikeWatchLaterSaveBtns