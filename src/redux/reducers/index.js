import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import passengerReducer from '../reducers/passengerReducer';
import dashboardReducer from './dashboardReducer';
import crewReducer from './crewReducer';
import reviewReducer from './reviewReducer';
import aircraftReducer from './aircraftReducer';
import apisReducer from './apisReducer.js';
import operatorReducer from './operatorReducer'
import ownerReducer from './ownerReducer'
import documentOneReducer from './documentOneReducer'
import documentTwoReducer from './documentTwoReducer'
import emergencyContactReducer from './emergencyContactReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  passengerReducer,
  dashboardReducer,
  crewReducer,
  reviewReducer,
  aircraftReducer,
  apisReducer,
  operatorReducer,
  ownerReducer,
  documentOneReducer,
  documentTwoReducer,
  emergencyContactReducer
});

export default rootReducer;
