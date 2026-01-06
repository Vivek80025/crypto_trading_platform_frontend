import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { RxCross1, RxDot } from "react-icons/rx";
import { TbMessageCircleFilled } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/CoinSlice";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [inputValue, setInputvalue] = useState("");
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [page, setPage] = useState(1);

  const getVisiblePages = () => {
    if (page === 1 || page === 2) return [1, 2, 3];
    return [page - 1, page, page + 1];
  };

  const dispatch = useDispatch();

  const coin = useSelector((store) => store.coin);

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleChange = (event) => {
    setInputvalue(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      console.log(event.target.value);
      setInputvalue("");
    }
  };

  useEffect(() => {
    if (category === "all") {
      dispatch(getCoinList(page));
    } else {
      dispatch(getTop50CoinList());
    }

    // if (category === "top50") {
    //   dispatch(getTop50CoinList());
    // }

    // if (category === "top_gainers") {
    //   dispatch(getTop50CoinList());
    // }

    // if (category === "top_losers") {
    //   dispatch(getTop50CoinList());
    // }
  }, [category, page, dispatch]);

  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[50%] lg:border-r">
          <div className="p-3 flex gap-3 border-b bg-slate-900/50 overflow-x-auto whitespace-nowrap">
            <Button
              variant={category == "all" ? "default" : "outline"}
              className="rounded-full shrink-0"
              onClick={() => handleCategory("all")}
            >
              All
            </Button>
            <Button
              variant={category == "top50" ? "default" : "outline"}
              className="rounded-full shrink-0"
              onClick={() => handleCategory("top50")}
            >
              Top 50
            </Button>
            <Button
              variant={category == "top_gainers" ? "default" : "outline"}
              className="rounded-full shrink-0"
              onClick={() => handleCategory("top_gainers")}
            >
              Top Gainers
            </Button>
            <Button
              variant={category == "top_losers" ? "default" : "outline"}
              className="rounded-full shrink-0"
              onClick={() => handleCategory("top_losers")}
            >
              Top Losers
            </Button>
          </div>

          <AssetTable
            coin={category === "all" ? coin.coinList : coin.top50}
            category={category}
          />
          <div className="bg-slate-900 p-3 border-t flex justify-center">
            <div
              className={`${
                category !== "all" ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <Pagination dissabled={category !== "all"}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => page > 1 && setPage(page - 1)}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {getVisiblePages().map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={page === p}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext onClick={() => setPage(page + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[50%] p-4">
          <StockChart coinId={coin.coinList?.[0]?.id}></StockChart>
          <div className="flex items-center gap-4 mt-6">
            <Avatar className="size-12">
              <AvatarImage src={coin.coinList?.[0]?.image} />
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">
                  {coin.coinList?.[0]?.symbol.toUpperCase()}
                </span>
                <RxDot className="text-gray-400 size-4" />
                <span className="text-gray-400">
                  {coin.coinList?.[0]?.name}
                </span>
              </div>

              <div className="flex gap-3 items-center mt-1">
                <span className="text-2xl font-bold">
                  ${coin.coinList?.[0]?.current_price}
                </span>
                <span className="font-medium">
                  <span
                    className={`text-sm ${
                      Number(coin.coinList?.[0]?.market_cap_change_24h >= 0)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.coinList?.[0]?.market_cap_change_24h}
                  </span>
                  <span
                    className={`text-xs ${
                      Number(coin.coinList?.[0]?.market_cap_change_24h >= 0)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {" "}
                    ({coin.coinList?.[0]?.market_cap_change_percentage_24h}%)
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 md:bottom-5 right-5 flex flex-col items-end gap-3 z-50">
        {isBotRelease && (
          <div
            className="
              rounded-xl shadow-2xl overflow-hidden bg-slate-900 text-white border border-gray-700
              w-full h-[80vh]
              sm:w-[350px] sm:h-[500px]
              lg:w-[400px] lg:h-[75vh]
              max-h-[800px]
            "
          >
            <div className="flex justify-between items-center border-b border-gray-700 px-4 h-[10%]">
              <span className="font-semibold">Chat Bot</span>
              <Button
                onClick={handleBotRelease}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <RxCross1 className="size-4" />
              </Button>
            </div>
            <div className="h-[80%] px-4 py-3 flex flex-col gap-4 overflow-y-auto">
              <div className="w-auto self-start pb-5 ">
                <div className="w-auto max-w-[85%] px-4 py-2 bg-slate-800 rounded-lg">
                  <p>hi,Vivek</p>
                  <p>you can ask crypto related any question</p>
                  <p>like, price, market cap extra...</p>
                </div>
              </div>

              {[1, 1, 1, 1].map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex ${
                    index % 2 == 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[85%] px-4 py-2 rounded-lg 
                      ${index % 2 == 0 ? "bg-blue-600" : "bg-slate-700"}
                  `}
                  >
                    {index % 2 == 0 ? (
                      <p>prompt: who are you?</p>
                    ) : (
                      <p>Hello Vivek, I am your help desk.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[10%] border-t border-gray-700">
              <Input
                className="w-full h-full border-0 ring-0 focus-visible:ring-0 outline-none rounded-none 
              bg-slate-900 text-white placeholder-gray-500 px-4"
                placeholder="write promt..."
                onChange={handleChange}
                value={inputValue}
                onKeyDown={handleKeyPress}
              ></Input>
            </div>
          </div>
        )}

        <div className="w-32 sm:w-40 group" onClick={handleBotRelease}>
          <Button className="w-full h-11 sm:h-12 flex items-center justify-center gap-2 rounded-lg shadow-lg">
            <TbMessageCircleFilled className="-rotate-90 size-5 sm:size-6" />
            <span className="text-base sm:text-lg font-semibold">Chat Bot</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
