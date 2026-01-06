import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AssetTable = ({ coin, category }) => {
  const navigate = useNavigate();
  const coinlist = useSelector((store) => store.coin);
  return (
    <>
      {coinlist.loading ? (
        <div className="h-[calc(100vh-174.5px)] md:h-[calc(100vh-186.5px)] flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <div className="h-[calc(100vh-174.5px)] md:h-[calc(100vh-186.5px)] overflow-y-auto no-scrollbar">
          <Table className="h-[calc(100vh-174.5px)] md:h-[calc(100vh-186.5px)]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] p-4">Coin</TableHead>
                <TableHead>SYMBOL</TableHead>
                <TableHead>VOLUME</TableHead>
                <TableHead>MARKET CAP</TableHead>
                <TableHead>24H</TableHead>
                <TableHead className="text-right">PRICE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {coin.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => navigate(`/market/${item.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={item.image} />
                      </Avatar>
                      <span className="whitespace-normal">{item.name}</span>
                    </div>
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
                  <TableCell className="text-right">
                    $ {item.current_price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default AssetTable;
