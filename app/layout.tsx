import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { auth }  from '@/auth'; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "C3 contact",
  description: "C3 Ignite Church Save Contact ......",
};

const RootLayout =  async ({children} : {children:ReactNode}) => {

  const session = await auth()
  return (
    <html lang="en" suppressContentEditableWarning>
      <SessionProvider session ={session}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
