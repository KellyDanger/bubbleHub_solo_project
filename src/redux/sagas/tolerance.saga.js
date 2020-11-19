import axios from 'axios';
import {takeEvery} from 'redux-saga/effects';

function* addUserTolerance(action) {
  try {
    yield axios.put('/api/tolerance', action.payload);
  }catch(error) {
    console.log('error in post tolerance');  
  }
}

function* toleranceSaga() {
  yield takeEvery('ADD_USER_TOLERANCE', addUserTolerance)
}
export default toleranceSaga;