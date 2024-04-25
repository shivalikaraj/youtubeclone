import React, { useState } from 'react'
import './CreateEditChannel.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../actions/auth"
import { updateChannelData } from '../../actions/channelUser';

function CreateEditChannel({setEditCreateChannel}) {
    // const currentUser = null;
    // const currentUser = {
    //     result: {
    //       email: "abzxy50312@gmail.com",
    //       joinedOn: "2222-07-15T09:57:23.489Z",
    //     },
    //   };
    const currentUser=useSelector(state=>state.currentUserReducer)

    const [name, setName] = useState(currentUser?.result.name)
    const [desc, setDesc] = useState(currentUser?.result.desc)
    const dispatch = useDispatch();


    const handleSubmit = () => {
        if(!name) {
            alert("Please enter name")
        } else if(!desc) {
            alert('Please enter description')
        } else {
            dispatch(updateChannelData(currentUser?.result._id, {
                name: name,
                desc: desc
            }));
            setEditCreateChannel(false);
            setTimeout(()=>{
                dispatch(login({email: currentUser?.result.email}));
            })

        }
    }
  return (
    <div className='container_CreateEditChannel'>
    <input type="submit" 
        name="text"
        value="X"
        className='ibtn_x'
        onClick={()=>setEditCreateChannel(false)}
    />
       <div className="container2_CreateEditChannel">
        <h1>
            {
                currentUser?.result.name?
                <>Edit </> : <>Create </>
            }
            your channel
        </h1>
        <input 
            type="text" 
            placeholder='Enter your channel name'
            className='ibox'
            name='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />
        <textarea 
            type="text" 
            rows={15}
            placeholder='Enter Channel Description'
            className='ibox'
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
        />
        <input type="submit" 
            value={"Submit"}
            className='ibtn'
            onClick={handleSubmit}
        />
        </div>
    </div>
  )
}

export default CreateEditChannel