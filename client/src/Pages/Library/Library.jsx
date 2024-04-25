import React from 'react'
import './Library.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import vid from '../../Components/Video/vid.mp4'
import { FaHistory } from 'react-icons/fa'
import { MdOutlineWatchLater } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
import WHLVideoList from '../../Components/WHL/WHLVideoList'
import { useSelector } from 'react-redux'


function Library() {
  
  const currentUser = useSelector(state=>state.currentUserReducer)
  const watchLater = useSelector(state=>state.watchLaterReducer)
  const likedVideo = useSelector(state=>state.likedVideoReducer)
  const history = useSelector(state=>state.historyReducer)

  // const vids = [
  //   {
  //     _id: 1,
  //     video_src: vid,
  //     Chanel: "62bafe6752cea35a6c30685f",
  //     title: "video 1",
  //     Uploder: "abc",
  //     description: "description of  video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: vid,
  //     Chanel: "cdd",
  //     title: "video 2",
  //     Uploder: "abc",
  //     description: "description of  video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: vid,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  //   {
  //     _id: 4,
  //     video_src: vid,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  //];
  
  return (
    <div className='container_Pages_App'>
        <LeftSidebar />
        <div className="container2_Pages_App">
          <div className="container_libraryPage">
            
              <h1 className="title_container_LibraryPage">
                <b>
                  <FaHistory/>
                </b>
                <b>History</b>
              </h1>
              <div className="container_videoList_LibraryPage">
                <WHLVideoList 
                  page={"History"}
                  videoList={history}
                  currentUser={currentUser?.result._id}
                />
              </div>
            
          </div>
          <div className="container_libraryPage">
            
              <h1 className="title_container_LibraryPage">
                <b>
                  <MdOutlineWatchLater/>
                </b>
                <b>Watch Later</b>
              </h1>
              <div className="container_videoList_LibraryPage">
                <WHLVideoList 
                  page={"Watch Later"}
                  videoList={watchLater}
                  currentUser={currentUser?.result._id}
                />
              </div>
            
          </div>
          <div className="container_libraryPage">
            
              <h1 className="title_container_LibraryPage">
                <b>
                  <AiOutlineLike/>
                </b>
                <b>Liked Videos</b>
              </h1>
              <div className="container_videoList_LibraryPage">
                <WHLVideoList 
                  page={"Liked Videos"}
                  videoList={likedVideo}
                  currentUser={currentUser?.result._id}
                />
              </div>
            
          </div>
        </div>
    </div>
  )
}

export default Library   