import axios from "axios";

export const baseURL = 'http://localhost:4000/';
const _axios = axios.create({baseURL});

class Api {
    static getTracks = async () => await _axios.get('tracks')
}

export default Api;
