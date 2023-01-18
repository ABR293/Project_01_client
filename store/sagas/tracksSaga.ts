import { call, put } from "redux-saga/effects";
import actionCreators from "../actionCreators";
import { ITrack } from "../../types/tracks";
import Api from "../../api";
import * as Eff from "redux-saga/effects";
import { SagaAcceptor } from "./index";

export const fetchTracksError = "Произошла ошибка при загрузке треков";
export function* workerFetchTracs({ payload = "" }) {
  try {
    let data: ITrack[] = [];
    if (payload !== "") {
      data = yield call(Api.searchTracks, payload);
    } else {
      data = yield call(Api.getAllTracks);
    }
    yield put(actionCreators.fetchTracksSuccess(data));
  } catch (err) {
    yield put(actionCreators.fetchTracksError(fetchTracksError));
  }
}

const takeLatest: SagaAcceptor = Eff.takeLatest;

export function* tracksSaga() {
  yield takeLatest("GET_TRACKS", workerFetchTracs);
}
