

import {playerActions} from './slicers/playerSlicer'
import {trackActions} from './slicers/tracksSlicer'
import {authActions} from './slicers/authSlicer'

const actionCreators = {
    ...playerActions,
    ...trackActions,
    ...authActions,
    
    getTracks: (query:string) => ({type: 'getTracks', payload: query}),
    getUser: (id:string) => ({type: 'getUsers', payload: id}),
    loginUser: (data: FormData) => ({type: 'loginUser', payload: data}),
    registrationUser: (data: FormData) => ({type: 'registrationUser', payload: data}),
    fogotPassport : (data: FormData) => ({type: 'fogotPassport', payload: data}),
    hello: () => ({type: 'hello'}), // test
    logout: () => ({type: 'logout'}),
}

export default actionCreators