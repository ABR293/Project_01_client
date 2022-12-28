import { ITrack } from "../../types/tracks"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    query: '' as string | undefined,
    error: '',
    tracks: [] as ITrack[],
}
export type tracksState = typeof initialState

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        fetchTracksSuccess(state, action: PayloadAction<ITrack[]> ){
          state.tracks = action.payload 
        },
        fetchTracksError(state, action: PayloadAction<string> ){
          state.error = action.payload 
        },
    }
})

export const trackActions = trackSlice.actions
export default trackSlice.reducer