"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type VerseCardProps = {
  verse: string;
  reference: string;
  imageUrl: string;
  title: string;
};

const VerseOfTheDayCard = ({
  verse,
  reference,
  imageUrl,
  title,
}: VerseCardProps) => {
  return (
    <div className="flex justify-center h-screen">
      <Card className="max-w-[80vw] h-[500px] shadow-lg rounded-lg px-0 py-0">
        <CardContent className="grid grid-cols-5 py-0 px-0 h-full">
          {" "}
          <div className="col-span-2 h-full">
            {" "}
            <Image
              src={"/images/mt-image.jpg"}
              alt="verse"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-l-lg"
              priority
            />{" "}
          </div>
          <div className="col-span-3 justify-center flex flex-col px-3 py-3 gap-3 text-black dark:text-white" >
            <span>{title}</span>
            <span className="text-2xl font-bold ">{verse}</span>
            <span className="text-sm text-gray-500">{reference}</span> 
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerseOfTheDayCard;
