import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

//TODO debug undefined error

function* addUserTolerance(action) {
  try {
    yield axios.put('/api/tolerance', action.payload);  
  }catch(error) {
    console.log('error in post tolerance');  
  }
}

function* fetchTolerance(action) {
  try{
    const toleranceResponse = yield axios.get(`/api/tolerance/${action.payload}`)
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