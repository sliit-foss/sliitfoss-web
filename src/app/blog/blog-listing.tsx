"use client";

import { formatBlogDate } from "@/content/blog";
import { FadeUp } from "@/components/animations/fade-up";
import type { MediumPost } from "@/lib/medium";

export function BlogListing({ posts }: { posts: MediumPost[] }) {
  if (posts.length === 0) {
    return (
      <section className="py-12 pb-24 px-6 bg-[#fafafa]">
        <p className="max-w-5xl mx-auto text-center text-sm text-[#999]">
          We couldn&apos;t load our latest articles right now. Please check back soon or visit our Medium page.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <FadeUp key={post.id} delay={i * 0.08}>
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
                <article className="rounded-2xl overflow-hidden border border-black/4 bg-white transition-all duration-300 hover:border-black/8 hover:shadow-lg">
                  <div className="h-48 relative bg-linear-to-br from-indigo-100 to-indigo-300">
                    {post.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.thumbnail}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                    {post.tags[0] && (
                      <span className="absolute bottom-3 left-3 text-[0.6rem] font-semibold px-3 py-1.5 rounded-full bg-indigo-500 text-white uppercase tracking-wider">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-semibold tracking-[-0.3px] leading-snug mb-2 text-[#111] group-hover:text-[#999] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#999] mb-3 line-clamp-2">{post.description}</p>
                    <div className="text-[0.7rem] text-[#bbb]">
                      {post.author} · {post.readTime} · {formatBlogDate(post.date)}
                    </div>
                  </div>
                </article>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
