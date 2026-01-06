import { Api } from "@/config/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserWatchlist = createAsyncThunk(
  "watchlist/getUserWatchlist",
  async (jwt, thunkAPI) => {
    try {
      const response = await Api.get("api/watchlist/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const watchlist = response.data;
      console.log("user watch is - ", watchlist);
      return watchlist;
    } catch (error) {
      console.log("failed to fetch user watchlist-", error);
      return (
        thunkAPI.rejectWithValue(error.response?.data ||
        "fetch user watchlist failed...")
      );
    }
  }
);

export const addCoinToWatchlist = createAsyncThunk(
  "watchlist/addCoinToWatchlist",
  async ({ jwt, coinId }, thunkAPI) => {
    try {
      const response = await Api.patch(
        `api/watchlist/add/coin/${coinId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data; // Coin object
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add coin to watchlist"
      );
    }
  }
);

const initialState = {
  watchlist: null,
  items: [],
  loading: false,
  error: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET USER WATCHLIST
      .addCase(getUserWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
        state.items = action.payload.coins;
      })
      .addCase(getUserWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD COIN TO WATCHLIST
      .addCase(addCoinToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCoinToWatchlist.fulfilled, (state, action) => {
        state.loading = false;

        const coin = action.payload;

        const exists = state.items.find(c => c.id === coin.id);

        if (exists) {
          state.items = state.items.filter(c => c.id !== coin.id);
        } else {
          state.items.push(coin);
        }
      })
      .addCase(addCoinToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default watchlistSlice.reducer;
