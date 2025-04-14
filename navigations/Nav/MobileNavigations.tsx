"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
  
const MobileNavigations = () => {
  return (
    <Sheet>
  <SheetTrigger  asChild className=''> 
    <Image 
    src="/icons/hamburger.svg"
    alt="hamburger"
    width={26}
    height={26}
    className="invert dark:invert-0"
    />
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

  )
}

export default MobileNavigations