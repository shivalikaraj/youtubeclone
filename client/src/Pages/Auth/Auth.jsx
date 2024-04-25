import React from 'react'
import './Auth.css'
import { GoogleLogout } from '@matheusluizn/react-google-login'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch} from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import { Link } from 'react-router-dom'

function Auth({User, setAuthBtn, setEditCreateChannel}) {

    const dispatch = useDispatch()
    const onLogoutSuccess = ()=> {
        dispatch(setCurrentUser(null))
        alert("Logout Successfully!")
    }
  return (
    <div className='Auth_container' onClick={()=>setAuthBtn(false)}>
        <div className="Auth_container2">
            <div className="User_Details">
                <div className="Channel_logo_App">
                    <p className="fstChar_logo_App">
                        {User?.result.name? (
                            <>{User?.result.name.charAt(0).toUpperCase()}</>
                        ) : (
                            <>{User?.result.email.charAt(0).toUpperCase()}</>
                        )        
                        }
                    </p>
                </div>
                <div className="email_Auth">{User?.result.email}</div>
            </div>
            <div className="btns_Auth">
            {
                User?.result.name ? 
                <>
                {
                    <Link to={`/channel/${User?.result._id}`} className='btn_auth'>
                        Your Channel
                    </Link>
                }
                </> : <>
                    <input 
                        type="submit" 
                        className='btn_auth' 
                        value="Create Your Channel" 
                        onClick={()=>setEditCreateChannel(true)}
                    />
                </>
            }
            
            <div>
                <GoogleLogout 
                    clientId={'165818571970-4pcfcc6demmopoob1f5a94bubqabngl6.apps.googleusercontent.com'}
                    onLogoutSuccess={onLogoutSuccess}
                    render={(renderProps)=>(
                        <div onClick={renderProps.onClick} className='btn_Auth'>
                            <BiLogOut />
                            Log Out
                        </div>
                    )}
                />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Auth