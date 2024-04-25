import React from 'react'
import Home from '../Pages/Home/Home'
import { 
    Routes,
    Route,
 } from 'react-router-dom'
import Library from '../Pages/Library/Library'
import YourVideos from '../Pages/YourVideos/YourVideos'
import WatchHistory from '../Pages/WatchHistory/WatchHistory'
import WatchLater from '../Pages/WatchLater/WatchLater'
import LikedVideo from '../Pages/LikedVideo/LikedVideo'
import VideoPage from '../Pages/VideoPage/VideoPage'
import Channel from '../Pages/Channel/Channel'
import Search from '../Pages/Search/Search'

function AllRoutes({setEditCreateChannel, setVidUploadPage}) {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/history" element={<WatchHistory />}/>
        <Route path="/watchlater" element={<WatchLater />}/>
        <Route path="/likedvideo" element={<LikedVideo />}/>
        <Route path="/yourvideos" element={<YourVideos />}/>
        <Route path="/videopage/:vid" element={<VideoPage />}/>
        <Route path="/channel/:Cid" element={<Channel setEditCreateChannel={setEditCreateChannel} setVidUploadPage={setVidUploadPage}/>}/>
        <Route path="/search/:searchQuery" element={<Search />} />
    </Routes>
  )
}

export default AllRoutes