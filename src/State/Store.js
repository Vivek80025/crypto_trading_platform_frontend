import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";
import coinReducer from "./Coin/CoinSlice";
import walletReducer from "./Wallet/WalletSlice";
import withdrawalReducer from "./Withdrawal/WithdrawalSlice";
import orderReducer from "./Order/OrderSlice";
import assetReducer from "./Asset/AssetSlice";
import watchlistReducer from "./WatchList/WatchlistSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer,
    withdrawal: withdrawalReducer,
    order: orderReducer,
    asset: assetReducer,
    watchlist: watchlistReducer,
  }
});