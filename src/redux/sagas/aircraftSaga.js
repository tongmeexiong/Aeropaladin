import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

function* addAircraft(action) {
    try {

        yield axios.post('/api/aircraft/add', action.payload, config);
        yield put({ type: 'FETCH_AIRCRAFT' });
    } catch (error) {
        console.log('add aircraft request failed:', error);
    }
}

// GET request for aircraft information on the aircraft info view.
function* fetchAircraft(action) {
    try {
        const response = yield axios.get('/api/aircraft/', config);
        yield put({ type: 'SET_AIRCRAFT', payload: response.data });
    } catch (error) {
        console.log('GET aircraft request failed:', error);
    }
}

// GET request for aircraft information on the update aircraft form view.
function* fetchUpdateAircraft(action) {
    try {
        const response = yield axios.get(`/api/aircraft/updateaircraft/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_AIRCRAFT', payload: response.data });
    } catch (error) {
        console.log('GET aircraft request failed in update aircraft form:', error);
    }
}

// GET request for aircraft operator information on the update aircraft form view.
function* fetchUpdateOperator(action) {
    try {
        const response = yield axios.get(`/api/aircraft/updateoperator/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_OPERATOR', payload: response.data });
    } catch (error) {
        console.log('GET aircraft operator request failed in update aircraft form:', error);
    }
}

// GET request for aircraft owner information on the update aircraft form view. 
function* fetchUpdateOwner(action) {
    try {
        const response = yield axios.get(`/api/aircraft/updateowner/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_OWNER', payload: response.data });
    } catch (error) {
        console.log('GET aircraft owner request failed in update aircraft form:', error);
    }
}

// Update aircraft active status to false in database. This will remove the aircraft on settings page. 
function* deleteAircraft(action) {
    try {
        yield axios.put(`/api/aircraft/delete/${action.payload}`, null, config);
        yield put({ type: 'FETCH_AIRCRAFT' })
    } catch (error) {
        console.log('Delete aircraft request failed:', error);
    }
}

function* updateAircraft(action) {
    try {
        yield axios.put('/api/aircraft/update', action.payload, config);
        yield put({ type: 'FETCH_AIRCRAFT' });
    } catch (error) {
        console.log("error in update Aircraft request:", error);
    }
}


function* aircraftSaga() {
    yield takeLatest('ADD_AIRCRAFT', addAircraft);
    yield takeLatest('FETCH_AIRCRAFT', fetchAircraft);
    yield takeLatest('DELETE_AIRCRAFT', deleteAircraft);
    yield takeLatest('FETCH_UPDATE_AIRCRAFT', fetchUpdateAircraft);
    yield takeLatest('FETCH_UPDATE_OPERATOR', fetchUpdateOperator);
    yield takeLatest('FETCH_UPDATE_OWNER', fetchUpdateOwner);
    yield takeLatest('UPDATE_AIRCRAFT', updateAircraft);
}

export default aircraftSaga;