

import {playerActions} from './playerSlicer'
import {trackActions} from './tracksSlicer'

const actionCreators = {
    ...playerActions,
    ...trackActions,
}

export default actionCreators