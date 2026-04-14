import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";
import { BlogPostView } from "./blog-post-view";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
