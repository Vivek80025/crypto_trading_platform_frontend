import React from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/State/Auth/AuthSlice";
import { Separator } from "@/components/ui/separator";
const Sidebar = ({menu, menu2}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-3 px-5">
        {menu.map((item) => (
          <SheetClose asChild key={item.name}>
            <Button
              onClick={() => {
                navigate(item.path);
              }}
              variant="outline"
              className="
                  flex items-center w-full 
                  gap-4
                  py-5
                  text-base
                "
            >
              <span className="text-2xl">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        ))}
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">
        <Separator className="w-full" />
        <div className="w-full flex flex-col gap-3 px-5 ">
          {menu2.map((item) => (
          <SheetClose asChild key={item.name}>
            <Button
              onClick={() => {
                if (item.name === "Logout") {
                  handleLogout();
                  navigate("/");
                } else {
                  navigate(item.path);
                }
              }}
              variant="outline"
              className="
                  flex items-center w-full 
                  gap-4
                  py-5
                  text-base
                "
            >
              <span className="text-2xl">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
