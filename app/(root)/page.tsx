import React from "react";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
// Update the path below if your LocalSearch component is located elsewhere
import Localsearch from "../../components/Search/LocalSearch";
import HomeFilters from "../../components/filters/HomeFilters";
import QuestionCards from "../../components/cards/QuestionCards";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
// static data for the search to work
const questions = [
  {
    _id: "1",
    title: "What is Faith?",
    description: "What is Faith",
    tags: [
      { _id: "1", name: "bibltical" },
      { _id: "2", name: "faith" },
      { _id: "3", name: "suffering" },
    ],
    author: [
      {
        _id: "1",
        name: "John Doe",
        image:
          "https://img.freepik.com/free-photo/smiley-african-woman-with-golden-earrings_23-2148747979.jpg?semt=ais_items_boosted&w=740",
      },
    ],
    answers: 10,
    views: 50,
    upvotes: 5,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "Life of total surrender!!",
    description: "Life of total surrender",
    tags: [
      { _id: "1", name: "bibltical" },
      { _id: "2", name: "surrender" },
    ],
    author: [{ _id: "1", name: "Samuel Doe" }],
    answers: "1k",
    views: "19k",
    upvotes: "5k",
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "Is Jesus and the Holy Spirit Divine?",
    description: "holy spirit",
    tags: [
      { _id: "1", name: "holy spirit" },
      { _id: "2", name: "faith" },
      { _id: "3", name: "suffering" },
    ],
    author: [{ _id: "1", name: "John Doe" }],
    answers: "15k",
    views: "1.2M",
    upvotes: "120k",
    createdAt: new Date(),
  },
];
const test = async () => {
  try {
    await dbConnect();
  } catch (error) {
    return handleError(error);
  }
};
interface searchParams {
  searchParams: {
    [key: string]: string;
  };
}
const Home = async ({ searchParams }: searchParams) => {
  await test();
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchQuery && matchFilter;
  });
  return (
    <>
      <section className="flex-col-reverse flex gap-5 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <Button className="dark:bg-amber-500" asChild>
          <Link href={ROUTES.ASK_QUESTION}> Ask a question</Link>
        </Button>
      </section>
      <section className="mt-5">
        <Localsearch
          route="/"
          imgSrc={"/icons/search.svg"}
          otherClasses=""
          placeholder="Search"
        />
      </section>
      <section>
        <HomeFilters />
      </section>
      <div className="mt-5 flex flex-col gap-5 w-full">
        {filteredQuestions.map((question) => (
          <QuestionCards key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
