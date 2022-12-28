import { ITrack } from "../../types/tracks"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useRouter } from "next/router"


const initialState = {
    userId: null as string | null,
    login: null as string | null,
    isAuth: false,
    isActivated: false,
    error: '',
}

export type PlayerState = typeof initialState

const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserDataType>){
            const {_id, login, isActivated, } = action.payload 
            state.userId = _id
            state.login = login
            state.isActivated = isActivated
            state.isAuth = true
        },
        logoutUser(state){
            state.userId = null
            state.login = null
            state.isActivated = false
            state.isAuth = false
        },
        setError(state, action: PayloadAction<string> ){
            state.error = action.payload 
        },
    
    }
})

export type UserDataType = {
    _id:string,
    login: string,
    isActivated: boolean,  
}

export const authActions = authSlicer.actions
export default authSlicer.reducer

