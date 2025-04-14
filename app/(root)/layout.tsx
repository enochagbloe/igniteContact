import React, { ReactNode } from "react";
import NavBar from "@/navigations/Nav/Nav";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default RootLayout;
