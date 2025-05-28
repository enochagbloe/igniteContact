import React from "react";
import { CardPlans } from ".";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const PlansCard = () => {
  const topItems = CardPlans.slice(0, 3);
  const middleItems = CardPlans.slice(3, 6);
  const bottomItems = CardPlans.slice(6, 9);
  return (
    <>
      <div className="flex flex-col items-center px-4">
        <div className="flex items-center flex-col w-full max-w-[1280px] text-center">
          <h2 className="text-2xl font-bold">
            Free reading plans and devotionals
          </h2>
          <p>
            Bible Plans help you engage with God&apos;s Word every day, a little
            at a time.
          </p>
        </div>

        {/* top cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8 w-full max-w-[1280px]">
          {topItems.map((item, index) => (
            <Card key={index} className="p-0">
              <Image
                src={"/images/mt-image.jpg"}
                alt="image"
                width={500}
                height={300}
                className="w-full h-auto aspect-[16/9] object-cover rounded-t-lg"
                priority
              />
              <div className="pl-3 pt-2">
                <CardTitle>{item.label}</CardTitle>
                <CardContent className="p-0 pt-2">{item.day}</CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* middle cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8 w-full max-w-[1280px]">
          {middleItems.map((item, index) => (
            <Card key={index} className="p-0">
              <Image
                src={"/images/mt-image.jpg"}
                alt="image"
                width={500}
                height={300}
                className="w-full h-auto aspect-[16/9] object-cover rounded-t-lg"
                priority
              />
              <div className="pl-3 pt-2">
                <CardTitle>{item.label}</CardTitle>
                <CardContent className="p-0 pt-2">{item.day}</CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* bottom cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8 w-full max-w-[1280px]">
          {bottomItems.map((item, index) => (
            <Card key={index} className="p-0">
              <Image
                src={"/images/mt-image.jpg"}
                alt="image"
                width={500}
                height={300}
                className="w-full h-auto aspect-[16/9] object-cover rounded-t-lg"
                priority
              />
              <div className="pl-3 pt-2">
                <CardTitle>{item.label}</CardTitle>
                <CardContent className="p-0 pt-2">{item.day}</CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
export default PlansCard;
