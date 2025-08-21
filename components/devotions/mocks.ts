import { Devotion } from "@/types/globals";
import { VerseOfTheDay } from "@/types/globals";

export const devotions: Devotion[] = [
  {
    slug: "walking-in-the-light",
    title: "Walking in the Light",
    date: new Date().toISOString(),
    scripture: "1 John 1:7",
    excerpt:
      "We’re called to walk in the light, not in our own strength, but by the Spirit who leads us...",
    content:
      "If we walk in the light as He is in the light, we have fellowship with one another... [full devotion content placeholder]",
    tags: ["Fellowship", "Light", "Holiness"],
    author: {
      name: "Samuel Doe",
      avatarUrl:
        "https://img.freepik.com/free-photo/smiley-african-woman-with-golden-earrings_23-2148747979.jpg?w=256",
    },
  },
  {
    slug: "strength-made-perfect",
    title: "Strength Made Perfect",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    scripture: "2 Corinthians 12:9",
    excerpt:
      "God’s grace isn’t theoretical—it is sufficient, and His power is perfected in weakness...",
    content:
      "My grace is sufficient for you, for my power is made perfect in weakness... [full devotion content placeholder]",
    tags: ["Grace", "Weakness", "Power"],
    author: { name: "Mary Johnson" },
  },
];

export const verseOfTheDay: VerseOfTheDay = {
    title: "Verse of the Day",
    scripture: "Philippians 4:13",
    scriptureContent: "I can do all things through Christ who strengthens me.",
    imageUrl: "https://www.bible.com/_next/image?url=https%3A%2F%2Fimageproxy.youversionapi.com%2F640x640%2Fhttps%3A%2F%2Fs3.amazonaws.com%2Fstatic-youversionapi-com%2Fimages%2Fbase%2F78248%2F1280x1280.jpg&w=1920&q=75",
};

export function getDevotionBySlug(slug: string): Devotion | undefined {
  return devotions.find((d) => d.slug === slug);
}