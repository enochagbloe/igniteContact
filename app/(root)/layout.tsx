import React, { ReactNode } from "react";
import NavBar from "@/components/navigation/Nav/Nav";
import LeftSideBar from "@/components/navigation/leftSideBar";
import RightSideBar from "@/components/navigation/RightSideBar";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex-1 min-h-full flex flex-col pb-6 pt-12 max-md:pb-14 sm:pb-14 bg-white dark:bg-black">
          <div className="w-full max-w-5xl mx-auto px-6 bg-white dark:bg-black">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default RootLayout;
