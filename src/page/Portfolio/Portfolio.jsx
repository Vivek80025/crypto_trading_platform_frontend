import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserAssets } from "@/State/Asset/AssetSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Portfolio = () => {
  const dispatch = useDispatch();
  const asset = useSelector((store) => store.asset);
  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="p-4 sm:p-5 lg:px-8 lg:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-5">Portfolio</h1>
      {asset.loading ? (
        <div className="h-[calc(100vh-210px)] w-full flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assets</TableHead>
              <TableHead>SYMBOL</TableHead>
              <TableHead>UNIT</TableHead>
              <TableHead>CHANGE</TableHead>
              <TableHead>CHANGE(%)</TableHead>
              <TableHead className="text-right">VOLUME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {asset.userAssets?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={item.coin.image} />
                  </Avatar>
                  <span className="whitespace-normal">{item.coin.name}</span>
                </TableCell>
                <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell
                  className={
                    Number(item.coin.price_change_24h) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.coin.price_change_24h}
                </TableCell>
                <TableCell
                  className={
                    Number(item.coin.price_change_percentage_24h) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.coin.price_change_percentage_24h} %
                </TableCell>
                <TableCell className="text-right">
                  {item.coin.total_volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Portfolio;
