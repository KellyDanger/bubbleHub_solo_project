import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* addData(action) {
  try {
    yield axios.put('/api/profile', action.payload);
  }catch(error) {
    console.log('error in addData saga', error); 
  }
}

function* profileSaga() {
  yield takeEvery('ADD_USER_DATA', addData);
}

export default profileSaga;