import React, { useEffect } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrder } from "@/State/Order/OrderSlice";
import { calculateProfit } from "@/utils/calculateProfit";
import { Spinner } from "@/components/ui/spinner";

const Activity = () => {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(getAllUserOrder({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="p-4 sm:p-5 lg:px-10 lg:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-5">
        Trading History
      </h1>
      {order.loading ? (
        <div className="h-[calc(100vh-210px)] w-full flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 sm:py-5">Date & Time</TableHead>
              <TableHead>Trading Pair</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Profit/Loss</TableHead>
              <TableHead className="text-right">VALUE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.userOrders.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <p>{item.timeStamp.split("T")[0]}</p>
                    <p className="text-gray-500">
                      {item.timeStamp.split("T")[1].split(".")[0]}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={item.orderItem.coin.image} />
                  </Avatar>
                  <span className="whitespace-normal">
                    {item.orderItem.coin.name}
                  </span>
                </TableCell>
                <TableCell>{item.orderItem.buyPrice}</TableCell>
                <TableCell>{item.orderItem.sellPrice || "-"}</TableCell>
                <TableCell>{item.orderType}</TableCell>
                <TableCell
                  className={
                    calculateProfit(item) < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {calculateProfit(item)}
                </TableCell>
                <TableCell className="text-right">$ {item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Activity;
