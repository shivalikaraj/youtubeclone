import * as api from '../api'
import { setCurrentUser } from './currentUser'


export const signup = (authData) => async (dispatch) => {
    try {
        const {data} = await api.signup(authData)
        dispatch({type: "SIGNUP", data})
        localStorage.setItem('Profile', JSON.stringify(data)); 
        dispatch(setCurrentUser(data));
    } catch (error) {
        alert(error)
    }
}

export const signin = (authData) => async (dispatch) => {
    try {
        const {data} = await api.signin(authData)
        dispatch({type: "SIGNIN", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert(error.response.data.message);
        } else {
            alert("An error occurred. Please try again later.");
        }
    }
}

export const login = (authData) => async(dispatch)=>{
    try {
        const {data} = await api.login(authData)
        dispatch({type: "AUTH", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        alert(error)
    }
}
