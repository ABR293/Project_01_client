import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import actionCreators from './actionCreators'
import axios, { Axios, AxiosResponse } from 'axios'
import { ITrack } from '../types/tracks';
import { ServerResponse } from 'http';
import Api from '../api';

function* workerFetchTracs() {
   try {
      const res:ServerResponse = yield call(() => Api.getTracks() );
      const resp = res as any
      console.log('res', resp);
      const tracks = resp.data as ITrack[]
      yield put(actionCreators.fetchTracksSuccess(resp.data));
   } catch (err) {
      yield put(actionCreators.fetchTracksError('Произошла ошибка при загрузке треков')); 
   }
}

function* tracksSaga() {
   yield takeEvery('tracks/fetchTracks', workerFetchTracs)
}

export default  function* rootSaga() {
   yield tracksSaga()
}

