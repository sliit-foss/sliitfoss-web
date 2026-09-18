import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { BlogListing } from "./blog-listing";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tutorials, insights, and stories from the SLIIT FOSS community."
};

export default function BlogPage() {
  return (
    <>
      <PageHeader label="From the Blog" title={metadata.title as string} subtitle={metadata.description as string} />
      <BlogListing />
    </>
  );
}
