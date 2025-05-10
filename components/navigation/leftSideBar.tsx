import React from "react";
import NavLinks from "./Nav/NavLinks";
import { Button } from "../ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Image from "next/image";

const LeftSideBar = () => {
  return (
    <aside>
      <div className="flex gap-2 items-center mt-6 px-2 sticky top-0 left-0 z-10 h-screen flex-col justify-between overflow-y-auto border-r py-5 pt-2 max-sm:hidden w-[64px] lg:w-[266px] transition-all duration-300">
        <div className="flex flex-col gap-4 w-full">
          <NavLinks />
        </div>
        <div className="flex-col w-full">
          <Button className="w-full min-h-[41px]" variant="outline" asChild>
            <Link href={ROUTES.SIGN_IN}>
              <span className="flex items-center justify-center gap-2">
                <Image
                  src={"/icons/account.svg"}
                  alt="Sign In"
                  width={20}
                  height={20}
                  className="invert dark:invert-0"
                />
                <span className="hidden lg:inline">Log in</span>
              </span>
            </Link>
          </Button>

          <Button
            className="w-full min-h-[41px] mt-2"
            variant="outline"
            asChild
          >
            <Link href={ROUTES.SIGN_UP}>
              <span className="hidden lg:inline">Sign up</span>
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
