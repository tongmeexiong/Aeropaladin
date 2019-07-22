import {combineReducers} from 'redux'


 const crew = (state = {}, action) => {
     switch (action.type) {
         case 'SET_APIS_CREW':
         return action.payload;             
         default:
             return state;
     }
 }

 const aircraft = (state = {}, action) => {
     switch (action.type) {
         case 'SET_APIS_AIRCRAFT':
             return action.payload;             
         default:
             return state;
     }
 }

 const passenger = (state = [], action) => {
    switch (action.type) {
        case 'SET_APIS_PASSENGER':
            return action.payload;            
        default:
            return state;
    }
}

const flightSegmentOne = (state = {}, action) => {
    switch (action.type) {
        case 'SET_APIS_FLIGHT_SEGMENT_ONE':
            return action.payload
        default:
            return state;
    }
}

const flightSegmentTwo = (state = {}, action) => {
    switch (action.type) {
        case 'SET_APIS_FLIGHT_SEGMENT_TWO':
            return action.payload;
    
        default:
            return state;
    }
}

const apisReducer = combineReducers({
    crew,
    aircraft,
    passenger,
    flightSegmentOne,
    flightSegmentTwo,

})

export default apisReducer;