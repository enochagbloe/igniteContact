"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";
import {toast} from "sonner";

const SocialAuthForm = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });

      if (result?.ok) {
        window.location.href = result.url || ROUTES.HOME;
      } else {
        toast.error("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error instanceof Error ? error.message : "Sign-in failed");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between sm:items-center">
      <Button
        onClick={() => handleSignIn("github")}
        type="button"
        className="bg-black text-white dark:bg-white dark:text-black w-full sm:w-[220px] h-10 gap-1.5"
      >
        <Image
          src="/icons/github.svg"
          alt="GitHub"
          height={23}
          width={23}
          className="dark:invert"
        />
        <span className="ml-2">Continue with GitHub</span>
      </Button>
      <Button
        onClick={() => handleSignIn("google")}
        type="button"
        className="bg-black text-white dark:bg-white dark:text-black w-full sm:w-[220px] h-10 gap-1.5"
      >
        <Image src="/icons/google.svg" alt="Google" height={23} width={23} />
        <span className="ml-2">Continue with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
