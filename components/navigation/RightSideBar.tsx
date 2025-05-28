import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import TagCards from "../cards/TagCards";
import Image from "next/image";

// define you hot questions
const hotQuestions = [
  { _id: 1, question: "What is salvation?" },
  { _id: 2, question: "What is Sin?" },
  { _id: 3, question: "How do I reconcile faith with science? " },
  { _id: 4, question: "What is the meaning of Total surrender?" },
  { _id: 5, question: "Why does God allow suffering?" },
];
// define your popular tags
const popularTags = [
  { _id: 1, tag: "Faith", question: 400 },
  { _id: 2, tag: "Science", question: 100 },
  { _id: 3, tag: "Salvation", question: 500 },
  { _id: 4, tag: "Suffering", question: 200 },
  { _id: 5, tag: "Sin", question: 300 },
];

// define the right side bar component
const RightSideBar = () => {
  return (
    <section className="sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 border-l p-6 pt-6 max-xl:hidden">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Hot Questions</h2>
        <div className="flex flex-col gap-4">
          {hotQuestions.map(({ _id, question }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(String(_id))}
              className="flex items-center justify-between rounded-lg overflow-hidden"
            >
              <p className="text-sm font-medium">{question}</p>

              <Image
                src={"./icons/chevron-right.svg"}
                alt="chevron"
                height={20}
                width={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <span>
            <h3 className="text-lg font-semibold mb-3">Popular Tags</h3>
            <div className="flex flex-col gap-4">
              {popularTags.map(({ _id, tag, question }) => (
                <TagCards
                  key={_id}
                  _id={_id}
                  tag={tag}
                  question={question}
                  showCount
                  compact
                />
              ))}
            </div>
          </span>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
