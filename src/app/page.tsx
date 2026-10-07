import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { Ticker } from "@/components/home/ticker";
import { EventsStack } from "@/components/home/events-stack";
import { SectionDivider } from "@/components/layout/section-divider";
import { BlogPreview } from "@/components/home/blog-preview";
import { CTA } from "@/components/home/cta";
import { getMediumPosts } from "@/lib/medium";

export default async function Home() {
  const posts = await getMediumPosts();

  return (
    <>
      <Hero />
      <Manifesto />
      <Ticker />
      <EventsStack />
      <SectionDivider />
      <BlogPreview posts={posts} />
      <CTA />
    </>
  );
}
