import React, { useState } from 'react'
import './Comments.css'
import DisplayComments from './DisplayComments'
import {useDispatch, useSelector} from 'react-redux'
import { postComment } from '../../actions/comments'

function Comments({videoId, videoChannel}) {

    const [commentText, setCommentText] = useState("")
    const currentUser = useSelector(state=>state?.currentUserReducer)
    const commentsList = useSelector(s=>s.commentReducer)

    const channels = useSelector(state => state?.channelReducers)
    const currentChannel = channels.filter(c => c._id === videoChannel)[0]
    const isSubscribed = useSelector(state=>state?.subscribeReducer.isSubscribed)
    
    const dispatch = useDispatch()

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        if(currentUser) {
            if(!commentText){
                alert("Please type your comment")
            } else {
                dispatch(postComment({
                    videoId: videoId.videoId,
                    userId: currentUser?.result._id,
                    commentBody: commentText,
                    userCommented: currentUser?.result.name,
                }))
                setCommentText("");
            }
        } else {
            alert("Login to post comment")
        }
        
    }

  return (
    <>
    {
        ((currentChannel?.isRestricted && isSubscribed)|| ( (currentChannel?._id === currentUser?.result._id))) &&
        <form className='comments_sub_form_comments' onSubmit={handleOnSubmit}>
            <input 
                type="text" 
                onChange={e=>setCommentText(e.target.value)}
                placeholder='add comment...'
                value={commentText}
                className='comment_ibox'
            />
            <input type="submit" value='add' className='comment_add_btn_comments'/>
        </form>
    }
        
        <div className="display_comment_container">
            {
                commentsList?.data?.filter(q=>videoId.videoId === q?.videoId).reverse().map(m=>{
                    return (
                        <DisplayComments 
                            key={m._id}
                            Cid={m._id}
                            userId={m.userId}
                            commentBody={m.commentBody}
                            commentOn={m.commentOn}
                            userCommented={m.userCommented}
                        />
                    )
                })}
        </div>
    </>
  )
}

export default Comments