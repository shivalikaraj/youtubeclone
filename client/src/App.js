import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './Components/AllRoutes';
import DrawerSidebar from './Components/LeftSidebar/DrawerSidebar';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import CreateEditChannel from './Pages/Channel/CreateEditChannel';
import { useDispatch } from 'react-redux';
import { fetchAllChannel } from './actions/channelUser';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import { getAllVideo } from './actions/videoAction';
import { getAllLikedVideo } from './actions/likedVideo';
import { getAllWatchLater } from './actions/watchLater';
import { getAllHistory } from './actions/history';
import { getAllComment } from './actions/comments';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';

function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllChannel());
    dispatch(getAllVideo());
    dispatch(getAllLikedVideo());
    dispatch(getAllWatchLater());
    dispatch(getAllHistory());
    dispatch(getAllComment());
  },[dispatch])


  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none",
  })
  const toggleDrawer = () => {
    if(toggleDrawerSidebar.display==="none") {
      setToggleDrawerSidebar({
        display: "flex",
      })
    } else {
      setToggleDrawerSidebar({
        display: "none",
      })
    }
  }

  const [videoUploadPage, setVidUploadPage] = useState(false)
  const [editCreateChannel, setEditCreateChannel] = useState(false)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

  return (
    <div className="App">
      <Router>
      {
        videoUploadPage && <VideoUpload setVidUploadPage={setVidUploadPage}/>
      }
      
      {
        editCreateChannel && <CreateEditChannel setEditCreateChannel={setEditCreateChannel} />
      }
      { 
        login && <Login setLogin={setLogin} setSignup={setSignup} />
      }
      {
        signup && <Signup setSignup={setSignup} setLogin={setLogin}/>
      }
        
        <Navbar 
          setEditCreateChannel={setEditCreateChannel}
          toggleDrawer={toggleDrawer}
          setLogin={setLogin}
        />
        
          <DrawerSidebar
            toggleDrawer={toggleDrawer}
            toggleDrawerSidebar={toggleDrawerSidebar}
          />
        
        <AllRoutes setEditCreateChannel={setEditCreateChannel} setVidUploadPage={setVidUploadPage}/>
      </Router>
    </div>
  );
}

export default App;
