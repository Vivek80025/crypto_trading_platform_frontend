import React from "react";
import "./Auth.css";
import { Section } from "lucide-react";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./forgotPasswordForm";
import SigninForm from "./SigninForm";
import VerifyOtpForm from "./VerifyOtpForm";
import ResetPassword from "./ResetPassword";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="min-h-screen relative authContainer flex items-center justify-center px-4">
      <div
        className="
      bgBlur
      relative
      flex flex-col items-center justify-center
      bg-black
      shadow-2xl shadow-white
      w-full max-w-md sm:max-w-lg
      min-h-[28rem] sm:min-h-[32rem]
      rounded-md
      opacity-80
      px-4 sm:px-8
      py-6
    "
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">
          Viva Trading
        </h1>

        {location.pathname == "/signup" ? (
          <section className="w-full space-y-6">
            <SignupForm />
            <div className="flex items-center justify-center text-sm sm:text-base">
              <span>have already account ?</span>
              <Button variant="ghost" onClick={() => navigate("/signin")}>
                signin
              </Button>
            </div>
          </section>
        ) : location.pathname == "/forgotPassword" ? (
          <section className="w-full space-y-6">
            <ForgotPasswordForm />
            <div className="flex items-center justify-center text-sm sm:text-base">
              <span>Back To Login ?</span>
              <Button variant="ghost" onClick={() => navigate("/signin")}>
                signin
              </Button>
            </div>
          </section>
        ) : location.pathname == "/verify-otp" ? (
          <section className="w-full space-y-6">
            <VerifyOtpForm />
            <div className="flex items-center justify-center text-sm sm:text-base">
              <span>Back To Login ?</span>
              <Button variant="ghost" onClick={() => navigate("/signin")}>
                signin
              </Button>
            </div>
          </section>
        ) : location.pathname == "/reset-password" ? (
          <section className="w-full space-y-6">
            <ResetPassword />
            <div className="flex items-center justify-center text-sm sm:text-base">
              <span>Back To Login ?</span>
              <Button variant="ghost" onClick={() => navigate("/signin")}>
                signin
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full space-y-6">
            <SigninForm />

            <div className="flex items-center justify-center text-sm sm:text-base">
              <span>don't have account ?</span>
              <Button variant="ghost" onClick={() => navigate("/signup")}>
                signup
              </Button>
            </div>

            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password ?
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
