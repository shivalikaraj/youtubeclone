const channelReducers = (states=[], action) => {
    switch (action.type) {
        case 'UPDATE_DATA':
            return states.map(state=>state._id === action.payload._id ? action.payload : state)
        case 'FETCH_CHANNELS':
            return action.payload;
        case 'TOGGLE_RESTRICTION':
            return states.map(channel =>
                channel._id === action.payload._id ? action.payload : channel
              );
        default:
            return states;
    }
}

export default channelReducers;