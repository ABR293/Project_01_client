import { all } from "redux-saga/effects";
import { tracksSaga } from "./tracksSaga";
import authSaga from "./authSaga";
import { TypeOfSagaActyonType } from "../actionCreators";

export type SagaAcceptor = (A: TypeOfSagaActyonType, G: Function) => void;

export default function* rootSaga() {
  yield all([tracksSaga(), authSaga()]);
}
