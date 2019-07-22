const emergencyContactReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_UPDATE_CREW_EMERGENCY_CONTACT':
            if (action.payload.length) {
                return action.payload[0]
            }
            return state
        default:
            return state;
    }
};


export default emergencyContactReducer