import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  getUserPaymentDetails,
  withdrawalRequest,
} from "@/State/Withdrawal/WithdrawalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WithdrawalForm = ({ onSuccess }) => {
  const wallet = useSelector((store) => store.wallet);
  const withdrawal = useSelector((store) => store.withdrawal);

  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("withdrawal amount ", amount);
    const result = await dispatch(
      withdrawalRequest({ amount: amount, jwt: localStorage.getItem("jwt") })
    );

    if (withdrawalRequest.fulfilled.match(result)) {
      onSuccess();
    }
  };

  useEffect(() => {
    dispatch(getUserPaymentDetails(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="pt-6 sm:pt-10 space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-slate-900 rounded-md text-base sm:text-xl font-bold">
        <span>Available balance</span>
        <span>
          <span>$</span>
          {wallet.userWallet?.balance}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-sm sm:text-base">Enter withdrawal amount</h1>
        <div>
          <Input
            className="py-5 sm:py-7 text-xl sm:!text-2xl text-center border-none !outline-none
          focus:!outline-none focus:!ring-0 !bg-transparent"
            placeholder="$9999"
            value={amount}
            onChange={handleChange}
            type="number"
          />
        </div>
      </div>

      <div>
        <h1 className="pb-2 text-sm sm:text-base">Transfer to</h1>
        <div className="flex items-center gap-3 sm:gap-5 border rounded-md px-4 sm:px-5 py-2">
          <img
            className="w-7 h-7 sm:w-8 sm:h-8"
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/bank-icon-svg-download-png-3505771.png?f=webp&w=512"
            alt=""
          />
          <div className="flex flex-col justify-center">
            <p className="text-base sm:text-xl font-bold">
              {withdrawal.paymentDetails?.bankName || "no bank added"}
            </p>
            <span className="text-xs sm:text-sm">
              {withdrawal.paymentDetails?.accountNumber || "**************"}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full py-5 sm:py-7 text-base sm:text-lg"
        disabled={
          amount <= 0 ||
          amount > Number(wallet.userWallet?.balance) ||
          withdrawal.paymentDetails == null ||
          withdrawal.loading
        }
      >
        {withdrawal.loading ? <Spinner className="size-8" /> : "Withdrawal"}
      </Button>
    </div>
  );
};

export default WithdrawalForm;
