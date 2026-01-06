import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getAssetByUserIdAndCoinId } from "@/State/Asset/AssetSlice";
import { payOrderPayment } from "@/State/Order/OrderSlice";
import { getUserWallet } from "@/State/Wallet/WalletSlice";
import React, { useEffect, useState } from "react";
import { RxDot } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const TradingForm = ({ onSuccess }) => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const wallet = useSelector((store) => store.wallet);
  const coin = useSelector((store) => store.coin);
  const order = useSelector((store) => store.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  const asset = useSelector((store) => store.asset);
  const handleChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    const volume = calculateQuantity(
      amount,
      coin.coinDetails?.market_data.current_price.usd
    );
    setQuantity(volume);
  };

  function calculateQuantity(amount, coinPrice) {
    let volume = amount / coinPrice;
    let decimalPlaces = Math.max(2, coinPrice.toString().split(".")[0].length);
    return volume.toFixed(decimalPlaces);
  }

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(
      getAssetByUserIdAndCoinId({
        jwt: localStorage.getItem("jwt"),
        coinId: id,
      })
    );
  }, []);
  const handleBuyCrypto = async () => {
    const result = await dispatch(
      payOrderPayment({
        orderRequest: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
          price: amount,
        },
        jwt: localStorage.getItem("jwt"),
      })
    );

    if (payOrderPayment.fulfilled.match(result)) {
      toast.success("Success...");
      onSuccess();
    }
    if (payOrderPayment.rejected.match(result)) {
      toast.error("Failed...");
    }
  };
  return (
    <div className="px-4 sm:px-5 pt-4 sm:pt-5 space-y-8 sm:space-y-10 w-full">
      {/* Amount Input */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <Input
            onChange={handleChange}
            className="
          focus:!ring-0
    !bg-transparent
    !placeholder-white
    w-full sm:w-[70%]
    h-[56px] sm:h-[60px]
    text-lg
        "
            placeholder="Enter amount..."
            type="number"
          />

          <div
            className="
        border
        w-full sm:w-[30%]
        rounded-md
        flex
        justify-center
        items-center
        py-4 sm:py-0
        text-lg
        font-semibold
      "
          >
            {quantity}
          </div>
        </div>

        {Number(amount) > Number(wallet.userWallet?.balance) && (
          <h1 className="text-center text-sm sm:text-base text-red-600">
            Insufficient Wallet Balance To Buy
          </h1>
        )}
      </div>

      {/* Coin Info */}
      <div className="flex items-center gap-4 sm:gap-5">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
          <AvatarImage src={coin.coinDetails?.image?.large} />
        </Avatar>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <span className="font-semibold">
              {coin.coinDetails?.symbol.toUpperCase()}
            </span>
            <RxDot className="text-gray-400" />
            <span className="text-gray-400">{coin.coinDetails?.name}</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-lg sm:text-xl font-bold">
              ${coin.coinDetails?.market_data.current_price.usd}
            </span>
            <span className="text-sm sm:text-base">
              <span
                className={
                  Number(coin.coinDetails?.market_data.market_cap_change_24h) >=
                    0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {coin.coinDetails?.market_data.market_cap_change_24h}
              </span>
              <span
                className={
                  Number(
                    coin.coinDetails?.market_data
                      .market_cap_change_percentage_24h
                  ) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {" "}
                (
                {coin.coinDetails?.market_data.market_cap_change_percentage_24h}
                %)
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Order Type */}
      <div className="flex justify-between text-sm sm:text-base">
        <p>Order Type</p>
        <p className="font-semibold">Market Order</p>
      </div>

      {/* Available Balance / Quantity */}
      {orderType === "BUY" ? (
        <div className="flex justify-between items-center">
          <p>Available Cash</p>
          <p className="text-xl sm:text-2xl font-bold">
            ${wallet.userWallet?.balance || 0}
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>Available Quantity</p>
          <p className="text-xl sm:text-2xl font-bold">
            {asset.asset?.quantity || 0}
          </p>
        </div>
      )}

      <div className="space-y-3 text-center">
        <Button
          onClick={handleBuyCrypto}
          disabled={
            (orderType === "BUY" &&
              Number(amount) > Number(wallet.userWallet?.balance)) ||
            (orderType === "SELL" &&
              Number(quantity) > Number(asset.asset?.quantity)) ||
            Number(quantity) <= 0 ||
            order.loading
          }
          className={`
        w-full
        py-4 sm:py-5
        text-base sm:text-lg
        ${orderType === "SELL" ? "bg-red-600 text-white hover:bg-red-700" : ""}
      `}
        >
          {order.loading ? <Spinner className="size-8" /> : orderType}
        </Button>

        <Button
          className="text-base sm:text-lg"
          variant="link"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TradingForm;
