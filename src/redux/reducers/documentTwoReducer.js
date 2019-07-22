const documentTwoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_UPDATE_DOCUMENT_TWO':
            if(action.payload.length){
                return action.payload[0]
            }
            return state
        default:
            return state;
    }
};


export default documentTwoReducer