import ROUTES from "@/constants/routes";
import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

// define your props
interface Props {
  _id: number;
  tag: string;
  question: number;
  showCount?: boolean;
  compact?: boolean;
}
// destructure your props
// define your TagCards component
// this component will be used to display the tags in the right side bar
const TagCards = ({ _id, tag, question, showCount, compact }: Props) => {
  return (
    <Link
      href={ROUTES.TAG(String(_id))}
      className="flex items-center justify-between gap-2"
    >
      <Badge className="py-2 uppercase px-4 border-none rounded-[5px] h-[24px]">
        <div className="flex-center space-x-2 ">
          <span>{tag}</span>
        </div>
      </Badge>
      {showCount && <p className="">{question}</p>}
    </Link>
  );
};

export default TagCards;
