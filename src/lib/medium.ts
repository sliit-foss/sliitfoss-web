import { XMLParser } from "fast-xml-parser";

// Set MEDIUM_FEED_URL in .env.local to override the default feed
// e.g. https://medium.com/feed/sliit-foss  or  https://medium.com/feed/@username
const FEED_URL = process.env.MEDIUM_FEED_URL ?? "https://medium.com/feed/sliit-foss";

export interface MediumPost {
  id: string;
  title: string;
  link: string;
  date: string; // ISO string
  author: string;
  tags: string[];
  description: string;
  thumbnail: string | null;
  readTime: string;
}

interface FeedItem {
  "title"?: string;
  "link": string;
  "pubDate": string;
  "guid"?: string | { "#text"?: string };
  "category"?: string | string[];
  "dc:creator"?: string;
  "content:encoded"?: string;
}

const parser = new XMLParser({ ignoreAttributes: false });

const toArray = <T>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const stripTags = (html: string) =>
  decode(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

function getThumbnail(html: string): string | null {
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    if (!m[1].includes("/_/stat")) return m[1]; // skip Medium's tracking pixel
  }
  return null;
}

function getExcerpt(html: string): string {
  const withoutFigures = html.replace(/<figure[\s\S]*?<\/figure>/g, "");
  const firstPara = withoutFigures.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "";
  const text = stripTags(firstPara);
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

function getReadTime(html: string): string {
  const words = stripTags(html).split(" ").length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function getId(item: FeedItem): string {
  if (typeof item.guid === "string") return item.guid;
  return item.guid?.["#text"] ?? item.link;
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; sliitfoss-web)" }
    });
    if (!res.ok) throw new Error(`Medium feed responded with ${res.status}`);

    const xml = await res.text();
    const feed = parser.parse(xml);
    const items = toArray<FeedItem>(feed?.rss?.channel?.item);

    return items.map((item) => {
      const html = item["content:encoded"] ?? "";
      return {
        id: getId(item),
        title: decode(String(item.title ?? "")),
        link: String(item.link).split("?")[0],
        date: new Date(item.pubDate).toISOString(),
        author: String(item["dc:creator"] ?? "SLIIT FOSS"),
        tags: toArray<string>(item.category).map((t) => String(t).replace(/-/g, " ")),
        description: getExcerpt(html),
        thumbnail: getThumbnail(html),
        readTime: getReadTime(html)
      };
    });
  } catch (err) {
    console.error("Failed to load Medium posts:", err);
    return [];
  }
}
