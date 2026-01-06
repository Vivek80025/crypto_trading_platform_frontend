import {Api}  from "@/config/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCoinList = createAsyncThunk("coin/getCoinList", async (page, thunkAPI) => {
  try{
    const response = await Api.get(`/coins?page=${page}`);
    const coins = response.data;
    console.log("coin list--",coins);
    return coins;
  }catch(error){
    console.log("error--",error)
    return thunkAPI.rejectWithValue(error.response?.data || "faild to fetch coin list...");
  }
})

export const getTop50CoinList = createAsyncThunk("coin/getTop50CoinList", async ( _, thunkAPI ) => {
  try{
    const response = await Api.get(`/coins/top50`);
    const coins = response.data;
    console.log("top-50 coin list--",coins);
    return coins;
  }catch(error){
    console.log("error--",error) 
    return thunkAPI.rejectWithValue(error.response?.data || "faild to fetch top50 coin list...");
  }
})

export const getMarketChart = createAsyncThunk("coin/getMarketChart", async ( {coinId, days}, thunkAPI ) => {
  try{
    const response = await Api.get(`/coins/${coinId}/chart?days=${days}`);
    const marketChart = response.data;
    console.log("market chart--",marketChart);
    return marketChart;
  }catch(error){
    console.log("error--",error) 
    return thunkAPI.rejectWithValue(error.response?.data || "faild to fetch market chart of coin...");
  }
})

export const getCoinById = createAsyncThunk("coin/getCoinById", async ( coinId, thunkAPI ) => {
  try{
    const response = await Api.get(`/coins/${coinId}`);
    const coin = response.data;
    console.log("Coin by id--",coin);
    return coin;
  }catch(error){
    console.log("error--",error) 
    return thunkAPI.rejectWithValue(error.response?.data || "faild to fetch coin...");
  }
})

export const getCoinDetails = createAsyncThunk("coin/getCoinDetails", async ( coinId, thunkAPI ) => {
  try{
    const response = await Api.get(`/coins/details/${coinId}`);
    const coinDetails = response.data;
    console.log("Coin details===========================================================",coinDetails);
    return coinDetails;
  }catch(error){
    console.log("error--",error) 
    return thunkAPI.rejectWithValue(error.response?.data || "faild to fetch coin details...");
  }
})

export const searchCoin = createAsyncThunk("coin/searchCoin ", async ( keyword, thunkAPI ) => {
  try{
    const response = await Api.get(`/coins/search?keyword=${keyword}`);
    const searchCoin = response.data;
    console.log("searchCoin--",searchCoin);
    return searchCoin;
  }catch(error){
    console.log("error--",error) 
    return thunkAPI.rejectWithValue(error.response?.data || "faild to search coin...");
  }
})

const initialState = {
  coinList: [],
  top50: [],
  searchCoinList: [],
  marketChart: {data: [], loading: false},
  coinById: null,
  coinDetails: null,
  loading: false,
  error: null,

}
const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    builder
    // 1. Get Coin List
      .addCase(getCoinList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoinList.fulfilled, (state, action) => {
        state.loading = false;
        state.coinList = action.payload;
      })
      .addCase(getCoinList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 2. Get Top 50 Coin List
      .addCase(getTop50CoinList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTop50CoinList.fulfilled, (state, action) => {
        state.loading = false;
        state.top50 = action.payload;
      })
      .addCase(getTop50CoinList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 3. Get Market Chart (Using specific loading state inside marketChart object)
      .addCase(getMarketChart.pending, (state) => {
        state.marketChart.loading = true;
        state.error = null;
      })
      .addCase(getMarketChart.fulfilled, (state, action) => {
        state.marketChart.loading = false;
        state.marketChart.data = action.payload.prices;
      })
      .addCase(getMarketChart.rejected, (state, action) => {
        state.marketChart.loading = false;
        state.error = action.payload;
      })

      // 4. Get Coin By Id
      .addCase(getCoinById.pending, (state) => {
        state.loading = true;
        state.coinById = null;
        state.error = null;
      })
      .addCase(getCoinById.fulfilled, (state, action) => {
        state.loading = false;
        state.coinById = action.payload;
      })
      .addCase(getCoinById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 5. Get Coin Details
      .addCase(getCoinDetails.pending, (state) => {
        state.loading = true;
        state.coinDetails = null;
        state.error = null;
      })
      .addCase(getCoinDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.coinDetails = action.payload;
      })
      .addCase(getCoinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 6. Search Coin
      .addCase(searchCoin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCoin.fulfilled, (state, action) => {
        state.loading = false;
        state.searchCoinList = action.payload;
      })
      .addCase(searchCoin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default coinSlice.reducer;