import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import actionCreators from '../actionCreators'
import axios, { Axios, AxiosResponse } from 'axios'
import { ITrack } from '../../types/tracks';
import { ServerResponse } from 'http';
import Api from '../../api';
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

