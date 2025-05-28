import React from "react";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
// Update the path below if your LocalSearch component is located elsewhere
import Localsearch from "../../components/Search/LocalSearch";
// static data for the search to work
const questions = [
  {
    _id: "1",
    title: "What is Faith",
    description: "What is Faith",
    tags: [
      { _id: "1", name: "bibltical" },
      { _id: "2", name: "faith" },
      { _id: "3", name: "suffering" },
    ],
    author: [{ _id: "1", name: "John Doe" }],
    answers: 10,
    views: 50,
    upvotes: 5,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "Life of total surrender",
    description: "Life of total surrender",
    tags: [
      { _id: "1", name: "bibltical" },
      { _id: "2", name: "surrender" },
    ],
    author: [{ _id: "1", name: "Samuel Doe" }],
    answers: 10,
    views: 50,
    upvotes: 5,
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "Are Jesus and the Holy Spirit Divine?",
    description: "holy spirit",
    tags: [
      { _id: "1", name: "holy spirit" },
      { _id: "2", name: "faith" },
      { _id: "3", name: "suffering" },
    ],
    author: [{ _id: "1", name: "John Doe" }],
    answers: 10,
    views: 50,
    upvotes: 5,
    createdAt: new Date(),
  },
];

interface searchParams {
  searchParams: {
    [key: string]: string;
  };
}
const Home = async ({ searchParams }: searchParams) => {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <section className="flex-col-reverse flex gap-5 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <Button asChild>
          <Link href={ROUTES.ASK_QUESTION}> Ask a question</Link>
        </Button>
      </section>
      <section>
        <Localsearch
          route="/"
          imgSrc={"/icons/search.svg"}
          otherClasses=""
          placeholder="Search"
        />
      </section>
      {filteredQuestions.map((question) => (
        <div key={question._id}>
          <p className="mt-3">{question.title}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
