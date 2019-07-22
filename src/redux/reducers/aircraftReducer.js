const aircraftReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AIRCRAFT':
            return action.payload;
        case 'SET_UPDATE_AIRCRAFT':
            return action.payload[0];
        default:
            return state;
    }
};


export default aircraftReducer;
