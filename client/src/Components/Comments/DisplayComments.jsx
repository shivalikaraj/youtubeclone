import React, { useState } from 'react'
import './Comments.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, editComment } from '../../actions/comments'
import moment from 'moment'

function DisplayComments({Cid, commentBody, userId, userCommented, commentOn}) {

  const currentUser = useSelector(state=>state?.currentUserReducer)

  const [edit, setEdit] = useState(false)
  const [cmtBdy, setcmtBdy] = useState("")
  const [cmtId, setCmtId] = useState("")
  const dispatch = useDispatch();

  const handleEdit=(ctId, ctBdy)=>{
    setEdit(true)
    setCmtId(ctId)
    setcmtBdy(ctBdy)
  }

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(!cmtBdy) {
      alert("Type your comment")
    } else {
      dispatch(editComment({
        id: cmtId,
        commentBody: cmtBdy,
      }))
      setcmtBdy("")
    }
    setEdit(false)
  }

  const handleDelete = (id) => {
    dispatch(deleteComment(id))
  } 
  
  return (
    <>
      {
        edit ? (
          <>
          <form className='comments_sub_form_comments' 
          onSubmit={handleOnSubmit}
          >
            <input 
                type="text" 
                onChange={e=>setcmtBdy(e.target.value)}
                placeholder='Edit comment...'
                value={cmtBdy}
                className='comment_ibox'
            />
            <input type="submit" value='Change' className='comment_add_btn_comments'/>
        </form>
          </>
          ):(
            <p className="comment_body">{commentBody}</p>
          )}
        
        <p className="usercommented">- {userCommented} commented {moment(commentOn).fromNow()}</p>
        {
          currentUser?.result._id === userId && (
            <p className="EditDel_DisplayComment">
              <i onClick={()=>handleEdit(Cid, commentBody)}>Edit</i>
              <i onClick={()=>handleDelete(Cid)}>Delete</i>
            </p>
          )
        }
        
    </>
  )
}

export default DisplayComments