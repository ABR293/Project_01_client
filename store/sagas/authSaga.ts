import { call, put } from 'redux-saga/effects'
import actionCreators from '../actionCreators'
import Api from '../../api';
import * as Eff from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import { UserDataType } from '../slicers/authSlicer';
import { store } from '..';
import { AxiosError } from 'axios';

const takeEvery: any = Eff.takeEvery;    
const takeLatest: any = Eff.takeLatest; 

function* workerRegistration(action:PayloadAction<FormData>) {
   try {
      yield put(actionCreators.setLoading(true))
      const token: string = yield call(() => Api.registration(action.payload))
      console.log('t', token)
      localStorage.setItem('accessToken', token)
      yield put(actionCreators.setUserData(jwt_decode(token) as UserDataType))
   } catch (err) {
      yield put(actionCreators.setError(submitError(err)))
   }
}

function* workerLogin(action:PayloadAction<FormData>) {
   try {
      yield put(actionCreators.setLoading(true))
      const accessToken:string = yield call(() => Api.login(action.payload));
      localStorage.setItem('accessToken', accessToken)
      yield put(actionCreators.setUserData(jwt_decode(accessToken) as UserDataType))
   } catch (err) {
      yield put(actionCreators.setError(submitError(err)))
      
   }
}
 
function* workerLogout() {
   try {
      const {userId} = store.getState().auth
      console.log(1)
      yield call(() => Api.logout(userId));
      localStorage.removeItem('accessToken')
      yield put(actionCreators.logoutUser())
   } catch (err) {
      console.log(err); 
   }
}

export default function* authSaga() {
   yield takeLatest('loginUser', workerLogin)
   yield takeLatest('registrationUser', workerRegistration)
   yield takeLatest('logout', workerLogout)
}

const submitError = (err:any):string => {
   if (err instanceof AxiosError) {
      const message:string = err?.response?.data?.message
      return message
   } else {
      console.log(err)
      return ''
   }
}