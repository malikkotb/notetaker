"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import pb from "../../app/(lib)/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "../../app/(hooks)/useLogout";
import useLogin from "../../app/(hooks)/useLogin";
import { Toaster, toast } from "sonner";
import useMyStore from "../../app/(store)/store";
import { GitHub } from "../icons/GitHub";
import { Spinner } from "../icons/Spinner";
import { RiGoogleLine } from "react-icons/ri";

export function UserAuthForm({ className, ...props }) {

  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <div className={cn("grid gap-6", className)} {...props}>
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
                {...register("email")}
              />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                disabled={isLoading}
                {...register("password")}
              />
            </div>
            {isError && (
              <p className="text-xs text-red-500">
                Invalid email or password. Error: {error.message}
              </p>
            )}
            <Button disabled={isLoading}>
              {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>
          </div>
        </form>

        

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
