import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import aircraftSaga from './aircraftSaga.js';
import passengerSaga from './passengerSaga';
import dashboardSaga from './dashboardSaga';
import crewSaga from './crewSaga';
import reviewSaga from './reviewSaga';
import apisSaga from './apisSaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    dashboardSaga(),
    aircraftSaga(),
    passengerSaga(),
    crewSaga(),
    reviewSaga(),
    apisSaga()

  ]);
}
