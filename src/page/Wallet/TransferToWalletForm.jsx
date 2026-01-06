import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { transferMoney } from "@/State/Wallet/WalletSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransferToWalletForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const wallet = useSelector((store) => store.wallet);
  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    console.log("transfer money to other wallet form data-", formData);
    const result = await dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        amount: formData.amount,
      })
    );

    if (transferMoney.fulfilled.match(result)) {
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
          name="amount"
          value={formData.amount}
          type="Number"
        />
      </div>

      <div>
        <h1 className="pb-1 text-sm sm:text-base">Enter Wallet Id</h1>
        <Input
          placeholder="#ADFE34456"
          className="py-5 sm:py-7 text-base sm:!text-lg"
          onChange={handleChange}
          name="walletId"
          value={formData.walletId}
        />
      </div>

      <div>
        <h1 className="pb-1 text-sm sm:text-base">Purpose</h1>
        <Input
          placeholder="gift for your friend..."
          className="py-5 sm:py-7 text-base sm:!text-lg"
          onChange={handleChange}
          name="purpose"
          value={formData.purpose}
        />
      </div>

      <Button
        className="w-full py-5 sm:py-7 text-base sm:text-lg"
        onClick={handleSubmit}
        disabled={
          formData.amount <= 0 ||
          formData.amount > Number(wallet.userWallet?.balance) ||
          formData.walletId == "" ||
          wallet.loading
        }
      >
        {wallet.loading ? <Spinner className="size-8" /> : "Submit"}
      </Button>
    </div>
  );
};

export default TransferToWalletForm;
