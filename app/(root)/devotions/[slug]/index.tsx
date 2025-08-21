import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getDevotionBySlug } from "@/components/devotions/mocks";

type Params = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Params) {
  const devotion = getDevotionBySlug(params.slug);
  if (!devotion) return { title: "Devotion not found" };
  return {
    title: devotion.title,
    description: devotion.excerpt,
  };
}

export default function DevotionDetailPage({ params }: Params) {
  const devotion = getDevotionBySlug(params.slug);

  if (!devotion) {
    notFound();
  }

  const date = new Date(devotion!.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="prose max-w-3xl dark:prose-invert">
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">{devotion!.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{date}</span>
          <span>•</span>
          <Badge variant="secondary">{devotion!.scripture}</Badge>
          <span>•</span>
          <div className="flex items-center gap-2">
            {devotion!.author.avatarUrl ? (
              <Image
                src={devotion!.author.avatarUrl}
                alt={devotion!.author.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {devotion!.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span>{devotion!.author.name}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {devotion!.tags.map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
        </div>
      </header>

      <section className="text-base leading-7">
        <p>{devotion!.content ?? devotion!.excerpt}</p>
      </section>
    </article>
  );
}