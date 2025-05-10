import React, { ReactNode } from "react";
import NavBar from "@/components/navigation/Nav/Nav";
import LeftSideBar from "@/components/navigation/leftSideBar";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex-1 min-h-full flex flex-col pb-6 pt-36 max-md:pb-14 sm:pb-14 ">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
