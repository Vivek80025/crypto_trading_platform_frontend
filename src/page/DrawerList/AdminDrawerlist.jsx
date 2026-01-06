import { AiOutlineHome } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export const menu = [
  { name: "Home", path: "/", icon: <AiOutlineHome className="!h-6 !w-6" /> },
  {
    name: "Dashboard",
    path: "/adminDashboard",
    icon: <RxDashboard className="!h-6 !w-6" />,
  },
];
export const menu2 = [
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