import { call, put } from "redux-saga/effects";
import { TypeOfSagaActyonType } from "../actionCreators";
import axios, { Axios, AxiosResponse } from "axios";
import { ITrack } from "../../types/tracks";
import { ServerResponse } from "http";
import Api from "../../api";
import * as Eff from "redux-saga/effects";
import { SagaAcceptor } from "./index";
// const takeEvery: any = Eff.takeEvery;

// action:PayloadAction<FormData>

function* workerFetchUsers({ payload = "" }) {
  // try {
  //    let data:ITrack[] = []
  //    if (payload !== '') {
  //       data = yield call(() => Api.searchUsers(payload));
  //    } else {
  //       data = yield call(() => Api.getAllUsers() );
  //    }
  //    yield put(actionCreators.fetchUsersSuccess(data));
  // } catch (err) {
  //    yield put(actionCreators.fetchUsersError('Произошла ошибка при загрузке треков'));
  // }
}
const takeLatest: SagaAcceptor = () => Eff.takeLatest;

export default function* usersSaga() {
  yield takeLatest("GET_USERS", workerFetchUsers);
}
