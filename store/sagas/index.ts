import { all } from 'redux-saga/effects'
import { tracksSaga } from './tracksSaga';
import usersSaga from './usersSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
   yield all([
      tracksSaga(),
      usersSaga(),
      authSaga(),
    ])
}

