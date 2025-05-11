"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SheetClose } from "../../ui/sheet";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const path = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          path.includes(item.route) &&
          item.route.length > 1 &&
          path === item.route;

        const route = item.route === "/profile" && userId
          ? `${item.route}/${userId}`
          : item.route;

        const linkContent = (
          <Link
            href={route}
            key={item.label}
            className={cn(
              isActive
                ? "bg-amber-500 text-white"
                : "hover:bg-amber-500 hover:text-black text-black dark:text-white",
              "flex gap-2 items-center rounded-2xl px-6 p-4 transition-colors duration-200"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(
                !isActive ? "invert dark:invert-1" : "dark:invert-0"
              )}
            />
            <span
              className={cn(
                "text-sm",
                isActive ? "font-bold" : "font-medium",
                isMobileNav ? "inline" : "hidden lg:inline"
              )}
            >
              {item.label}
            </span>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={route}>
            {linkContent}
          </SheetClose>
        ) : (
          <React.Fragment key={route}>{linkContent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
// This component is used to display the navigation links in the sidebar
// and in the mobile navigation menu. It uses the usePathname hook from next/navigation