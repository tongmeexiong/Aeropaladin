import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config={
    headers: {'Content-type': 'application/json'},
    withCredentials: true
};

// GET request for crew member information on the crew info view.
function* fetchCrew(action) {
    try {
        const response = yield axios.get('/api/crew/', config);
        yield put({ type: 'SET_CREW', payload: response.data });
    } catch (error) {
        console.log('error in GET crew on crew info', error);
    }
}

function* addCrew(action){
    try{        
        yield axios.post('/api/crew/add', action.payload, config);
        yield put({type:'FETCH_CREW'});
    }catch(error){
        console.log('add crew request failed:', error);
    }
}

// Update crew member active status to false in database. This will remove the crew member on crew info page. 
function* deleteCrew(action) {
    try {
        yield axios.put(`/api/crew/delete/${action.payload}`);
        yield put({ type: 'FETCH_CREW' });
    } catch (error) {
        console.log('error in DELETE crew on crew info', error);
    }
}

function* updateCrew(action){
    try{
        yield axios.put('/api/crew/update', action.payload, config);
        yield put({type: 'FETCH_CREW'});
    }catch(error){
        console.log('error in update Crew request:');
    }
}

// GET request for crew member information on the update crew form view.
function* fetchUpdateCrew(action) {
    try {
        const response = yield axios.get(`/api/crew/updatecrew/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_CREW', payload: response.data });
    } catch (error) {
        console.log('error in GET crew on crew update form', error);
    }
}

// GET request for crew member emergency contact information on the update crew form view.
function* fetchUpdateCrewEmergencyContact(action) {
    try {
        const response = yield axios.get(`/api/crew/updateemergency/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_CREW_EMERGENCY_CONTACT', payload: response.data });
    } catch (error) {
        console.log('Crew Update Form GET request failed', error);
    }
}

// GET request for crew member document one information on the update crew form view.
function* fetchUpdateCrewDocumentOne(action) {
    try {
        const response = yield axios.get(`/api/crew/updatedocument1/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_ONE', payload: response.data });
    } catch (error) {
        console.log('error in GET crew document one on crew update form', error);
    }
}

// GET request for crew member document two information on the update crew form view.
function* fetchUpdateCrewDocumentTwo(action) {
    try {
        const response = yield axios.get(`/api/crew/updatedocument2/${action.payload}`, config);
        yield put({ type: 'SET_UPDATE_DOCUMENT_TWO', payload: response.data });
    } catch (error) {
        console.log('error in GET crew document two on crew update form', error);
    }
}

function* crewSaga() {
    yield takeLatest('FETCH_CREW', fetchCrew);
    yield takeLatest('ADD_CREW', addCrew);
    yield takeLatest('DELETE_CREW', deleteCrew);
    yield takeLatest('UPDATE_CREW', updateCrew);
    yield takeLatest('FETCH_UPDATE_CREW', fetchUpdateCrew);
    yield takeLatest('FETCH_UPDATE_CREW_EMERGENCY_CONTACT', fetchUpdateCrewEmergencyContact);
    yield takeLatest('FETCH_UPDATE_CREW_DOCUMENT_ONE', fetchUpdateCrewDocumentOne);
    yield takeLatest('FETCH_UPDATE_CREW_DOCUMENT_TWO', fetchUpdateCrewDocumentTwo);
}

export default crewSaga;