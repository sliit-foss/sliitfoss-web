"use client";

import Link from "next/link";
import { BlogPost, formatBlogDate } from "@/content/blog";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";

const renderInline = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="bg-black/5 px-1.5 py-0.5 rounded text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

const renderContent = (content: string) => {
  const lines = content.split("\n").map((line) => line.trimEnd());
  const blocks: { type: "text" | "code"; lines: string[]; lang?: string }[] = [];
  let current: string[] = [];
  let inCode = false;
  let codeLang = "";
  let codeLines: string[] = [];

  const flushText = () => {
    if (current.length) {
      blocks.push({ type: "text", lines: current });
      current = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (!inCode) {
        flushText();
        inCode = true;
        codeLang = line.trim().slice(3).trim();
        codeLines = [];
      } else {
        blocks.push({ type: "code", lines: codeLines, lang: codeLang });
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (line === "") {
      flushText();
      continue;
    }
    current.push(line);
  }
  flushText();
  return blocks;
};

export function BlogPostView({ post }: { post: BlogPost }) {
  const blocks = renderContent(post.content);

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
              {blocks.map((b, i) => {
                if (b.type === "code") {
                  return (
                    <pre key={i} className="bg-[#111] text-[#e5e5e5] text-sm rounded-lg p-4 overflow-x-auto">
                      <code>{b.lines.join("\n")}</code>
                    </pre>
                  );
                }

                const block = b.lines;
                const first = block[0];
                if (first.startsWith("## ")) {
                  return (
                    <h2 key={i} className="font-heading text-2xl font-semibold text-[#111] mt-8">
                      {renderInline(first.slice(3))}
                    </h2>
                  );
                }
                if (first.startsWith("### ")) {
                  return (
                    <h3 key={i} className="font-heading text-xl font-semibold text-[#111] mt-6">
                      {renderInline(first.slice(4))}
                    </h3>
                  );
                }
                if (block.every((line) => /^\d+\.\s/.test(line))) {
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-2 text-sm">
                      {block.map((line, j) => (
                        <li key={j}>{renderInline(line.replace(/^\d+\.\s/, ""))}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.every((line) => line.startsWith("- "))) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-sm">
                      {block.map((line, j) => (
                        <li key={j}>{renderInline(line.slice(2))}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-sm">
                    {renderInline(block.join(" "))}
                  </p>
                );
              })}
            </article>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="text-center pt-12 mt-12 border-t border-black/4">
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
