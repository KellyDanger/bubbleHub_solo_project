import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

//sends userinput data to the profile router in a put request
//updates gets userdata from the db and sets the user reducer (allows display of name in header)
function* addData(action) {
  try {
    yield axios.put('/api/profile', action.payload);
    yield put({type: 'FETCH_USER'})
  }catch(error) {
    console.log('error in addData saga', error); 
  }
}

function* profileSaga() {
  yield takeEvery('ADD_USER_DATA', addData);
}

export default profileSaga;