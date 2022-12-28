// import axios from 'axios'
// export const baseURL = 'http://localhost:4000/';
// const _api = axios.create({baseURL});

import axios, { AxiosResponse } from 'axios'
import { store } from '../store';
import { ITrack } from '../types/tracks';
export const baseURL = 'http://localhost:4000/';
const _api = axios.create({
    withCredentials: true,
    baseURL,
    headers: {  
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
});

_api.interceptors.request.use( (config) => {
    if (config && config.headers ) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    };
    return config
})

_api.interceptors.response.use( 
    config => config, 
    async err => {
    const originalRequest = err.config
    if (err.response.status == 401 && err.config && err.config._isRetry !== true){
        originalRequest._isRetry = true
        try{
            const _id = store.getState().auth.userId
            const res = await await _api.get(`auth/refresh/${_id+''}`)
            localStorage.setItem('accessToken', res.data)
            return _api.request(originalRequest)
        } catch (err) {
            console.log('user not authorize', err)
            store.dispatch('logout')
        }
       
    }
    throw err
})

class Api {

     // AUTH

    static registration = async(data: AuthData):Promise<string> => 
        await _api.post('auth/registration', data).then(res => res.data)

    static login = async(data: AuthData):Promise<string> => 
        await _api.post('auth/login', data).then(res => res.data)

    static logout = async(id:string):Promise<void> => 
        await _api.get(`auth/logout/${id}`)


    // TRACKS
    static getAllTracks = async ():Promise<ITrack[]> => (
        await _api.get('tracks').then(res =>res.data)
    )
    static searchTracks = async (query:string):Promise<ITrack[]> => (
        await _api.get(`tracks/search?query=`+query).then(res =>res.data)
    )

    static getTrack = async (id:any):Promise<AxiosResponse<ITrack>> => 
        await _api.get('tracks/'+(id+''))

    static createTrack = async (formData:FormData):Promise<AxiosResponse<any>> => 
        await _api.post('tracks', formData)

    static addComment = async (data: any):Promise<AxiosResponse<any>> => 
        await _api.post('tracks/comment', data)

    // USERS
    
    static getUser = async (id:any):Promise<AxiosResponse<any>> => 
        await _api.get('users/'+(id+''))


    static getUsers = async ():Promise<AxiosResponse<any>> => 
        await _api.get('users/')
    }

export type AuthData = {
    login: string
    password: string
}

export default Api;

