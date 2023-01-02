import { call, put } from 'redux-saga/effects'
import actionCreators from '../actionCreators'
import Api, { AuthData } from '../../api';
import * as Eff from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
const takeEvery: any = Eff.takeEvery;    
const takeLatest: any = Eff.takeLatest; 
import jwt_decode from "jwt-decode";
import { UserDataType } from '../slicers/authSlicer';
import { store } from '..';
import { ConstructionOutlined } from '@mui/icons-material';

function* workerRegistration(action:PayloadAction<FormData>) {
   try {
      yield put(actionCreators.setLoading(true))
      const token: string = yield call(() => Api.registration(action.payload))
      console.log('t', token)
      localStorage.setItem('accessToken', token)
      yield put(actionCreators.setUserData(jwt_decode(token) as UserDataType))
   } catch (err) {
      console.log(3)
      if(err?.response?.data){
         const message:string = err?.response?.data?.message
         yield put(actionCreators.setError(message))
      }
   }
}

function* workerLogin(action:PayloadAction<AuthData>) {
   try {
      yield put(actionCreators.setLoading(true))
      const accessToken:string = yield call(() => Api.login(action.payload));
      localStorage.setItem('accessToken', accessToken)
      yield put(actionCreators.setUserData(jwt_decode(accessToken) as UserDataType))
   } catch (err) {
      if(err?.response?.data){
         const message:string = err?.response?.data?.message
         yield put(actionCreators.setError(message))
      }
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
function* workerPasswordFogot(action:PayloadAction<string>) {
   try {
      yield call(() => Api.fogotPassword(action.payload));
   } catch (err) {
      if(err?.response?.data){
         const message:string = err?.response?.data?.message
         yield put(actionCreators.setError(message))
      }
   }
}

export default function* authSaga() {
   yield takeLatest('loginUser', workerLogin)
   yield takeLatest('registrationUser', workerRegistration)
   yield takeLatest('logout', workerLogout)
   yield takeLatest('fogotPassword', workerPasswordFogot)
}