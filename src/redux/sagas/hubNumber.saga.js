import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* fetchRawHubNumber(action) {
  try{
    const hubNumberResponse = yield axios.get(`/api/hubNumber/${action.payload}`);
    yield console.log('hubNumberSaga', hubNumberResponse.data.hubNumber);
    yield put({type: 'SET_HUBNUMBER', payload: hubNumberResponse.data.hubNumber});
  }catch(error){
    console.log('error in fetch', error);  
  }
}


function* hubNumberSaga() {
  yield takeEvery('FETCH_RAW_HUBNUMBER', fetchRawHubNumber);
}

export default hubNumberSaga;