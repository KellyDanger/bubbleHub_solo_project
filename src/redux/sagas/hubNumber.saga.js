import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* fetchHubNumber() {
  try{
    const hubNumberResponse = yield axios.get(`/api/hubNumber`);
    yield put({type: 'SET_HUBNUMBER', payload: hubNumberResponse.data.hubNumber});
  }catch(error){
    console.log('error in fetch', error);  
  }
}

function* addHubNumber(action) {
  try{
    yield axios.put('/api/hubnumber', action.payload)
    yield put({type: 'FETCH_HUBNUMBER'})
  }catch(error) {
    console.log('error in add hubhumber', error); 
  }
}

function* hubNumberSaga() {
  yield takeEvery('FETCH_HUBNUMBER', fetchHubNumber);
  yield takeEvery('ADD_HUBNUMBER', addHubNumber);
}

export default hubNumberSaga;