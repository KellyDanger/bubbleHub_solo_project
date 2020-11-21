import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* fetchBm(action) {
  try{
    yield console.log('BMEMAIL IS', action.payload.searchEmail);
    const bmResponse = yield axios.get(`/api/bm/${action.payload.searchEmail}`)
    yield put({type: 'SET_BM', payload: bmResponse.data});
  }catch(error){
    console.log('error in fetch bm', error);
  
  }
}


function* bmSaga() {
  yield takeEvery('FETCH_BM', fetchBm)
}

export default bmSaga;