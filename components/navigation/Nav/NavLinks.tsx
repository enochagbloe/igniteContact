"use client";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SheetClose } from "../../ui/sheet";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const path = usePathname();
  const userId = 1;
  return (
    <>
      {/* A new Function Block to check which link is active when clicked */}
      {sidebarLinks.map((item) => {
        const isActive =
          path.includes(item.route) &&
          item.route.length > 1 &&
          path === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        // display the links with image and name
        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? "bg-amber-500 text-white"
                : "hover:bg-amber-500 hover:text-black text-black dark:text-white",
              "flex gap-2 rounded-2xl items-center px-6 p-4 transition-colors duration-200"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(
                !isActive ? "invert dark:invert-1" : "dark:invert-0 "
              )}
            />
            <p
              className={cn(
                isActive ? "font-bold" : "font-medium",
                "hidden lg:inline" // only show text label from large screen and above
              )}
            >
              {item.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
