import { call, put } from "redux-saga/effects";
import actionCreators from "../actionCreators";
import Api from "../../api";
import * as Eff from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { UserDataType } from "../slicers/authSlicer";
import { store } from "..";
import { AxiosError } from "axios";
import { SagaAcceptor } from "./index";
import { Tokens } from "../../types/auth";
import { submitAxiosError } from "../../utils/errorSubmit";

export function* workerRegistration(action: PayloadAction<FormData>) {
  try {
    yield put(actionCreators.setLoading(true));
    const token: string = yield call(Api.registration, action.payload);
    localStorage.setItem(Tokens.Access, token);
    const data = jwt_decode(token) as UserDataType;
    yield put(actionCreators.setUserData(data));
  } catch (err) {
    console.log(submitAxiosError(err));
    yield put(actionCreators.setError(submitAxiosError(err)));
  }
}

export function* workerLogin(action: PayloadAction<FormData>) {
  try {
    yield put(actionCreators.setLoading(true));
    const accessToken: string = yield call(Api.login, action.payload);
    localStorage.setItem(Tokens.Access, accessToken);
    yield put(
      actionCreators.setUserData(jwt_decode(accessToken) as UserDataType)
    );
  } catch (err) {
    console.log(submitAxiosError(err));
    yield put(actionCreators.setError(submitAxiosError(err)));
  }
}

export function* workerLogout() {
  try {
    const { userId } = store.getState().auth;
    yield call(Api.logout, userId);
    localStorage.removeItem(Tokens.Access);
    yield put(actionCreators.logoutUser());
  } catch (err) {
    yield put(actionCreators.logoutUser());
    console.log(err);
  }
}
const takeLatest: SagaAcceptor = Eff.takeLatest;

export default function* authSaga() {
  yield takeLatest("LOGIN_USER", workerLogin);
  yield takeLatest("REG_USER", workerRegistration);
  yield takeLatest("LOGUOT", workerLogout);
}
