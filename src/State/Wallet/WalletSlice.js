import { Api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserWallet = createAsyncThunk("wallet/getUserWallet", async (jwt, thunkAPI) => {
  try{
    const response = await Api.get("/api/wallet",{
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    const wallet = response.data;
    console.log("user wallet----,",wallet);
    return wallet;
  }catch(error){
    console.log("get wallet error---",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "user wallet fetch faild....."
  }
})

export const getWalletTransaction = createAsyncThunk("wallet/getWalletTransaction", async (jwt, thunkAPI) => {
  try{
    const response = await Api.get("/api/wallet/transactions",{
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    const transaction = response.data;
    console.log("wallet transaction----,",transaction);
    return transaction;
  }catch(error){
    console.log("get wallet transactions error---",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "wallet transactions fetch faild....."
  }
})

export const depositMoney = createAsyncThunk("wallet/depositMoney", async ({jwt, paymentOrderId, paymentId}, thunkAPI) => {
  try{
    const response = await Api.put("/api/wallet/deposit", null, {
      headers : {
        Authorization: `Bearer ${jwt}`
      },
      params : {
        payment_order_id : paymentOrderId,
        payment_id : paymentId 
      }
    })
    const deposit = response.data;
    console.log("deposit----,",deposit);
    //navigate
    return deposit;
  }catch(error){
    console.log("deposit error---",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "deposit faild....."
  }
})

export const paymentHandler = createAsyncThunk("wallet/paymentHandler", async ({jwt, paymentMethod, amount}, thunkAPI) => {
  try{
    const response = await Api.post(`api/payment/${paymentMethod}/amount/${amount}`,
      null, 
      {
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      }
    )
    const payment = response.data;
    console.log("payment----,",payment);
    window.location.href =  payment.payment_url;
    return payment;
  }catch(error){
    console.log("payment error---",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "payment faild....."
  }
})

export const transferMoney = createAsyncThunk("wallet/transferMoney", async ({jwt, walletId, amount}, thunkAPI) => {
  try{
    const response = await Api.put(`api/wallet/transfer/${walletId}/${amount}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
    );

  const transfer = response.data;
  console.log("after transfer money wallet is : ",transfer);
  return transfer;

  }catch(error){
    console.log("money transfer error-----",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "money transfer to other wallet is failed...."; 
  }
})


const initialState = {
  userWallet: {},
  loading: false,
  error: null,
  transactions: []
}
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //get user
    .addCase(getUserWallet.pending, (state)=>{
      state.loading = true;
      state.error = null
    })
    .addCase(getUserWallet.fulfilled, (state, action)=>{
      state.loading = false;
      state.userWallet = action.payload;
    })
    .addCase(getUserWallet.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })

    // getWalletTransaction (Fetch Wallet Transactions)
    .addCase(getWalletTransaction.pending, (state)=>{
      state.loading = true;
      state.error = null
    })
    .addCase(getWalletTransaction.fulfilled, (state, action)=>{
      state.loading = false;
      state.transactions = action.payload;
    })
    .addCase(getWalletTransaction.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })

    // depositMoney (Confirm Deposit)
    .addCase(depositMoney.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(depositMoney.fulfilled, (state, action)=>{
      state.loading = false;
      state.userWallet = action.payload 
    })
    .addCase(depositMoney.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })

    // paymentHandler (Initiate Payment)
    // Note: This thunk redirects, so state updates are minimal/for tracking initiation
    .addCase(paymentHandler.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    //confusion----------------------------------------
    .addCase(paymentHandler.fulfilled, (state, action)=>{
      state.loading = false;
    })
    .addCase(paymentHandler.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload
    })

    // 📤 transferMoney (Transfer Funds)
    .addCase(transferMoney.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(transferMoney.fulfilled, (state, action)=>{
      state.loading = false;
      // The API returns the updated wallet after transfer, so update userWallet
      state.userWallet = action.payload;
    })
    .addCase(transferMoney.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload || "money transfer to other wallet is failed...."; 
    })

  }

})

export default walletSlice.reducer;

