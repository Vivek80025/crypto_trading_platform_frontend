import { AiOutlineHome } from "react-icons/ai";
import { RxActivityLog, RxBookmark, RxDashboard } from "react-icons/rx";
import { CiBank, CiCreditCard1, CiWallet } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

export const userMenu = [
  { name: "Home", path: "/", icon: <AiOutlineHome className="!h-6 !w-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <RxDashboard className="!h-6 !w-6" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <RxBookmark className="!h-6 !w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <RxActivityLog className="!h-6 !w-6" />,
  },
  { name: "Wallet", path: "/wallet", icon: <CiWallet className="!h-6 !w-6" /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <CiBank className="!h-6 !w-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CiCreditCard1 className="!h-6 !w-6" />,
  }
];
export const userMenu2 = [
  {
    name: "Profile",
    path: "/profile",
    icon: <LuUserRound className="!h-6 !w-6" />,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: <MdOutlineLogout className="!h-6 !w-6" />,
  },
];