import { ITrack } from "../types/tracks"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    counter: 0,
    loading: false,
    error: '',
    tracks: [] as ITrack[],
}
export type tracksState = typeof initialState

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        fetchTracks(state){
          state.loading = true
          state.counter ++
        },
        fetchTracksSuccess(state, action: PayloadAction<ITrack[]> ){
          state.loading = false
          state.tracks = action.payload 
        },
        fetchTracksError(state, action: PayloadAction<string> ){
          state.loading = false
          state.error = action.payload 
        },
    }
})

export const trackActions = trackSlice.actions
export default trackSlice.reducer