import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';


//sends user's tolerance number and id to the tolerance router then fires off FETCH request 
function* addUserTolerance(action) {
  try {
    yield axios.put('/api/tolerance', action.payload); 
    yield put({type: 'FETCH_USER_TOLERANCE'}) 
  }catch(error) {
    console.log('error in post tolerance');  
  }
}

//requests user's tolerance number from DB and sets it to the tolerance reducer
function* fetchTolerance() {
  try{
    const toleranceResponse = yield axios.get(`/api/tolerance`)
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