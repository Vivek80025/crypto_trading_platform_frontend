
import { Api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAssetById = createAsyncThunk("asset/getAssetById", async (assetId, thunkAPI)=>{
  try{
    const response = await Api.get(`/api/asset/${assetId}`);
    const asset = response.data;
    console.log("asset is-",asset)
    return asset
  }catch(error){
    console.log("faild to fetch asset-",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "fetch asset failed..."
  }
})

export const getAssetByUserIdAndCoinId= createAsyncThunk("asset/getAssetByUserIdAndCoinId", async ({jwt, coinId}, thunkAPI)=>{
  try{
    const response = await Api.get(`/api/asset/coin/${coinId}/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const asset = response.data;
    console.log("asset of user by coin id is -",asset)
    return asset
  }catch(error){
    console.log("faild to fetch asset of user by coin id -",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "fetch asset of user by coin id failed..."
  }
})

export const getUserAssets = createAsyncThunk("asset/getUserAssets", async (jwt, thunkAPI)=>{
  try{
    const response = await Api.get(`/api/asset`,{
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const userAssets = response.data;
    console.log("user assets is-",userAssets)
    return userAssets
  }catch(error){
    console.log("faild to fetch user assets-",error);
    return thunkAPI.rejectWithValue(error.response?.data) || "fetch user assets failed..."
  }
})

const initialState = {
  loading: false,
  error: null,
  asset: null,
  userAssets: []
}
const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getAssetById: Fetching a single asset
      .addCase(getAssetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.asset = action.payload;
      })
      .addCase(getAssetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getAssetByUserIdAndCoinId: Fetching a user's asset for a specific coin
      .addCase(getAssetByUserIdAndCoinId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssetByUserIdAndCoinId.fulfilled, (state, action) => {
        state.loading = false;
        state.asset = action.payload; // Updates the single asset state
      })
      .addCase(getAssetByUserIdAndCoinId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getUserAssets: Fetching all assets for a user
      .addCase(getUserAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.userAssets = action.payload; // Updates the array of user assets
      })
      .addCase(getUserAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export default assetSlice.reducer;