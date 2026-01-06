import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllWithdrawalRequest,
  proceedWithdrawal,
} from "@/State/Withdrawal/WithdrawalSlice";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const AllWithdrawallist = () => {
  const dispatch = useDispatch();
  const withdrawal = useSelector((store) => store.withdrawal);
  const [filter, setFilter] = useState("ALL");

  const filteredRequests =
    filter === "PENDING"
      ? withdrawal.withdrawalRequests.filter(
          (item) => item.status === "PENDING"
        )
      : withdrawal.withdrawalRequests;

  const handleUpdateStatus = async (id, accept) => {
    try {
      await dispatch(
        proceedWithdrawal({
          jwt: localStorage.getItem("jwt"),
          id,
          accept,
        })
      ).unwrap();

      dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));
    } catch (error) {
      console.error("Failed to update withdrawal status:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="p-4 sm:p-5 lg:px-10 lg:py-10">
      <div className="flex sm:flex-row flex-col sm: justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Withdrawal Requests</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="!px-6 py-6 text-lg font-semibold border-1 !border-white hover:bg-slate-100 gap-2"
            >
              <FaFilter />
              <span>Filter: {filter}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-2">
            <DropdownMenuLabel className="text-gray-400 font-normal px-2 py-1.5 text-xs uppercase">
              Filter by Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer font-medium p-3"
              onClick={() => setFilter("ALL")}
            >
              ALL WITHDRAWAL
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer font-medium p-3"
              onClick={() => setFilter("PENDING")}
            >
              PENDING WITHDRAWAL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {withdrawal.loading ? (
        <div className="h-[calc(100vh-210px)] w-full flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="whitespace-normal">
                  {item.date?.split("T")[0]}
                </TableCell>
                <TableCell>{item.user.fullName}</TableCell>
                <TableCell>Bank Account</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>
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
                <TableCell className="text-right">
                  {item.status === "PENDING" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="text-green-600 cursor-pointer"
                          onClick={() => handleUpdateStatus(item.id, true)}
                        >
                          SUCCESS
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleUpdateStatus(item.id, false)}
                        >
                          DECLINE
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-gray-400 italic">Processed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllWithdrawallist;
