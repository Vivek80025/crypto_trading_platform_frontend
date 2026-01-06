import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword } from "@/State/Auth/AuthSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isPasswordValid = passwordRegex.test(password);
  async function handleSubmit() {
    if (!isPasswordValid) return;
    try {
      await dispatch(
        resetPassword({
          email: auth.email,
          otp: otp,
          newPassword: password,
        })
      ).unwrap();
      navigate("/signin");
    } catch (error) {
      console.log("faild to reset password...");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full max-w-md mx-auto px-3 sm:px-4">
      <p className="text-center text-lg sm:text-xl font-bold">New Password</p>

      {/* OTP */}
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(value) => setOtp(value)}
        className="w-full flex justify-center"
      >
        <InputOTPGroup className="gap-1.5 xs:gap-2 sm:gap-3">
          <InputOTPSlot
            index={0}
            className="h-8 w-8
              xs:h-9 xs:w-9
              sm:h-12 sm:w-12
              text-sm sm:text-lg border !rounded-none"
          />
          <InputOTPSlot
            index={1}
            className="h-8 w-8
              xs:h-9 xs:w-9
              sm:h-12 sm:w-12
              text-sm sm:text-lg border !rounded-none"
          />
          <InputOTPSlot
            index={2}
            className="h-8 w-8
              xs:h-9 xs:w-9
              sm:h-12 sm:w-12
              text-sm sm:text-lg border !rounded-none"
          />
        </InputOTPGroup>

        <InputOTPSeparator />

        <InputOTPGroup className="gap-1.5 xs:gap-2 sm:gap-3">
          <InputOTPSlot
            index={3}
            className="h-8 w-8
              xs:h-9 xs:w-9
              sm:h-12 sm:w-12
              text-sm sm:text-lg border !rounded-none"
          />
          <InputOTPSlot
            index={4}
            className="h-8 w-8
              xs:h-9 xs:w-9
              sm:h-12 sm:w-12
              text-sm sm:text-lg border !rounded-none"
          />
          <InputOTPSlot
            index={5}
            className="h-8 w-8
              xs:h-9 xs:w-9
              sm:h-12 sm:w-12
              text-sm sm:text-lg border !rounded-none"
          />
        </InputOTPGroup>
      </InputOTP>

      <div className="w-full">
        <Input
        placeholder="Enter new password"
        className="w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {password && !isPasswordValid && (
        <p className="text-xs text-red-500 w-full text-left">
          Password must be at least 8 characters, include uppercase, lowercase,
          number, and special character.
        </p>
      )}
      </div>

      <Button
        onClick={handleSubmit}
        className="cursor-pointer w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base"
        disabled={auth.loading || otp == "" || password == "" || !isPasswordValid}
      >
        {auth.loading ? <Spinner className="size-8 mx-auto" /> : "Submit"}
      </Button>
    </div>
  );
};

export default ResetPassword;
