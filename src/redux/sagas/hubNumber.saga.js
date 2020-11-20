import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* fetchHubNumber(action) {
  try{
    const hubNumberResponse = yield axios.get(`/api/hubNumber/${action.payload}`);
    yield put({type: 'SET_HUBNUMBER', payload: hubNumberResponse.data});
  }catch(error){
    console.log('error in fetch', error);  
  }
}


function* hubNumberSaga() {
  yield takeEvery('FETCH_HUBNUMBER', fetchHubNumber);
}

export default hubNumberSaga;