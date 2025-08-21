import React from 'react'
import { VerseOfTheDay } from "@/types/globals";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Props = {
    verseOfTheDay?: VerseOfTheDay;
}

export const VerseOfTheDayCard = ({ verseOfTheDay }: Props) => {
  const v: VerseOfTheDay = verseOfTheDay ?? {
    title: "Verse of the Day",
    scripture: "Isaiah 60:1 (NIV)",
    scriptureContent: "“Arise, shine, for your light has come, and the glory of the LORD rises upon you.",
    imageUrl: "https://www.bible.com/_next/image?url=https%3A%2F%2Fimageproxy.youversionapi.com%2F640x640%2Fhttps%3A%2F%2Fs3.amazonaws.com%2Fstatic-youversionapi-com%2Fimages%2Fbase%2F78248%2F1280x1280.jpg&w=1920&q=75",
  };

  return (
    <div className='flex flex-row gap-4 border-lg rounded-lg p-4 bg-white dark:bg-black shadow-md outline-1'>
        {/* image */}
        <div>
            <Image
                src={v.imageUrl || "https://via.placeholder.com/800x400?text=Verse"}
                alt={v.title ? `Verse of the Day: ${v.title}` : "Verse of the Day"}
                className='w-full h-auto rounded-lg'
                width={200}
                height={200}
            />
        </div>
        {/* verse of the day */}
        <div className='flex flex-col justify-center gap-2'>
            <h2 className='text-lg font-bold'>{v.title}</h2>
            <p className='text-sm'>{v.scriptureContent}</p>
            <p className='text-sm'>{v.scripture}</p>
        </div>
        <div className='flex flex-row justify-center gap-2'>
            <Button variant="outline">Share</Button>
            <Button>Save</Button>
        </div>
    </div>
  )
}