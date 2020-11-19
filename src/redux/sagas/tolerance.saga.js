import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

function* addUserTolerance(action) {
  try {
    yield axios.put('/api/tolerance', action.payload);
  }catch(error) {
    console.log('error in post tolerance');  
  }
}

function* fetchTolerance() {
  try{
    const toleranceResponse = yield axios.get(`/api/tolerance/9`)
    yield console.log('SAGA', toleranceResponse.data);
    yield put({type:'SET_USER_TOLERANCE', payload: toleranceResponse.data});
  }catch(error){
    console.log('error in fetch', error);
  }
}

function* toleranceSaga() {
  yield takeEvery('ADD_USER_TOLERANCE', addUserTolerance)
  yield takeEvery('FETCH_USER_TOLERANCE', fetchTolerance)
}
export default toleranceSaga;