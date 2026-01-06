import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserWithdrawalHistory } from "@/State/Withdrawal/WithdrawalSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const withdrawal = useSelector((store) => store.withdrawal);
  useEffect(() => {
    dispatch(getUserWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="p-4 sm:p-5 lg:px-10 lg:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">
        Withdrawal
      </h1>
      {withdrawal.loading ? (
        <div className="h-[calc(100vh-210px)] w-full flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawal.withdrawalHistory?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="whitespace-normal">{item.date}</TableCell>
                <TableCell>Bank Account</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`py-1 px-2 rounded-full ${
                      item.status === "PENDING"
                        ? "bg-amber-500"
                        : item.status === "SUCCESS"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Withdrawal;
