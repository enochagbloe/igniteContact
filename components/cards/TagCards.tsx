import ROUTES from "@/constants/routes";
import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";

// define your props
interface Props {
  _id: string;
  name: string;
  question: number;
  showCount?: boolean;
  compact?: boolean;
  isButton?: boolean;
  remove?: boolean;
  handleRemoveTag?: () => void;
}
// destructure your props
// define your TagCards component
// this component will be used to display the tags in the right side bar
const TagCards = ({
  _id,
  name,
  question,
  showCount,
  isButton,
  compact,
  remove,
  handleRemoveTag,
}: Props) => {
  const content = (
    <>
      <Badge className="py-2 uppercase px-4 border-none rounded-[5px] h-[24px]">
        <div className="flex-center space-x-2 ">
          <span>{name}</span>
        </div>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="close"
            width={20}
            height={20}
            className="invert dark:invert-0"
            onClick={handleRemoveTag}
          />
        )}
      </Badge>
    </>
  );
  if (compact) {
    return isButton ? (
      <div>
        <button>{content}</button>
      </div>
    ) : (
        <Link
        href={ROUTES.TAG(_id)}
        className="flex items-center justify-between gap-2"
      >
        {content}
        {showCount && <p className="">{question}</p>}
      </Link>
    );
  }
};

export default TagCards;
