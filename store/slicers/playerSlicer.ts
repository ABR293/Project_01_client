import { ITrack } from "../../types/tracks";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  currentTime: 0 as number,
  duration: 0 as number,
  active: null as null | ITrack,
  volume: 50 as number,
  pause: true as boolean,
  isSoundOn: true as boolean,
};
export type PlayerState = typeof initialState;

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack(state) {
      state.pause = false;
    },
    pauseTarack(state) {
      state.pause = true;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    toggleSound(state, action: PayloadAction<boolean>) {
      state.isSoundOn = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setActiveTrack(state, action: PayloadAction<ITrack>) {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
