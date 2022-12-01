

import {playerActions} from './playerSlicer'
import {trackActions} from './tracksSlicer'

const actionCreators = {
    ...playerActions,
    ...trackActions,
    getTracks: (query:string) => ({type: 'getTracks', payload: query})
}

export default actionCreators