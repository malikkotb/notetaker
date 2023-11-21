"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useLogout from "../../app/(hooks)/useLogout";
import useLogin from "../../app/(hooks)/useLogin";
import { Toaster, toast } from "sonner";
import useMyStore from "../../app/(store)/store";
import { GitHub } from "../icons/GitHub";
import { Spinner } from "../icons/Spinner";
import { RiGoogleLine } from "react-icons/ri";
import { CreateAccount } from "../CreateAccount";

export function UserAuthForm({ className, create, ...props }) {
  const logout = useLogout();
  const { mutate, isLoading, isError, error, isSuccess } = useLogin();
  const { register, handleSubmit, reset, formState } = useForm();
  const { authenticated, toggleAuthenticated } = useMyStore();

  useEffect(() => {
    if (isSuccess) {
      toggleAuthenticated();
    } else if (isError) {
      toast.error("Login failed");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side code here
      logout();
      console.log("logout on Mount");
    }
  }, []);


  // const isLoggedIn = pb.authStore.isValid;

  async function onSubmit(data) {
    mutate({ email: data.email, password: data.password }); // mutate is basically the login function in the useLogin hook
    reset(); // reset form
  }

  // There is an error (hydration error) if you login successfully and then refresh the page
  // this occurs because you will be still logged in in the backend
  // but the jsx that is rendered is the one for when the user is not logged in

  // Initial State on the Server: If you're fetching data during the initial rendering, make
  // sure that the server sends the same data that the client expects.
  // Mismatched data can cause hydration issues.

  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <div className={cn("grid gap-6", className)} {...props}>

        {create ? (
          <CreateAccount />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
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
                  {...register("password", { required: true })}
                />
              </div>
              {isError && (
                <p className="text-xs text-red-500">
                  Invalid email or password. Error: {error.message}
                </p>
              )}
              <Button disabled={isLoading || !formState.isValid}>
                {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
                Sign In with Email
              </Button>
            </div>
          </form>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-2">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GitHub className="mr-2 h-4 w-4" />
            )}
            Github
          </Button>

          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RiGoogleLine className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
        </div>
      </div>
    </div>
  );
}
