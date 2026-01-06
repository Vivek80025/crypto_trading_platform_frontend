import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { resendOtp, verifyOtp } from "@/State/Auth/AuthSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyOtpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [value, setValue] = useState("");

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // timer logic
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  async function handleSubmit() {
    try {
      await dispatch(verifyOtp({ email: auth.email, otp: value })).unwrap();
      navigate("/");
    } catch (error) {
      console.log("failed to varify otp...", error);
    }
  }

  async function handleResendOtp() {
    try {
      await dispatch(resendOtp(auth.email)).unwrap();
      setTimer(30);
      setCanResend(false);
      setValue("");
    } catch (error) {
      console.log("failed to resend otp...", error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5">
      <p className="text-center text-lg sm:text-xl font-bold">
        Verify otp sent to email
      </p>
      <div className="flex flex-col gap-1 sm:gap-2">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
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
        {canResend ? (
          <div className="flex justify-end">
            <span
              className="text-base text-amber-400 font-semibold cursor-pointer"
              onClick={handleResendOtp}
            >
              Resend Otp
            </span>
          </div>
        ) : (
          <p className="flex justify-end text-base text-gray-400">
            {timer}s Resend Otp
          </p>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className="cursor-pointer w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base"
        disabled={auth.loading}
      >
        {auth.loading ? <Spinner className="size-8" /> : "Submit"}
      </Button>
    </div>
  );
};

export default VerifyOtpForm;
