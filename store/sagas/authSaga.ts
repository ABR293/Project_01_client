import { call, put } from 'redux-saga/effects'
import actionCreators from '../actionCreators'
import Api, { AuthData } from '../../api';
import * as Eff from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
const takeEvery: any = Eff.takeEvery;    
const takeLatest: any = Eff.takeLatest; 
import jwt_decode from "jwt-decode";
import { UserDataType } from '../slicers/authSlicer';

function* workerRegistration(action:PayloadAction<AuthData>) {
   try {
      const token: string = yield call(() => Api.registration(action.payload))
      localStorage.setItem('acsessToken', token)
      yield put(actionCreators.setUserData(jwt_decode(token) as UserDataType))
   } catch (err) {
      console.log(err)
      yield put(actionCreators.setError('Произошла ошибка при регистрации')); 
   }
}

function* workerLogin(action:PayloadAction<AuthData>) {
   try {
      const accessToken:string = yield call(() => Api.login(action.payload));
      localStorage.setItem('accessToken', accessToken)

      yield put(actionCreators.setUserData(jwt_decode(accessToken) as UserDataType))
   } catch (err) {
      console.log(err)
      yield put(actionCreators.setError('Произошла ошибка при авторизации')); 
   }
}
 
function* workerLogout(action:PayloadAction<string | number>) {
   try {
      yield call(() => Api.logout(action.payload+''));
      localStorage.removeItem('accessToken')
      yield put(actionCreators.logoutUser())
   } catch (err) {
      console.log(err); 
   }
}

export default function* authSaga() {
   yield takeLatest('login', workerLogin)
   yield takeLatest('registration', workerRegistration)
   yield takeLatest('loguot', workerLogout)
}