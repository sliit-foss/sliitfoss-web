import { PageHeader } from "@/components/layout/page-header";
import { BlogListing } from "./blog-listing";

export default function BlogPage() {
  return (
    <>
      <PageHeader
        label="From the Blog"
        title="Blog"
        subtitle="Tutorials, insights, and stories from the SLIIT FOSS community."
      />
      <BlogListing />
    </>
  );
}
