import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import activitySaga from './activity.saga';
import toleranceSaga from './tolerance.saga';
import profileSaga from './profile.saga';
import hubNumberSaga from './hubNumber.saga';
import bmSaga from './bm.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    activitySaga(),
    toleranceSaga(),
    profileSaga(),
    hubNumberSaga(),
    bmSaga(),
  ]);
}
