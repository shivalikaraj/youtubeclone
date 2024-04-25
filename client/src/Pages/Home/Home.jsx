import React from 'react'
import './Home.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid'
// import vid from '../../Components/Video/vid.mp4'
import {useSelector} from 'react-redux';

function Home() {

  const vids = useSelector(state=>state.videoReducer)?.data?.filter(q=>q).reverse();
  // console.log(videoFiles)

  const NavList=[
    "All",
    "Trending",
    "Music",
    "Live",
    "Food",
    "Snacks",
    "Mixes",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy",
    "Recently uploaded",
    "Posts",
    "New to you",
  ]

  return (
    <div className='container_Pages_App'>
        <LeftSidebar />
        <div className="container2_Pages_App">
          <div className="navigation_Home">
            {
              NavList.map((m)=>{
                return (
                  <p key={m} className="btn_nav_home">
                    {m}
                  </p>
              )})
            }
          </div>
            <ShowVideoGrid vids={vids}/>
        </div>
    </div>
  )
}

export default Home