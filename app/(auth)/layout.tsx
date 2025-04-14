import Image from "next/image";
import React, { ReactNode } from "react";
import SocialAuthForm from "@/components/ui/forms/SocialAuthForm";
const Authlayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="flex flex-col justify-between min-w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 sm:min-w-[540px] sm:px-8">
        <div className="flex text-2xl font-bold text-gray-900 dark:text-white items-center">
          <h1>Join the c3s</h1>
          <div className="flex flex-1 items-center justify-end">
            <Image
              src="/images/c3-Photoroom.svg"
              alt="Logo"
              width={60}
              height={60}
              className="object-contain light:invert-0 dark:invert"
            />
          </div>
        </div>
        <p className="font-light text-[1rem]">
          to experience the body of Christ{" "}
        </p>

        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default Authlayout;
