"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import NavLinks from "./NavLinks";

// Define ROUTES object
const ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  // Add other routes as needed
};

const MobileNavigations = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="">
        <Image
          src="/icons/hamburger.svg"
          alt="hamburger"
          width={26}
          height={26}
          className="invert dark:invert-0"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="hidden"> Navigation</SheetTitle>
        <Link href={"/"} className="gap-2 flex items-center mt-6 px-5">
          {/* Logo and Title */}
          <Image
            className="dark:invert"
            src="/images/c3-Photoroom.svg"
            alt="Logo"
            width={26}
            height={26}
          />
          <h1 className="sm:flex">Ignite City Church</h1>
        </Link>
        <div className="no-scrollbar flex flex-col gap-4 mt-6 h-full overflow-y-auto px-5">
          <SheetClose asChild className="flex flex-col gap-6 h-full mx-4 py-5">
            <NavLinks isMobileNav/>
          </SheetClose>
          <div className="flex flex-col gap-4 mt-auto mb-6  ">
          <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button variant="outline" className="w-full">
                  <span>Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button variant="outline" className="w-full">
                  <span className="text-amber-500">Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigations;
