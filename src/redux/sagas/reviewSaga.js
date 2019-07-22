import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchReview(action) {
    try {
        const response = yield axios.get(`/api/review/${action.payload}`);
        yield put({type: 'SET_REVIEW', payload: response.data });


    } catch (error) {
        console.log('TRAVEL Page Saga GET request failed', error);
    }
}

function* reviewSaga() {
    yield takeLatest('FETCH_REVIEW', fetchReview);
}


export default reviewSaga;
