import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


//fetch all activities for logged in user
// sends axios get request with logged in userId as params
//sets the returned data to userActivityResponse
//sends SET_USER_ACTIVITES dispatch to userActivityReducer and sets the state there to the entire list of userActivities for the logged in user
function* fetchUserActivities(action){
  try{
    const userActivityResponse = yield axios.get(`api/activities/${action.payload}`)
    yield put({type: `SET_USER_ACTIVITIES`, payload: userActivityResponse.data})
  }catch(error){
    console.log('error in fetch user activities', error);  
  }
}
//hits the put /:add route with the activity id as payload
//then updates the hubnumber in the HubNumber reducer
function* addUserActivity (action) {
  try{
    yield axios.put('/api/activities/add', action.payload);
    yield put({type: 'FETCH_HUBNUMBER'});//JUST ADDED
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
    yield takeEvery('ADD_USER_ACTIVITY', addUserActivity);
    yield takeEvery('DELETE_USER_ACTIVITY', deleteUserActivity);
    yield takeEvery('FETCH_USER_ACTIVITIES', fetchUserActivities)
  }

export default activitySaga;