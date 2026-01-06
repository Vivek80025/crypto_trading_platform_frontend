import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { register } from "@/State/Auth/AuthSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth)
  const form = useForm({
    // resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      await dispatch(register(values)).unwrap();
      navigate("/verify-otp");
    } catch (error) {
      console.log("faild to signup:", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <p className="text-center text-lg sm:text-xl font-bold">Create New Account</p>
        <FormField
          control={form.control}
          rules={{ required: "fullName is required" }}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  className="p-3 sm:p-4 md:p-5 text-sm sm:text-base"
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={{ required: "email id is required" }}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  className="p-3 sm:p-4 md:p-5 text-sm sm:text-base"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={
            {
              required: "password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
              },
            }
          }
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="p-3 sm:p-4 md:p-5 text-sm sm:text-base"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base" type="submit" disabled={auth.loading}>
          {auth.loading ? <Spinner className="size-8" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
