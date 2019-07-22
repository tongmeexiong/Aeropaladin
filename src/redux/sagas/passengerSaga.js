import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config={
    headers: {'Content-type': 'application/json'},
    withCredentials: true
};

// GET request for passenger information on the passenger info view.
function* fetchPassenger(action) {
    try {
        const response = yield axios.get('/api/passenger/', config);        
        yield put({ type: 'SET_PASSENGER', payload: response.data });
    } catch (error) {
        console.log('error in passenger', error);
    }
}

function* addPassenger(action){
    try{
        yield axios.post('/api/passenger/add', action.payload, config);
        yield put({type:'FETCH_PASSENGER'});
    }catch(error){
        console.log('add passenger request failed:', error);
    }
}

// Update passenger active status to false in database. This will remove the passenger on passenger info page. 
function* deletePassenger(action) {
    try {
        yield axios.put(`/api/passenger/delete/${action.payload}`, config);
        yield put({ type: 'FETCH_PASSENGER' });
    } catch (error) {
        console.log('error in delete', error);
    }
}

function* updatePassenger(action) {
    try{
        yield axios.put('/api/passenger/update', action.payload, config);
        yield put({type: 'FETCH_PASSENGER'});
    }catch(error) {
        console.log('error in update passenger request:', error);
    }
}

// GET request for passenger information on the passenger update form view.
function* fetchUpdatePassenger(action) {
    try {
        const response = yield axios.get(`/api/passenger/updatepassenger/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_PASSENGER', payload: response.data });

    } catch (error) {
        console.log('Passenger Update Form GET request failed', error);
    }
}

// GET request for passenger document one information on the passenger update form view.
function* fetchUpdatePassengerDocumentOne(action) {
    try {        
        const response = yield axios.get(`/api/passenger/updatedocument1/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_ONE', payload: response.data });
    } catch (error) {
        console.log('Passenger Update Form GET document one request failed', error);
    }
}

// GET request for passenger document two information on the passenger update form view.
function* fetchUpdatePassengerDocumentTwo(action) {
    try {        
        const response = yield axios.get(`/api/passenger/updatedocument2/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_TWO', payload: response.data });
    } catch (error) {
        console.log('Passenger Update Form GET document two request failed', error);
    }
}

function* passengerSaga() {
    yield takeLatest('FETCH_PASSENGER', fetchPassenger);
    yield takeLatest('ADD_PASSENGER', addPassenger);
    yield takeLatest('DELETE_PASSENGER', deletePassenger);
    yield takeLatest('FETCH_UPDATE_PASSENGER', fetchUpdatePassenger);
    yield takeLatest('FETCH_UPDATE_PASSENGER_DOCUMENT_ONE', fetchUpdatePassengerDocumentOne);
    yield takeLatest('FETCH_UPDATE_PASSENGER_DOCUMENT_TWO', fetchUpdatePassengerDocumentTwo);
    yield takeLatest('UPDATE_PASSENGER', updatePassenger);
}

export default passengerSaga;