const ownerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_UPDATE_OWNER':
            return action.payload[0];
        default:
            return state;
    }
};


export default ownerReducer;
