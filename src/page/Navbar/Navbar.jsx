import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { RxMagnifyingGlass } from "react-icons/rx";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { menu, menu2 } from "../DrawerList/AdminDrawerlist";
import { userMenu, userMenu2 } from "../DrawerList/UserDrawerlist";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <div className="p-2 md:px-4 md:py-3 border-b  flex justify-between items-center sticky top-0 z-50 bg-slate-900 shadow-sm ">
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="rounded-full size-9 md:size-10">
              <RxDragHandleHorizontal className="size-5 md:size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="border-r-0 min-h-screen pb-5 w-[300px] sm:[350px] max-w-[80vw]"
          >
            <SheetHeader>
              <SheetTitle className="flex font-bold gap-3 items-center justify-center text-2xl md:text-3xl">
                <Avatar className="size-8 md:size-9 bg-amber-500">
                  <AvatarFallback className="bg-amber-500">
                    {auth.user?.fullName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="flex">
                  <span className="text-amber-700">Viva</span>
                  <span>Trade</span>
                </span>
              </SheetTitle>
            </SheetHeader>

            {auth.user?.role === "ROLE_ADMIN" ? (
              <Sidebar menu={menu} menu2={menu2} />
            ) : (
              <Sidebar menu={userMenu} menu2={userMenu2} />
            )}
          </SheetContent>
        </Sheet>

        <p className="text-lg md:text-xl cursor-pointer font-bold" onClick={()=>navigate("/")}>
          <span className="hidden sm:block">Viva Trading</span>
          <span className="sm:hidden">V Trade</span>{" "}
        </p>

        <div className="ml-2 sm:ml-4">
          <Button
            variant="ghost"
            className="hidden sm:flex items-center gap-x-2"
            onClick={()=>navigate("/search")}
          >
            <RxMagnifyingGlass className="size-4 md:size-5" />
            <span>Search</span>
          </Button>
          <Button variant="ghost" className="sm:hidden">
            <RxMagnifyingGlass className="size-5" />
          </Button>
        </div>
      </div>

      <div>
        <Avatar className="size-8 md:size-9">
          <AvatarFallback>
            {auth.user?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
