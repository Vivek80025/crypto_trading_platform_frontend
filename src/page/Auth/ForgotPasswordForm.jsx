import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "@/State/Auth/AuthSlice";
import { Spinner } from "@/components/ui/spinner";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const form = useForm({
    // resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    try {
      await dispatch(forgotPassword(values.email)).unwrap();
      navigate("/reset-password");
    } catch (error) {
      console.log("faild to forgot password...");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <p className="text-center text-lg sm:text-xl font-bold">
          Where do you want to get the code ?
        </p>
        <FormField
          control={form.control}
          rules={{required: "email id is required"}}
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

        <Button className="w-full p-3 sm:p-4 md:p-5 text-sm sm:text-base" type="submit" disabled={auth.loading}>
          {auth.loading ? <Spinner className="size-8" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
