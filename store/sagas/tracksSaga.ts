import { call, put } from 'redux-saga/effects'
import actionCreators from '../actionCreators'
import { ITrack } from '../../types/tracks';
import Api from '../../api';
import * as Eff from 'redux-saga/effects'
const takeEvery: any = Eff.takeEvery;    
const takeLatest: any = Eff.takeLatest;  

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

export function* tracksSaga() {
   yield takeLatest('getTracks', workerFetchTracs)
}