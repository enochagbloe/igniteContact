import Link from "next/link";
import React from "react";
import Image from "next/image";
import Theming from "./theme";
import MobileNavigations from "./MobileNavigations";
const NavBar = () => {
  return (
      <nav className="flex justify-between items-center p-4 m-3 shadow-md rounded-lg bg-white dark:bg-black sticky top-0 z-10">
        <Link href={"/"} className="gap-2 flex items-center">
          <Image
            className="dark:invert"
            src="/images/c3-Photoroom.svg"
            alt="Logo"
            width={26}
            height={26}
          />
          <h1 className="hidden sm:flex">Ignite City Church</h1>
        </Link>
        <h1 className="flex flex-1 justify-center"> Search Contact </h1>
        <div>
          <Theming />
        </div>
        <div>
          <MobileNavigations />
        </div>
      </nav>

  );
};

export default NavBar;
