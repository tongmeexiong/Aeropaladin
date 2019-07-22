import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config={
    headers: {'Content-type': 'application/json'},
    withCredentials: true
};

function* addApis(action){
    try{                
        yield axios.post('/api/apis', action.payload, config);
        yield put({type:'FETCH_APIS_FORM'});
        yield put({ type: 'FETCH_APIS_TRIPS' })

    }catch(error){
        console.log('add APIS request failed:', error);
    }
}

function* apisSaga() {
    yield takeLatest('ADD_APIS', addApis);
    
}

export default apisSaga;