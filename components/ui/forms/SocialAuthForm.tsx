import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SocialAuthForm = () => {
  return (
    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between sm:items-center">
      <Button
        type="button"
        className="bg-black text-white dark:bg-white dark:text-black w-full sm:w-[220px] gap-1.5"
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
        type="button"
        className="bg-black text-white dark:bg-white dark:text-black w-full sm:w-[220px] gap-1.5"
      >
        <Image
          src="/icons/google.svg"
          alt="Google"
          height={23}
          width={23}
        />
        <span className="ml-2">Continue with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
