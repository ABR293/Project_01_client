import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  userId: null as string | null,
  login: null as string | null,
  isAuth: false,
  isActivated: false,
  loading: false,
  error: "",
};

export type PlayerState = typeof initialState;

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = "";
    },
    setUserData(state, action: PayloadAction<UserDataType>) {
      const { _id, login, isActivated } = action.payload;
      state.userId = _id;
      state.login = login;
      state.isActivated = isActivated;
      state.isAuth = true;
      state.loading = false;
    },
    logoutUser(state) {
      state.userId = null;
      state.login = null;
      state.isActivated = false;
      state.isAuth = false;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export type UserDataType = {
  _id: string;
  login: string;
  isActivated: boolean;
};

export const authActions = authSlicer.actions;
export default authSlicer.reducer;
