import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { paymentHandler } from "@/State/Wallet/WalletSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopupForm = ({ onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const wallet = useSelector((store) => store.wallet);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAmount(event.target.value);
  };
  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
  };
  const handleSubmit = async () => {
    console.log(amount, paymentMethod);
    const result = await dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );

    if (paymentHandler.fulfilled.match(result)) {
      onSuccess();
    }
  };
  return (
    <div className="pt-6 sm:pt-10 space-y-4 sm:space-y-5">
      <div>
        <h1 className="pb-1 text-sm sm:text-base">Enter Amount</h1>
        <Input
          placeholder="$9999"
          className="py-5 sm:py-7 text-base sm:!text-lg"
          onChange={handleChange}
          value={amount}
          type="Number"
        />
      </div>

      <div>
        <h1 className="pb-1 text-sm sm:text-base">Select payment method</h1>

        <RadioGroup
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          defaultValue="RAZORPAY"
          onValueChange={(value) => handlePaymentChange(value)}
        >
          <div className="flex items-center space-x-2 border p-3 sm:px-5 rounded-md w-full sm:w-auto">
            <RadioGroupItem
              className="h-7 w-7 sm:h-9 sm:w-9"
              value="RAZORPAY"
              id="razorpay"
            />
            <Label htmlFor="razorpay" className="w-full">
              <div className="bg-white px-4 sm:px-6 rounded-md flex justify-center">
                <img
                  className="h-8 sm:h-9 w-28 sm:w-32 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                  alt=""
                />
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border p-3 sm:px-5 rounded-md w-full sm:w-auto opacity-70">
            <RadioGroupItem
              className="h-7 w-7 sm:h-9 sm:w-9"
              value="STRIPE"
              id="stripe"
              disabled
            />
            <Label htmlFor="stripe" className="w-full">
              <div className="bg-white px-4 sm:px-6 rounded-md flex justify-center">
                <img
                  className="h-8 sm:h-9 w-28 sm:w-32 object-contain"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-stripe-logo-icon-svg-download-png-2945188.png?f=webp&w=512"
                  alt=""
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full py-5 sm:py-7 text-base sm:text-lg"
        disabled={amount <= 0 || wallet.loading}
      >
        {wallet.loading ? <Spinner className="size-8" /> : "Submit"}
      </Button>
    </div>
  );
};

export default TopupForm;
