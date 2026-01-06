import { Button } from "@/components/ui/button";
import { addCoinToWatchlist } from "@/State/WatchList/WatchlistSlice";
import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { RxBookmarkFilled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const WatchlistButton = ({id}) => {
  const dispatch = useDispatch();
  const watchlistItems = useSelector((store) => store.watchlist.items);
  const isCoinInWatchlist = watchlistItems.some((item) => item.id === id);

  const handleAddToWatchlist = () => {
    dispatch(
      addCoinToWatchlist({ jwt: localStorage.getItem("jwt"), coinId: id })
    );
  };
  return (
    <Button variant="outline" onClick={handleAddToWatchlist}>
      {isCoinInWatchlist ? (
        <RxBookmarkFilled className="!w-6 !h-6" />
      ) : (
        <FaRegBookmark className="!w-6 !h-6" />
      )}
    </Button>
  );
};

export default WatchlistButton;
