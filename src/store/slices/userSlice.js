import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: "",
  },
  reducers: {
    clearUser: (state) => {
      state.userId = "";
      state.username = "";
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.sub;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
