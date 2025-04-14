import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const SocialAuthForm = () => {
  return (
    <div className="flex justify-between mt-4">
      <Button className="w-[230px]">
        <Image
        src="/icons/github.svg"
        alt="Google"
        height={23}
        width={23}className=" invert light:invert-0"/>
        <span className="ml-2 ">Continue with github</span>
      </Button>
      <Button className="bg-black text-white dark:bg-white dark:text-black w-[230px]">
        <Image
        src="/icons/google.svg"
        alt="Google"
        height={23}
        width={23}/>
        <span className="ml-2">Continue with Google</span>
      </Button>
    </div>
  );
};
export default SocialAuthForm;
