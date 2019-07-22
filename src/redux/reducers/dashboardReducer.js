const dashboardReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_APIS_TRIPS':
            return action.payload;
            default:
                return state;
    }
};

export default dashboardReducer;