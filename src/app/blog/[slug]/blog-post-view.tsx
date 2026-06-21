"use client";

import Link from "next/link";
import { BlogPost, formatBlogDate } from "@/content/blog";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";

const renderContent = (content: string) =>
  content
    .split("\n")
    .map((line) => line.trimEnd())
    .reduce<{ blocks: string[][]; current: string[] }>(
      (acc, line) => {
        if (line === "") {
          if (acc.current.length) {
            acc.blocks.push(acc.current);
            acc.current = [];
          }
          return acc;
        }
        acc.current.push(line);
        return acc;
      },
      { blocks: [], current: [] }
    );

export function BlogPostView({ post }: { post: BlogPost }) {
  const { blocks, current } = renderContent(post.content);
  if (current.length) blocks.push(current);

  return (
    <>
      <section className={`pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-gradient-to-br ${post.gradient}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[0.6rem] font-semibold px-3 py-1.5 rounded-full ${post.tagBg} uppercase tracking-wider`}
              >
                {tag}
              </span>
            ))}
          </div>
          <WordAnimate className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] text-[#111]">
            {post.title}
          </WordAnimate>
          <FadeUp delay={0.3}>
            <p className="mt-6 text-sm text-[#555]">
              {post.author} · {formatBlogDate(post.date)} · {post.readTime}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <p className="text-base text-[#555] leading-relaxed mb-12">{post.description}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <article className="space-y-6 text-[#333] leading-relaxed">
              {blocks.map((block, i) => {
                const first = block[0];
                if (first.startsWith("## ")) {
                  return (
                    <h2 key={i} className="font-heading text-2xl font-semibold text-[#111] mt-8">
                      {first.slice(3)}
                    </h2>
                  );
                }
                if (first.startsWith("### ")) {
                  return (
                    <h3 key={i} className="font-heading text-xl font-semibold text-[#111] mt-6">
                      {first.slice(4)}
                    </h3>
                  );
                }
                if (block.every((line) => /^\d+\.\s/.test(line))) {
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-2 text-sm">
                      {block.map((line, j) => (
                        <li key={j}>{line.replace(/^\d+\.\s/, "")}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.every((line) => line.startsWith("- "))) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-sm">
                      {block.map((line, j) => (
                        <li key={j}>{line.slice(2)}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-sm">
                    {block.join(" ")}
                  </p>
                );
              })}
            </article>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="text-center pt-12 mt-12 border-t border-black/[0.04]">
              <Link href="/blog" className="text-sm text-[#999] hover:underline">
                ← Back to all posts
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
