
import React from "react";
import DevotionCard from "@/components/devotions/DevotionCard";
import { devotions } from "@/components/devotions/mocks";
import { VerseOfTheDayCard } from "@/components/devotions/VerseOfTheDay";

export const metadata = {
  greeting: "Good morning!",
  name: "Samuel Hagan",
  title: "Daily Devotions",
  description: "Read and reflect on today’s devotion.",
};

export default async function DevotionsPage() {

    const {greeting, name } = metadata;
  return (
    <main className="flex flex-col gap-12">
      <header className="flex flex-col gap-2">
        <p>{greeting} {name}</p>
        <h1 className="text-2xl font-bold">Daily Devotions</h1>
        <p className="text-muted-foreground">
          Be encouraged and equipped each day in God’s Word.
        </p>
      </header>

      {/* Simple, non-interactive filters to start (wire up later) */}
      <div className="flex items-center gap-2">
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted">
          Today
        </button>
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted">
          This Week
        </button>
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted">
          All
        </button>
      </div>
      <div>
        <VerseOfTheDayCard />
      </div>
        {/* Map over devotions and render cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {devotions.map((d) => (
          <DevotionCard key={d.slug} devotion={d} />
        ))}
      </section>
    </main>
  );
}