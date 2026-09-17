import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual archive of the workshops, hackathons, talks, and community moments that make SLIIT FOSS what it is."
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader label="Captured Moments" title={metadata.title as string} subtitle={metadata.description as string} />
      <GalleryGrid />
    </>
  );
}
