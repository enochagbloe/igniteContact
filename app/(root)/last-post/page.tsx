"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import TagCards from "@/components/cards/TagCards";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LastPost {
  _id: string;
  title: string;
  content: string;
  tags: Array<{ _id: string; name: string }>;
  author: { _id: string; name: string; username: string };
  createdAt: string;
  views: number;
  upvotes: number;
  answers: number;
}

const LastPostPage = () => {
  const { data: session, status } = useSession();
  const [lastPost, setLastPost] = useState<LastPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastPost = async () => {
      if (status === "loading") return;
      
      if (!session) {
        setError("Please sign in to view your last post");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/user/last-post");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch last post");
        }

        setLastPost(data.lastPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLastPost();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg">Loading your last post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-red-500 text-lg">{error}</div>
        {!session && (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    );
  }

  if (!lastPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-lg">You haven&apos;t made any posts yet.</div>
        <Link href="/ask-question">
          <Button>Ask Your First Question</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Last Check Post</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s your most recent question/post
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            <Link 
              href={ROUTES.QUESTION(lastPost._id)}
              className="hover:text-blue-600 transition-colors"
            >
              {lastPost.title}
            </Link>
          </CardTitle>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Posted {getTimeStamp(new Date(lastPost.createdAt))}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: lastPost.content.substring(0, 300) + 
                        (lastPost.content.length > 300 ? "..." : "")
              }}
            />
          </div>

          {lastPost.tags && lastPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {lastPost.tags.map((tag) => (
                <TagCards
                  key={tag._id}
                  _id={tag._id}
                  name={tag.name}
                  compact
                  question={0}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex gap-4">
              <span>{lastPost.views} views</span>
              <span>{lastPost.upvotes} upvotes</span>
              <span>{lastPost.answers} answers</span>
            </div>
            
            <Link href={ROUTES.QUESTION(lastPost._id)}>
              <Button variant="outline" size="sm">
                View Full Post
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Link href="/ask-question">
          <Button>Ask Another Question</Button>
        </Link>
        <Link href="/profile">
          <Button variant="outline">View Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default LastPostPage;