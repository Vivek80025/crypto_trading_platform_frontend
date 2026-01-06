import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { RxDot } from "react-icons/rx";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "@/State/Coin/CoinSlice";
import { store } from "@/State/Store";
import WatchlistButton from "../CustomThings/WatchlistButton";
import { getUserWatchlist } from "@/State/WatchList/WatchlistSlice";

const StockDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const coin = useSelector((store) => store.coin);

  const [open, setOpen] = useState(false);

  console.log("id----", id);

  useEffect(() => {
    dispatch(getCoinDetails(id));
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [id]);

  return (
    <div className="p-5 mt-5 space-y-5">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pb-5 gap-6">
        <div className="flex items-center gap-5">
          <Avatar className="size-10 sm:size-12">
            <AvatarImage src={coin.coinDetails?.image?.large} />
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
              <span>{coin.coinDetails?.symbol.toUpperCase()}</span>
              <RxDot className="text-gray-400" />
              <span className="text-gray-400">{coin.coinDetails?.name}</span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-lg sm:text-xl font-bold">
                ${coin.coinDetails?.market_data.current_price.usd}
              </span>
              <span className="text-sm sm:text-base">
                <span
                  className={`${
                    Number(
                      coin.coinDetails?.market_data.market_cap_change_24h >= 0
                    )
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coin.coinDetails?.market_data.market_cap_change_24h}
                </span>
                <span
                  className={`${
                    Number(
                      coin.coinDetails?.market_data
                        .market_cap_change_percentage_24h >= 0
                    )
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {" "}
                  (
                  {
                    coin.coinDetails?.market_data
                      .market_cap_change_percentage_24h
                  }
                  %)
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full lg:w-auto">
          <WatchlistButton id={id} />
          <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
            <DialogTrigger asChild>
              <Button size="lg">TRADE</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  how much do you want to spend?
                </DialogTitle>
              </DialogHeader>
              <TradingForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
