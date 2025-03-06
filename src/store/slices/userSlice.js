import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.sub;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
