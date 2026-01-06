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
import { RxBookmarkFilled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getUserWatchlist } from "@/State/WatchList/WatchlistSlice";
import WatchlistButton from "../CustomThings/WatchlistButton";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector((store) => store.watchlist);

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="p-4 sm:p-5 lg:px-8 lg:py-10">
      <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-bold pb-4 sm:pb-5">
        <RxBookmarkFilled />
        <span>Watchlist</span>
      </h1>
      {watchlist.loading ? (
        <div className="h-[calc(100vh-210px)] w-full flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 sm:py-5">Coin</TableHead>
              <TableHead>SYMBAL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP</TableHead>
              <TableHead>24H</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead className="text-right text-red-500">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.items.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => navigate(`/market/${item.id}`)}
              >
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={item.image} />
                  </Avatar>
                  <span className="whitespace-normal">{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol.toUpperCase()}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell
                  className={
                    Number(item.price_change_percentage_24h) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.price_change_percentage_24h} %
                </TableCell>
                <TableCell>{item.current_price}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <WatchlistButton id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Watchlist;
