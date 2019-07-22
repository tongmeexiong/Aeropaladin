const operatorReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_UPDATE_OPERATOR':
            return action.payload[0];
        default:
            return state;
    }
};


export default operatorReducer;
