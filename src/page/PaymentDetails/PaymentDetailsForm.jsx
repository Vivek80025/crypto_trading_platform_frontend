import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addPaymentDetails } from "@/State/Withdrawal/WithdrawalSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PaymentDetailsForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const withdrawal = useSelector((store) => store.withdrawal);
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
    },
  });

  const onSubmit = async (value) => {
    console.log(value);
    const result = await dispatch(
      addPaymentDetails({
        paymentDetails: value,
        jwt: localStorage.getItem("jwt"),
      })
    );

    if (addPaymentDetails.fulfilled.match(result)) {
      onSuccess();
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 pt-4 sm:pt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            rules={{ required: "Account holder name is required" }}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Account holder name
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 sm:p-5 text-sm sm:text-base"
                    placeholder="Vivek Jha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{ required: "Ifsc code is required" }}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  IFSC Code
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 sm:p-5 text-sm sm:text-base"
                    placeholder="YESB000009"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{ required: "Account number is required" }}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 sm:p-5 text-sm sm:text-base"
                    placeholder="********5602"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{
              required: "Please confirm account number",
              validate: (value) =>
                value === form.getValues("accountNumber") ||
                "Account numbers do not match",
            }}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Confirm Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 sm:p-5 text-sm sm:text-base"
                    placeholder="Confirm Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{ required: "Account number is required" }}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Bank Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 sm:p-5 text-sm sm:text-base"
                    placeholder="YES Bank"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full p-4 sm:p-5 text-sm sm:text-base"
            type="submit"
            disabled={!form.formState.isValid || withdrawal.loading}
          >
            {withdrawal.loading ? <Spinner className="size-8" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
