import { ITrack } from "../../types/tracks";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  tracks: [] as ITrack[],
  loading: false,
  error: "",
};
export type tracksState = typeof initialState;

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    fetchTracksSuccess(state, action: PayloadAction<ITrack[]>) {
      state.tracks = action.payload;
      state.loading = false;
    },
    fetchTracksError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const tracksActions = trackSlice.actions;
export default trackSlice.reducer;
