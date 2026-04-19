import { PageHeader } from "@/components/layout/page-header";
import { GalleryGrid } from "./gallery-grid";

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        label="Captured Moments"
        title="Gallery"
        subtitle="A visual archive of the workshops, hackathons, talks, and community moments that make SLIIT FOSS what it is."
      />
      <GalleryGrid />
    </>
  );
}
