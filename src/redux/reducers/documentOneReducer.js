const documentOneReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_UPDATE_DOCUMENT_ONE':
            if (action.payload.length) {
                return action.payload[0]
            }
            return state
        default:
            return state;
    }
};


export default documentOneReducer