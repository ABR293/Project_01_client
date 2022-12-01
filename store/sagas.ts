import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import actionCreators from './actionCreators'
import axios, { Axios, AxiosResponse } from 'axios'
import { ITrack } from '../types/tracks';
import { ServerResponse } from 'http';
import Api from '../api';

function* workerFetchTracs({payload = ''}) {
   try {
      let data:ITrack[] = []
      if (payload !== '') {
         data = yield call(() => Api.searchTracks(payload));
      } else {
         data = yield call(() => Api.getAllTracks() );
      }
      yield put(actionCreators.fetchTracksSuccess(data));
   } catch (err) {
      yield put(actionCreators.fetchTracksError('Произошла ошибка при загрузке треков')); 
   }
}

function* tracksSaga() {
   // yield takeEvery('tracks/fetchTracks', workerFetchTracs)
   yield takeLatest('getTracks', workerFetchTracs)
}

export default  function* rootSaga() {
   yield tracksSaga()
}

