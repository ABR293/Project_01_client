

import {playerActions} from './slicers/playerSlicer'
import {trackActions} from './slicers/tracksSlicer'
import {authActions} from './slicers/authSlicer'
import { AuthData } from '../api'

const actionCreators = {
    ...playerActions,
    ...trackActions,
    ...authActions,
    
    getTracks: (query:string) => ({type: 'getTracks', payload: query}),
    getUser: (id:string) => ({type: 'getUsers', payload: id}),
    login: (data: AuthData) => ({type: 'login', payload: data}),
    hello: () => ({type: 'hello'}), // test
}

export default actionCreators