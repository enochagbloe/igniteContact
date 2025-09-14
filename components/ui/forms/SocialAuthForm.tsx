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
        toast.success("Sign-in successful!");
        // Redirect to the desired URL after successful sign-in
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
    <div className="flex mt-4 w-full">
      <Button
        onClick={() => handleSignIn("google")}
        type="button"
        className="bg-black text-white dark:bg-white dark:text-black w-full h-10 gap-1.5"
      >
        <Image src="/icons/google.svg" alt="Google" height={23} width={23} />
        <span className="ml-2">Continue with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
