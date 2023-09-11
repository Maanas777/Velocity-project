import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string;
}

const initialState: UserState = {
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    signup: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectUser = (state:any) => state.users.user;


export default userSlice.reducer;
