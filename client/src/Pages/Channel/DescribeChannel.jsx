import React, { useEffect, useState } from 'react'
import { FaEdit, FaUpload } from 'react-icons/fa'
import './DescribeChannel.css'
import { useDispatch, useSelector } from 'react-redux'
import Subscribe from '../../Components/Subscribe/Subscribe'
import { toggleRestriction } from '../../actions/channelUser'

function DescribeChannel({setEditCreateChannel, Cid, setVidUploadPage}) {
    const channels = useSelector(state => state?.channelReducers)
    const currentChannel = channels.filter(c => c._id === Cid)[0];
    
    const currentUser = useSelector(state => state?.currentUserReducer);
    
    const [isRestricted, setIsRestricted] = useState(false)

    const dispatch = useDispatch();

    useEffect (() => {
        setIsRestricted(currentChannel?.isRestricted || false)
    }, [currentChannel])

    const handleToggleRestriction = () => {
        const updateIsRestricted = !isRestricted;
        dispatch(toggleRestriction(currentChannel?._id, updateIsRestricted));
    };

    
    
  return (
    <div className='container3_chanel'>
        <div className='chanel_logo_chanel'>
            <b>
                {currentChannel?.name.charAt(0).toUpperCase()}
            </b>
        </div>
        <div className="description_chanel">
            <b>{currentChannel?.name}</b>
            <p>{currentChannel?.desc}</p>
        </div>
        {
            currentUser?.result._id === currentChannel?._id ?
            (<>
                <p className="editbtn_chanel" onClick={()=>{setEditCreateChannel(true)}}>
                    <FaEdit />
                    <b>Edit Channel</b>
                </p>
                <p className="uploadbtn_chanel" onClick={()=>(setVidUploadPage(true))}>
                    <FaUpload />
                    <b>Upload Video</b>
                </p>
                <div class="toggle-container">
                    <label className="toggle-label">Restrict to Subscribers Only</label>
                    <input type="checkbox" checked={isRestricted} onChange={handleToggleRestriction}/>
                </div>

            </>) :
            (<div className='subscribe-container'>
                <Subscribe channelId={currentChannel?._id} className="subscribe"/>  
            </div>)
        }
    </div>
  )
}

export default DescribeChannel