import "./App.css";
import Navbar from "./page/Navbar/Navbar";
import Auth from "./page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/AuthSlice";
import { Toaster } from "./components/ui/sonner";
import Search from "./page/Search/Search";
import Home from "./page/Home/Home";
import Portfolio from "./page/Portfolio/Portfolio";
import Activity from "./page/Activity/Activity";
import Wallet from "./page/Wallet/Wallet";
import PaymentDetails from "./page/PaymentDetails/PaymentDetails";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import Profile from "./page/Profile/Profile";
import StockDetails from "./page/Stock Details/StockDetails";
import Watchlist from "./page/Watchlist/Watchlist";
import AllWithdrawallist from "./page/Admin/AllWithdrawallist";
import { Route, Routes } from "react-router-dom";

function App() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("jwt");
    if (token) {
      dispatch(getUser(token));
    }
  }, [auth.jwt]);

  console.log("auth--------", auth);
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1rem",
          },
        }}
      />
      {auth.user ? (
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/adminDashboard" element={<AllWithdrawallist />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
