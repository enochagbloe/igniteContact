import React from "react";
import VerseOfTheDayCard from "./VerseOfTheDaycard";
import PlansCard from "./PlansCard";

const Devotions = () => {
  const title = "Verse of the Day";
  const verse = "For I know the plans I have for you, declares the Lord."; // Example verse
  const reference = "Jeremiah 29:11"; // Example reference
  // const imageUrl = ""; // Example image URL

  return (
    <>
      <div>
        <VerseOfTheDayCard
          title={title}
          verse={verse}
          reference={reference}
          //imageUrl={imageUrl}
        />
      </div>
      <div className="flex justify-center h-screen">
        <PlansCard />
      </div>
    </>
  );
};

export default Devotions;
