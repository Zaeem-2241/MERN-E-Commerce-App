import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

//get user from local storage
const userInfo_localStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData,
      );
      res.data;
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
      );
      if (res.data) {
        console.log(res.data);
        
        return res.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration fail",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInfo_localStorage,
    isLoading: false,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      toast.success("logout successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;

        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

        // toast.error(action.payload);
      })
      .addCase(registerUser.pending, (state)=> {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;       

      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
