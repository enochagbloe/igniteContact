import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Devotion } from "@/types/globals";

type Props = {
  devotion: Devotion;
  
};

export default function DevotionCard({ devotion }: Props) {
  const date = new Date(devotion.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group rounded-lg border p-5 hover:shadow-dark-200 transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          {devotion.author.avatarUrl ? (
            <Image
              src={devotion.author.avatarUrl}
              alt={devotion.author.name}
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              {devotion.author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link href={`/devotions/${devotion.slug}`}>
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug group-hover:underline">
              {devotion.title}
            </h3>
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{date}</span>
            <span>•</span>
            <Badge variant="secondary">{devotion.scripture}</Badge>
          </div>

          <p className="mt-3 line-clamp-3 text-sm text-foreground/80">
            {devotion.excerpt}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {devotion.tags.map((t) => (
              <Badge key={t} variant="outline">
                #{t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}