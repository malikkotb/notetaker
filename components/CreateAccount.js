"use client";
import { forwardRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import useCreateAcc from "@/app/(hooks)/useCreateAcc";
import { Spinner } from "./icons/Spinner";
import { toast, Toaster } from "sonner";

export default function CreateAccount() {
  const { mutate, isLoading, isError, error, isSuccess } = useCreateAcc();
  const { register, handleSubmit, reset, formState } = useForm();

  async function onSubmitCreateAccount(data) {
    mutate({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    }); 
    reset(); // reset form
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created!");
    } else if (isError) {
      toast.error("Account creation failed");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <form onSubmit={handleSubmit(onSubmitCreateAccount)}>
        <div className="grid gap-2">
          {/* Additional fields for account creation, e.g., confirm password, etc. */}
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email", { required: true })}
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              disabled={isLoading}
              {...register("password", { required: true, minLength: 5 })}
            />
            <Input
              id="confirmPassword"
              placeholder="Repeat Password"
              type="password"
              disabled={isLoading}
              {...register("passwordConfirm", { required: true, minLength: 5 })}
            />
          </div>
          {/* Display error message for account creation */}
          {isError && (
            <p className="text-xs text-red-500">
              Account creation failed. Error: {error.message}
            </p>
          )}
          <Button disabled={isLoading || !formState.isValid}>
            {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};
