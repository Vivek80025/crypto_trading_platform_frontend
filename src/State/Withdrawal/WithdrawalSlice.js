import { Api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const withdrawalRequest = createAsyncThunk(
  "withdrawal/withdrawalRequest",
  async ({ jwt, amount }, thunkAPI) => {
    try {
      const response = await Api.post(`/api/withdrawal/${amount}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const withdrawal = response.data;
      console.log("withdrawal req: ", withdrawal);
      return withdrawal;
    } catch (error) {
      console.log("withdrawal request failed-", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "withdrawal request failed..."
      );
    }
  }
);

export const proceedWithdrawal = createAsyncThunk(
  "withdrawal/proceedWithdrawal",
  async ({ jwt, id, accept }, thunkAPI) => {
    try {
      const response = await Api.patch(
        `/api/admin/withdrawal/${id}/proceed/${accept}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const withdrawal = response.data;
      console.log("proceed withdrawal-", withdrawal);
      return withdrawal;
    } catch (error) {
      console.log("faild to proceed withdrawal-", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "withdrawal proceed failed..."
      );
    }
  }
);

export const getUserWithdrawalHistory = createAsyncThunk(
  "withdrawal/getUserWithdrawalHistory",
  async (jwt, thunkAPI) => {
    try {
      const response = await Api.get("/api/withdrawal", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const withdrawalList = response.data;
      console.log("withdrawal history-", withdrawalList);
      return withdrawalList;
    } catch (error) {
      console.log("failed to fetch withdrawal history-", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "fetch withdrawal history failed..."
      );
    }
  }
);

export const getAllWithdrawalRequest = createAsyncThunk(
  "withdrawal/getAllWithdrawalRequest",
  async (jwt, thunkAPI) => {
    try {
      const response = await Api.get("/api/admin/withdrawal", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const withdrawalReqList = response.data;
      console.log("All Withdrawal req-", withdrawalReqList);
      return withdrawalReqList;
    } catch (error) {
      console.log("failed to fetch all withdrawal req-", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "fetch all withdrawal req failed..."
      );
    }
  }
);

export const addPaymentDetails = createAsyncThunk(
  "withdrawal/addPaymentDetails",
  async ({ paymentDetails, jwt }, thunkAPI) => {
    try {
      const response = await Api.post("/api/payment-details", paymentDetails, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const paymentDetailsResponse = response.data;
      console.log("add payment details response -", paymentDetailsResponse);
      return paymentDetailsResponse;
    } catch (error) {
      console.log("failed to add payment details-", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "add payment details failed..."
      );
    }
  }
);

export const getUserPaymentDetails = createAsyncThunk(
  "withdrawal/getUserPaymentDetails",
  async (jwt, thunkAPI) => {
    try {
      const response = await Api.get("/api/payment-details", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const paymentDetails = response.data;
      console.log("user payment details -", paymentDetails);
      return paymentDetails;
    } catch (error) {
      console.log("failed to fetch user payment details-", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "fetch user payment details failed..."
      );
    }
  }
);

const initialState = {
  withdrawal: null,
  withdrawalHistory: [],
  withdrawalRequests: [],
  paymentDetails: null,
  loading: false,
  error: null,
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //withdrawalRequest
      .addCase(withdrawalRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawalRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawal = action.payload;
      })
      .addCase(withdrawalRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //proceedWithdrawal (Admin action)
      .addCase(proceedWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(proceedWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific request in the list based on ID
        state.withdrawal = action.payload
      })
      .addCase(proceedWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getUserWithdrawalHistory
      .addCase(getUserWithdrawalHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWithdrawalHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawalHistory = action.payload;
      })
      .addCase(getUserWithdrawalHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getAllWithdrawalRequest (Admin action)
      .addCase(getAllWithdrawalRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWithdrawalRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawalRequests = action.payload;
      })
      .addCase(getAllWithdrawalRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //addPaymentDetails
      .addCase(addPaymentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentDetails = action.payload;
      })
      .addCase(addPaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getUserPaymentDetails
      .addCase(getUserPaymentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentDetails = action.payload;
      })
      .addCase(getUserPaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default withdrawalSlice.reducer;
