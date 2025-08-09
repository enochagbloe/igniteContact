import TagCards from "@/components/cards/TagCards";
import Metrics from "@/components/Metrics";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { Question, Tag } from "@/types/globals";
import Link from "next/link";
import React from "react";

interface Prop {
  question: Question;
}
const QuestionCards = ({
  question: { _id, title, tags, answers, author, createdAt, upvotes, views },
}: Prop) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 gap-5 mt-3 bg-[#f4f4f4] dark:bg-[#0f1115] shadow">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row-reverse">
        <span className="subtitle-regular flex sm:hidden">
          {getTimeStamp(createdAt)}
        </span>
        <Link href={ROUTES.QUESTION(_id.toString())} />
        <h3 className="sm:font-bold text-[26px] base-semibold line-clamp-1 flex-1">
          {title}
        </h3>
      </div>
      <div className="w-full flex gap-2 flex-wrap">
        {tags.map((tag: Tag) => (
          <TagCards key={tag._id} _id={tag._id} name={tag.name} compact question={0} />
        ))}
      </div>
      {/* Metric for the author */}
      <div className="flex items-center justify-between mt-5">
        <Metrics
          ImgUrl={author.image as string}
          alt={author.value}
          value={author.name}
          title={`asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(String(author._id))}
          textSyles="body-medium text-black dark:text-white"
          isAuthor
        />
        <div className="flex gap-6 mt-5">
          {/* Metric for the likes */}
          <Metrics
            ImgUrl="./icons/like.svg"
            alt="like"
            value={upvotes.toString()}
            title="vote"
            textSyles="body-medium text-black dark:text-white"
          />

          {/* Metric for the views */}
          <Metrics
            ImgUrl="./icons/eye.svg"
            alt="view"
            value={views.toString()}
            title="view"
            textSyles="body-medium text-black dark:text-white"
          />

          {/* Metric for the answers */}
          <Metrics
            ImgUrl="./icons/message.svg"
            alt="answer"
            value={answers.toString()}
            title="answer"
            textSyles="body-medium text-black dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};
export default QuestionCards;
