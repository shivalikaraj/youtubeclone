import React, {useEffect, useState} from 'react'
import './Navbar.css'
import logo from './logo.png'
import SearchBar from './SearchBar/SearchBar'
import {RiVideoAddLine} from 'react-icons/ri'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {BiUserCircle} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import {gapi} from 'gapi-script'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../../actions/auth'
import Auth from '../../Pages/Auth/Auth'
import { FaLessThanEqual } from 'react-icons/fa'
 

function Navbar({toggleDrawer, setEditCreateChannel, setLogin}) {

  const [authBtn, setAuthBtn] = useState(false)
  // const currentUser = null;
    // const currentUser = {
    //   result: {
    //     email: "abzxy50312@gmail.com",
    //     joinedOn: "2222-07-15T09:57:23.489Z",
    //   },
    // };


    const currentUser=useSelector(state=>state.currentUserReducer)
    // console.log(currentUser)
    
    useEffect(() => {
      if(currentUser) {
        setLogin(false)
      }
    }, [currentUser, setLogin])
    

  return (
    <>
      <div className='Container_Navbar'>
        <div className='Burger_Logo_Navbar'>
            <div className="burger" onClick={()=>toggleDrawer()}>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <Link to={'/'} className='logo_div_Navbar'>
                <img src={logo} alt="" />
                <p className='logo_title_navbar'>YouTube</p>
            </Link>
        </div>
        <div className="SearchBar">
          <SearchBar  />
        </div>
        <RiVideoAddLine size = {22} className="vid_bell_Navbar" />
        <div className="apps_Box">
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
        </div>
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar"/>
        <div className="Auth_cont_Navbar">
        {
          currentUser ? 
          
          (
              <>
                <div className="Channel_logo_App" onClick={()=>{
                  setAuthBtn(true) 
                }}>
                  <p className="fstChar_logo_App">
                    {
                      currentUser?.result.name ? (
                        <>
                          {currentUser?.result.name.charAt(0).toUpperCase()}
                        </>
                      ) : (
                        <>  
                          {currentUser?.result.email.charAt(0).toUpperCase()}
                        </>)
                    }
                  </p>
                </div>
              </>
            ) : (
              <>
              <div className='Auth_Btn' onClick={()=>setLogin(true)}>
                <BiUserCircle size={22}/>
                <strong>Sign in</strong>
              </div>
              </>
            )
        }
        </div>
    </div>
    {
      authBtn &&
      <Auth 
        User = {currentUser}
        setAuthBtn={setAuthBtn}
        setEditCreateChannel={setEditCreateChannel}
      />
    }
    </>
    
  )
}

export default Navbar