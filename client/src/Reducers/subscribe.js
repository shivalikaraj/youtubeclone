const subscribeReducer = (state={data: null}, action) => {
    switch(action.type) {
        case 'SUBSCRIBE':
            return {...state, data: action?.data}
        case 'FETCH_SUBSCRIPTION_STATUS':
            return {...state, isSubscribed: action.payload.data.isSubscribed}
        default:
            return state;
    }
}

export default subscribeReducer