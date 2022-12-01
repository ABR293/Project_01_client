import axios from 'axios'
export const baseURL = 'http://localhost:4000/';
const _axios = axios.create({baseURL});

class Api {
    static getAllTracks = async () => (
        await _axios.get('tracks').then(res =>res.data)
    )
    static searchTracks = async (query:string) => (
        await _axios.get(`tracks/search?query=`+query).then(res =>res.data)
    )

    static getTrack = async (id:any) => 
        await _axios.get('tracks/'+(id+''))

    static createTrack = async (formData:FormData) => 
        await _axios.post('tracks', formData)

    static addComment = async (data: any) => 
        await _axios.post('tracks/comment', data)

    
}

export default Api;
