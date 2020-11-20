import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* fetchHubNumber(action) {
  try{
    const hubNumberResponse = yield axios.get(`/api/hubNumber/${action.payload}`);
    yield put({type: 'SET_HUBNUMBER', payload: hubNumberResponse.data.hubNumber});
  }catch(error){
    console.log('error in fetch', error);  
  }
}

function* addHubNumber(action) {
  try{
    yield console.log('ACTION IS', action.payload);
    yield axios.put('/api/hubnumber', action.payload)
  }catch(error) {
    console.log('error in add hubhumber', error); 
  }
}

function* hubNumberSaga() {
  yield takeEvery('FETCH_HUBNUMBER', fetchHubNumber);
  yield takeEvery('ADD_HUBNUMBER', addHubNumber);
}

export default hubNumberSaga;