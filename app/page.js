"use client"
import { PiNotebookLight } from "react-icons/pi";
import Link from "next/link";
import { UserAuthForm } from "../components/User-Auth-Form"
import { ModeToggle } from "../components/ModeToggle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../components/ui/button";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function AuthenticationPage() {

  const [create, setCreate] = useState(true)

  return (
    <>
      <div className={`${inter.className} bg-white dark:bg-black container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0`}>
        <div className="absolute flex right-4 gap-1 top-4 md:right-8 md:top-8">
          <Link
            href=""
            onClick={() => setCreate(!create)}
            className={cn(
              buttonVariants({ variant: "ghost" })
              // "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            {create ? "Login" : "Create an account"}
          </Link>
          <ModeToggle />
        </div>
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("pexels_bg.jpg")', backgroundSize: 'cover', backgroundPosition: '50% 0%' }} />
          <div className="relative z-20 gap-2 flex items-center text-lg font-medium">
            <PiNotebookLight />
            NoteTaker
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;NoteTaker has transformed the way I organize my thoughts,
                making note-taking effortlessly intuitive and incredibly
                efficient. The perfect companion for staying organized and
                boosting productivity!&rdquo;
              </p>
              <footer className="text-sm">Noah Selim</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {create ? "Create an account" : "Login"}
              </h1>
              <p className="text-sm text-zinc-400">
                Enter your details below to {create ? "create an account" : "login"}
              </p>
            </div>
            <UserAuthForm create={create} />
            <p className="px-8 text-center text-sm text-zinc-400">
              By clicking continue, you agree to our{" "}
              <span
                href=""
                className="underline underline-offset-4 hover:text-zinc-600"
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                href=""
                className="underline underline-offset-4 hover:text-zinc-600"
              >
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
