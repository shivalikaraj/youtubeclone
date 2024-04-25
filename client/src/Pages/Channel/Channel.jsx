import React from 'react'
import LeftSideBar from '../../Components/LeftSidebar/LeftSidebar'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid'
// import vid from '../../Components/Video/vid.mp4'
import DescribeChannel from './DescribeChannel';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Channel({setEditCreateChannel, setVidUploadPage}) {

  const Cid = useParams();
  const vids = useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videoChannel === Cid.Cid).reverse();
  
  return (
    <div className="container_Pages_App">
        <LeftSideBar />
        <div className="container2_Pages_App">
            <DescribeChannel Cid={Cid.Cid} setEditCreateChannel={setEditCreateChannel} setVidUploadPage={setVidUploadPage}/>
            <ShowVideoGrid vids={vids}/>
        </div>
    </div>
  )
}

export default Channel
