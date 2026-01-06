import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserPaymentDetails } from "@/State/Withdrawal/WithdrawalSlice";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const withdrawal = useSelector((store) => store.withdrawal);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserPaymentDetails(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="flex flex-col space-y-10 p-4 sm:p-5 lg:pt-10 lg:px-10">
      <h1 className="text-2xl sm:text-3xl font-bold">Payment Details</h1>

      {withdrawal.paymentDetails ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">
              {withdrawal.paymentDetails?.bankName}
            </CardTitle>
            <CardDescription>
              A/C No: {withdrawal.paymentDetails?.accountNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row">
              <h1 className="font-bold w-35">A/C Holder</h1>
              <p className="text-gray-400">
                : {withdrawal.paymentDetails?.accountHolderName}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row">
              <h1 className="font-bold w-35">IFSC</h1>
              <p className="text-gray-400">
                : {withdrawal.paymentDetails?.ifsc}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
            <DialogTrigger asChild>
              <Button>Add Payment Details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">Payment Details</DialogTitle>
              </DialogHeader>
              <PaymentDetailsForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
