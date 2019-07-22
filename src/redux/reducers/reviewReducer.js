const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_REVIEW':
            return action.payload[0];
        default:
            return state;
    }
};


export default reviewReducer;
