import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Login.css'
import { signup } from '../../actions/auth'


function Signup({setSignup, setLogin}) {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPass) {
            alert('Please fill the details properly');
        } if (password !== confirmPass) {
            alert('Passwords do not match');
        } else {
            dispatch(signup({email, password}))
            setSignup(false)
        }
        
    }

  return (
    <div className='login-form'>
    <input type="submit" 
        name="text"
        value="X"
        className='ibtn_x'
        onClick={()=>setSignup(false)}
    />
        <div className='login'>
        <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>  
            <div className='form-controls'>
        
                <input 
                    className="form-control" 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    autoComplete='off'
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    className="form-control" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    pattern='.{8,}' 
                    autoComplete='off'
                    required 
                    title='Password must be atleast 8 characters long'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input 
                    className="form-control" 
                    type="password" 
                    name="confirmPass" 
                    placeholder="Confirm Password" 
                    autoComplete='off'
                    required
                    value={confirmPass}
                    onChange={(e)=>setConfirmPass(e.target.value)}
                />
                <button className="login-btn" type="submit">Sign up</button>
                <p className='signup'>Already have an account? 
                <span 
                    className='signup-link' 
                    onClick={()=>{
                        setLogin(true)
                        setSignup(false)
                    }}
                >
                LogIn
                </span></p>
            </div>         
        </form>
        
        </div> 
    </div>
  )
}

export default Signup