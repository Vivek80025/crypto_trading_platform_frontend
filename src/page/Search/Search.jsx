import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { searchCoin } from "@/State/Coin/CoinSlice";
import React, { useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const coin = useSelector((store) => store.coin);
  useEffect(() => {
    if (keyword.trim() === "") return;
    const timer = setTimeout(() => {
      dispatch(searchCoin(keyword));
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);
  return (
    <div className="flex flex-col px-6 lg:px-10 md:gap-10 gap-6">
      <div className="flex justify-center">
        <div className="flex items-center md:w-[50%] w-full pt-6 sm:pt-8">
          <Input
            type="text"
            placeholder="explore market..."
            className="p-5 border-r-0 rounded-r-none focus-visible:ring-0 focus:!border-input !text-base"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            className="p-5 border-l-0 rounded-l-none text-base"
            onClick={() => {
              if (keyword.trim() !== "") {
                dispatch(searchCoin(keyword));
              }
            }}
          >
            <RxMagnifyingGlass className="size-4 md:size-5" />
          </Button>
        </div>
      </div>
      {coin.loading ? (
        <div className="h-[calc(100vh-210px)] w-full flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[26%] text-gray-400 py-4">
                Market Cap Rank
              </TableHead>
              <TableHead className="text-gray-400">Trading Pair</TableHead>
              <TableHead className="text-right text-gray-400">SYMBOL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coin.searchCoinList?.coins?.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => navigate(`/market/${item.id}`)}
              >
                <TableCell className="font-medium">
                  {item.market_cap_rank}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={item.large} alt="@shadcn" />
                  </Avatar>
                  <span className="">{item.name}</span>
                </TableCell>
                <TableCell className="text-right">{item.symbol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Search;
