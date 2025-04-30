"use client";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
        }

        // display the links with image and name
        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? "bg-amber-500 text-white"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            <Image src={item.imgURL} alt={item.label} width={20} height={20} />
            <p>{item.label}</p>
          </Link>
        );
        return LinkComponent;
      })}
    </>
  );
};

export default NavLinks;
