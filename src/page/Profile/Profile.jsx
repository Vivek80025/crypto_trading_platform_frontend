import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((store) => store.auth);
  return (
    <div className="flex flex-col items-center gap-6 p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold">
              Your Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col lg:flex-row lg:gap-20 space-y-6 lg:space-y-0">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Email:</h1>
                  <p className="text-gray-400 break-all">{auth.user?.email}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Full Name:</h1>
                  <p className="text-gray-400">{auth.user?.fullName}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Date Of Birth:</h1>
                  <p className="text-gray-400">05/04/2003</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Nationality:</h1>
                  <p className="text-gray-400">Indian</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Address:</h1>
                  <p className="text-gray-400 break-words">Vivek Kumar Jha</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">City:</h1>
                  <p className="text-gray-400">Delhi</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Postcode:</h1>
                  <p className="text-gray-400">20003</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="font-medium min-w-[120px]">Country:</h1>
                  <p className="text-gray-400">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
