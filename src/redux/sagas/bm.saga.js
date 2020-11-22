import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

//sends axios request with email of searched user
function* fetchBm(action) {
  try{
    const bmResponse = yield axios.get(`/api/bm/${action.payload.searchEmail}`)
    yield put({type: 'SET_BM', payload: bmResponse.data});
  }catch(error){
    console.log('error in fetch bm', error);
  }
}
//receives id of BM being added and sends axios post request
function* addBm(action) {
  try{
    yield axios.post('/api/bm', action.payload)
  }catch(error){
    console.log('error in add bm', error);
  }
}


function* bmSaga() {
  yield takeEvery('FETCH_BM', fetchBm);
  yield takeEvery('ADD_BM', addBm);
}

export default bmSaga;