import { Api } from "@/config/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// First, create the thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await Api.post("/auth/signup", userData);
      const res = response.data;
      console.log("signup--", res);
      return res;
    } catch (error) {
      console.log("error------", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "registration faild..."
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await Api.post("/auth/signing", userData);
      const res = response.data;
      console.log("login--", res);
      return res;
    } catch (error) {
      console.log("error------", error);
      return thunkAPI.rejectWithValue(error.response?.data || "login faild...");
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (jwt, thunkAPI) => {
    try {
      const response = await Api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const user = response.data;
      console.log("user---", user);
      return user;
    } catch (error) {
      console.log("error--", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "User fetch faild..."
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await Api.post(
        "/auth/verify-otp",
        {},
        {
          params: {
            otp,
            email,
          },
        }
      );
      const res = response.data;
      console.log("verify otp --", res);
      return res;
    } catch (error) {
      console.log("error------", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "verify otp failed..."
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await Api.post(
        "/auth/forgot-password",
        {},
        {
          params: {
            email,
          },
        }
      );
      const res = response.data;
      console.log("forgot password --", res);
      return res;
    } catch (error) {
      console.log("error------", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "forgot password failed..."
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      const response = await Api.post(
        "/auth/reset-password",
        null,
        {
          params: {
            email,
            otp,
            newPassword,
          },
        }
      );
      const res = response.data;
      console.log("reset password --", res);
      return res;
    } catch (error) {
      console.log("error------", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "reset password failed..."
      );
    }
  }
);

export const resendOtp = createAsyncThunk("auth/resendOtp",
  async (email, thunkAPI)=>{
    try{
      const response = await Api.post("/auth/resend-otp", null, {
        params:{
          email
        }
      });
      const res = response.data;
      return res;
    }catch(error){
      return thunkAPI.rejectWithValue("resend otp failed...")
    }
  }
);

const initialState = {
  email: null,
  user: null,
  loading: false,
  jwt: localStorage.getItem("jwt") || null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // <-- ADD THIS LOGOUT REDUCER
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.error = null;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.meta.arg.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.meta.arg.email;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        localStorage.setItem("jwt", action.payload.jwt);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.meta.arg;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendOtp.pending,(state)=>{
        state.loading = true
      })
      .addCase(resendOtp.fulfilled,(state)=>{
        state.loading = false;
      })
      .addCase(resendOtp.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// <-- EXPORT THE NEW ACTION
export const { logout } = authSlice.actions;

export default authSlice.reducer;
