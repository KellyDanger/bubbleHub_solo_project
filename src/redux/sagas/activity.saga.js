import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


// function* fetchActivities() {
//   try{
//     const activityResponse = yield axios.get(`/api/activities`)
//     yield put({type: `SET_ACTIVITIES`, payload: activityResponse.data})
//   } catch(error){
//     console.log('Error in fetch activities',error);
//   }
// }
//fetch activities for logged in user
function* fetchUserActivities(action){
  try{
    const userActivityResponse = yield axios.get(`api/activities/${action.payload}`)
    yield put({type: `SET_USER_ACTIVITIES`, payload: userActivityResponse.data})
  }catch(error){
    console.log('error in fetch user activities', error);  
  }
}

function* addUserActivity (action) {
  // url is /api/activities :id from payload
  try{
    yield axios.put('/api/activities/add', action.payload);
  } catch (error) {
    console.log('error in addUserActivity SAGA', error);  
  }
}

// receives param.id and userid as array [action id and user id]
function* deleteUserActivity (action) {
  // url is /api/activities :id from payload
  try{
    yield axios.put('/api/activities/remove', action.payload)
  } catch (error) {
    console.log('error in addUserActivity SAGA', error);  
  }
}


function* activitySaga() {
    // yield takeEvery('FETCH_ACTIVITIES', fetchActivities);
    yield takeEvery('ADD_USER_ACTIVITY', addUserActivity);
    yield takeEvery('DELETE_USER_ACTIVITY', deleteUserActivity);
    yield takeEvery('FETCH_USER_ACTIVITIES', fetchUserActivities)
  }

export default activitySaga;