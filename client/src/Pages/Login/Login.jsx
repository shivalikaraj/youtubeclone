import { useDispatch } from 'react-redux'
import './Login.css'
import googleIcon from './google.png'
import {GoogleLogin} from '@matheusluizn/react-google-login'
import { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import { login, signin } from '../../actions/auth'

function Login({setLogin, setSignup}) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    
    useEffect(()=>{
      function start() {
        gapi.client.init({
          clientId: '165818571970-4pcfcc6demmopoob1f5a94bubqabngl6.apps.googleusercontent.com',
          scope: 'email'
        })
      }
      gapi.load("client:auth2", start)
    },[])

    const dispatch = useDispatch()

    const onSuccess=(response)=>{
      const Email = response?.profileObj.email 
      // console.log(Email)   
      dispatch(login({email: Email}))
    }

    const onFailure=(response)=>{
      console.log("Failed",response);
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      if(!email || ![password]) {
        alert("Invalid Credentials")
      } else {
        dispatch(signin({email, password}))
      }
      
    }

  return (
    <div className='login-form'>
    <input type="submit" 
        name="text"
        value="X"
        className='ibtn_x'
        onClick={()=>setLogin(false)}
    />
        <div className='login'>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>  
            <div className='form-controls'>
                <input 
                  className="form-control" 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  autoComplete='off' 
                  required 
                  onChange={(e)=>setEmail(e.target.value)} 
                  value={email}
                />
                <input 
                  className="form-control" 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  required 
                  onChange={(e)=>setPassword(e.target.value)} 
                  value={password}
                />
                <button className="login-btn" type="submit">Log In</button>
                <p className='signup'>Don't have an account? 
                <span 
                    className='signup-link' 
                    onClick={()=>{
                        setSignup(true)
                        setLogin(false)
                    }}
                >
                SignUp
                </span></p>
            </div>         
        </form>
        <div className='separator'><span>OR</span></div>
        <GoogleLogin 
                clientId={'165818571970-4pcfcc6demmopoob1f5a94bubqabngl6.apps.googleusercontent.com'}
                onSuccess={onSuccess}
                onFailure={onFailure}
                
                render={(renderProps)=>(
                    <button className='login-btn google' onClick={ renderProps.onClick }>
                        <img src={googleIcon} alt="google icon" width="15px" height="15px"/>
                        Sign in with Google
                    </button>
                )}
              />
        
        </div> 
    </div>
  )
}

export default Login
