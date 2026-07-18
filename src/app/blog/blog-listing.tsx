"use client";

import Link from "next/link";
import { blogPosts, formatBlogDate } from "@/content/blog";
import { FadeUp } from "@/components/animations/fade-up";

export function BlogListing() {
  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-2xl overflow-hidden border border-black/4 bg-white transition-all duration-300 hover:border-black/8 hover:shadow-lg">
                  <div className={`h-48 relative bg-gradient-to-br ${post.gradient}`}>
                    <span
                      className={`absolute bottom-3 left-3 text-[0.6rem] font-semibold px-3 py-1.5 rounded-full ${post.tagBg} uppercase tracking-wider`}
                    >
                      {post.tags[0]}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-semibold tracking-[-0.3px] leading-snug mb-2 text-[#111] group-hover:text-[#999] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#999] mb-3 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between text-[0.7rem] text-[#bbb]">
                      <span>
                        {post.readTime} · {formatBlogDate(post.date)}
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
