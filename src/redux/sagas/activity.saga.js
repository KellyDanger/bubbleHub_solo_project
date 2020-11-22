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

// receives param.id and userid as array [action id and user id]
function* deleteActivity (action) {
  try{
    // yield console.log('ACTION IS', action.payload.id);
    // sends delete request via axios with action payload to router
    yield axios.delete(`/api/activities/${action.payload.user}/${action.payload.id}`)
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