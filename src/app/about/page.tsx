import { PageHeader } from "@/components/layout/page-header";
import { aboutContent } from "@/content/site";
import { AboutContent } from "./about-content";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Who We Are"
        title="About SLIIT FOSS Club"
        subtitle={aboutContent.mission}
      />
      <AboutContent />
    </>
  );
}
