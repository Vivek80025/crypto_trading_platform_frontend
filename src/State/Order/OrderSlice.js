
import {Api} from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const payOrderPayment = createAsyncThunk("order/payOrderPayment", async ({orderRequest, jwt}, thunkAPI)=>{
  try{
    const response = await Api.post("/api/orders/pay", orderRequest, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    const order = response.data;
    console.log("order success-",order);
    return order;
  }catch(error){
    console.log("order failed-",error)
    return thunkAPI.rejectWithValue(error.response?.data) || "coin order failed";
  }
})

export const getOrderById = createAsyncThunk("order/getOrderById", async ({jwt,orderId}, thunkAPI)=>{
  try{
    const response = await Api.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    const order = response.data;
    console.log("order is -",order);
    return order;
  }catch(error){
    console.log("faild to fetch order -",error)
    return thunkAPI.rejectWithValue(error.response?.data) || "fetch order failed...";
  }
})

export const getAllUserOrder = createAsyncThunk("order/getAllUserOrder", async ({jwt, orderType, assetSymbol}, thunkAPI)=>{
  try{
    const response = await Api.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      params: {
        orderType: orderType,
        asset_symbol: assetSymbol
      }
    })

    const orders = response.data;
    console.log("user orders is -",orders);
    return orders;
  }catch(error){
    console.log("faild to fetch user orders -",error)
    return thunkAPI.rejectWithValue(error.response?.data || "fetch user orders failed...");
  }
})

const initialState = {
  loading: false,
  order: null,
  userOrders: [],
  error: null
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- payOrderPayment: Handles order creation/payment ---
      .addCase(payOrderPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payOrderPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // The newly created/paid order
      })
      .addCase(payOrderPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      // --- getOrderById: Handles fetching a single order ---
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // The fetched single order
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      // --- getAllUserOrder: Handles fetching a list of orders ---
      .addCase(getAllUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.reverse(); // The array of user orders
      })
      .addCase(getAllUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
}) 

export default orderSlice.reducer; 