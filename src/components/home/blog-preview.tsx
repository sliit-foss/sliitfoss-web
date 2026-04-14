"use client";

import Link from "next/link";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";
import { blogPosts, formatBlogDate } from "@/content/blog";

const posts = blogPosts.slice(0, 3);

export function BlogPreview() {
  return (
    <section className="py-20 md:py-32 px-6 bg-white text-[#111]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-20">
          <div className="font-mono text-[0.65rem] text-[#999] uppercase tracking-wider mb-4">
            From the Blog
          </div>
          <WordAnimate className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] uppercase text-[#111]">
            Latest Posts
          </WordAnimate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="relative rounded-2xl overflow-hidden border border-black/[0.06] bg-[#fafafa] transition-all duration-500 hover:border-black/12 hover:shadow-lg">
                  <div className={`h-48 md:h-56 relative bg-gradient-to-br ${post.gradient}`}>
                    <span className={`absolute bottom-4 left-4 text-[0.65rem] font-semibold px-3 py-1.5 rounded-full ${post.tagBg} uppercase tracking-wider`}>
                      {post.tags[0]}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold tracking-[-0.5px] leading-snug mb-3 text-[#111] group-hover:text-[#999] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-[0.75rem] text-[#999]">
                      <span>{post.readTime} · {formatBlogDate(post.date)}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-[#999]">
                        Read →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
