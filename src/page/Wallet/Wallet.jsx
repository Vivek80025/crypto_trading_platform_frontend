import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { TbWallet } from "react-icons/tb";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
import TopupForm from "./TopupForm";
import { PiShuffle } from "react-icons/pi";
import WithdrawalForm from "./WithdrawalForm";
import TransferToWalletForm from "./TransferToWalletForm";
import { RxUpdate } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsShuffle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  depositMoney,
  getUserWallet,
  getWalletTransaction,
} from "@/State/Wallet/WalletSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { jwt } from "zod";
import { Spinner } from "@/components/ui/spinner";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const wallet = useSelector((store) => store.wallet);

  const query = useQuery();
  const paymentOrderId = query.get("payment_order_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransactions();
  }, []);

  // useEffect(()=>{
  //   dispatch(depositMoney({jwt: localStorage.getItem("jwt") ,paymentOrderId: paymentOrderId, paymentId: razorpayPaymentId}))
  // },[paymentOrderId,razorpayPaymentId])

  useEffect(() => {
    if (paymentOrderId) {
      (async () => {
        try {
          await dispatch(
            depositMoney({
              jwt: localStorage.getItem("jwt"),
              paymentOrderId: paymentOrderId,
              paymentId: razorpayPaymentId,
            })
          ).unwrap();

          navigate("/wallet");
        } catch (error) {
          console.log("deposit money failed - ", error);
        }
      })(); // 👈 YOU MUST CALL THE FUNCTION HERE
    }
  }, [paymentOrderId, razorpayPaymentId]);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    console.log("my wallet is: ===============================", wallet);
  };
  const handleFetchWalletTransactions = () => {
    dispatch(getWalletTransaction(localStorage.getItem("jwt")));
  };
  return (
    <div className="flex flex-col items-center px-3 sm:px-5">
      <div className="w-full lg:w-[60%] pt-6 sm:pt-10">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <TbWallet className="h-8 w-8 sm:!h-10 sm:!w-10" />
                <div>
                  <p className="text-lg sm:text-xl font-bold">My Wallet</p>
                  <div className="flex gap-2 items-center text-sm">
                    <p className="break-all sm:break-normal">
                      #{wallet.userWallet?.id}
                    </p>
                    <IoCopyOutline className="cursor-pointer hover:text-slate-300 h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              <MdOutlineRefresh
                onClick={handleFetchUserWallet}
                className="h-6 w-6 sm:!h-7 sm:!w-7 hover:text-gray-400 self-end sm:self-auto cursor-pointer"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex gap-1 items-center">
              {wallet.loading ? (
                <Spinner className="size-8 sm:size-10" />
              ) : (
                <span>
                  <span className="text-2xl sm:text-3xl font-bold">$</span>
                  <span className="text-2xl sm:text-3xl font-bold">
                    {wallet.userWallet?.balance}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-7 mt-6 justify-center sm:justify-start">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-md flex flex-col items-center justify-center hover:text-gray-400 cursor-pointer shadow-slate-800 shadow-md">
                    <HiOutlineUpload />
                    <span className="text-xs sm:text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>

              <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
                <DialogTrigger asChild>
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-md flex flex-col items-center justify-center hover:text-gray-400 cursor-pointer shadow-slate-800 shadow-md">
                    <HiOutlineDownload />
                    <span className="text-xs sm:text-sm mt-2">Withdraw</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-md flex flex-col items-center justify-center hover:text-gray-400 cursor-pointer shadow-slate-800 shadow-md">
                    <PiShuffle />
                    <span className="text-xs sm:text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Transfer to other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferToWalletForm onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-[60%] pt-8 sm:pt-10 flex flex-col space-y-4 sm:space-y-5 pb-5">
        <div className="flex items-center justify-between text-xl sm:text-2xl font-bold gap-2">
          <h1>History</h1>
          <RxUpdate
            onClick={handleFetchWalletTransactions}
            className="cursor-pointer hover:text-gray-400 h-5 w-5 sm:h-6 sm:w-6"
          />
        </div>

        {wallet.loading ? (
          <div className="w-full flex items-center justify-center">
            <Spinner className="size-8 sm:size-10" />
          </div>
        ) : (
          wallet.transactions.map((item, index) => (
            <Card key={index} className="py-2 px-4 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-5">
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                    <AvatarFallback>
                      <BsShuffle />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold text-sm sm:text-base">
                      {item.type || item.purpose}
                    </h1>
                    <span className="text-xs text-slate-400">
                      {item.localDateTime}
                    </span>
                  </div>
                </div>

                <span
                  className={`font-bold text-sm sm:text-base whitespace-nowrap
                   ${
                     item.type === "ADD_MONEY" || item.type === "SELL_ASSET"
                       ? "text-green-500"
                       : item.type === "BUY_ASSET" ||
                         item.type === "WALLET_TRANSFER" ||
                         item.type === "WITHDRAWAL"
                       ? "text-red-500"
                       : "text-gray-500"
                   }
                 `}
                >
                  {item.amount} USD
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Wallet;
