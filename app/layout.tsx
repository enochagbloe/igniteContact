import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { auth }  from '@/auth';

export const metadata: Metadata = {
  title: "C3 contact",
  description: "C3 Ignite Church Save Contact ......",
};

const RootLayout =  async ({children} : {children:ReactNode}) => {

  const session = await auth()
  return (
    <html lang="en" suppressContentEditableWarning>
      <SessionProvider session ={session}>
      <body className="antialiased">
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
        {children}
        </ThemeProvider>
        <Toaster/>
      </body>
      </SessionProvider>
    </html>
  );
}
export default RootLayout
