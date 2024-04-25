const authReducer = (state={data:null}, actions)=>{
    switch(actions.type){
        case 'AUTH':
        case 'SIGNUP':
        case 'SIGNIN':
            localStorage.setItem('Profile', JSON.stringify({...actions?.data}))
            return {...state, data: actions?.data}
        default:
            return state
    }
}

export default authReducer