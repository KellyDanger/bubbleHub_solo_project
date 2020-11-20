import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchActivities() {
  try{
    const activityResponse = yield axios.get(`/api/activities`)
    yield put({type: `SET_ACTIVITIES`, payload: activityResponse.data})
  } catch(error){
    console.log('Error in fetch activities',error);
  }
}
function* addUserActivity (action) {
  // url is /api/activities :id from payload
  try{
    yield axios.post('/api/activities', action.payload)
  } catch (error) {
    console.log('error in addUserActivity SAGA', error);  
  }
}
function* deleteActivity (action) {
  try{
    yield console.log('ACTION IS', action.payload[0]);

    yield axios.delete(`/api/activities/${action.payload[1]}`, action.payload[0])
  } catch(error) {
    console.log('error in deleteActivity', error);
  }
}


function* activitySaga() {
    yield takeEvery('FETCH_ACTIVITIES', fetchActivities);
    yield takeEvery('ADD_USER_ACTIVITY', addUserActivity);
    yield takeEvery('DELETE_ACTIVITY', deleteActivity);
  }

export default activitySaga;