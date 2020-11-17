import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//send axios request to shelf.router to get all items from shelf DB
function* fetchActivities() {
  try{
    const activityResponse = yield axios.get(`/api/activities`)
    yield put({type: `SET_ACTIVITIES`, payload: activityResponse.data})
  } catch(error){
    console.log('Error in fetch activities',error);
  }
}

function* activitySaga() {
    yield takeEvery('FETCH_ACTIVITIES', fetchActivities);
  }

export default activitySaga;