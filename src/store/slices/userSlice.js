import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../../api/user.controller";

export const userLogin = createAsyncThunk(
  "user/login",
  async (loginCred, { rejectWithValue }) => {
    try {
      const response = await signIn(loginCred.username, loginCred.email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: "",
    loading: false,
    error: null,
    isLogin: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = action.payload?.status === 200 ? true : false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
