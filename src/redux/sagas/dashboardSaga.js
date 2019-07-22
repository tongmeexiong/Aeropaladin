import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

//get all the APIS Trips from the server api/dashboard/apis
function* fetchApisTrips() {
    try {
        const response = yield axios.get('api/dashboard/apis');
        yield put({ type: 'SET_APIS_TRIPS', payload:response.data});
    } catch(error) {
        console.log('GET APIS Trips failed', error)
    }
}
//delete Apis Trip 
function* deleteApisTrips(action) {
    try {        
        yield axios.put(`api/dashboard/delete/${action.payload.id}`)
        yield put({type:'FETCH_APIS_TRIPS'})
    } catch(error) {
        console.log('DELETE/ARCHIVE Apis Trip failed', error)
    }
}

function* dashboardSaga(){
    yield takeLatest('FETCH_APIS_TRIPS', fetchApisTrips);
    yield takeLatest('DELETE_APIS_TRIPS', deleteApisTrips);
    //yield takeLatest('UPDATE_APIS_TRIPS', updateApisTrips)
}


export default dashboardSaga;