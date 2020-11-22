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
    yield put({type:'FETCH_MY_BMS'})
  }catch(error){
    console.log('error in add bm', error);
  }
}
//sends axios request to retrieve all bms for the logged in user
function* fetchMyBms(){
  try{
    const myBmsResponse = yield axios.get(`/api/bm`)
    yield console.log('fetching!!!!!', myBmsResponse);
    yield put({type: 'SET_MY_BMS', payload: myBmsResponse.data});
  }catch(error) {
    console.log('error in fetch my bms', error);
  }
}


function* bmSaga() {
  yield takeEvery('FETCH_BM', fetchBm);
  yield takeEvery('ADD_BM', addBm);
  yield takeEvery('FETCH_MY_BMS', fetchMyBms);
}

export default bmSaga;