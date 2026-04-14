import { PageHeader } from "@/components/layout/page-header";
import { aboutContent, siteConfig } from "@/content/site";
import { AboutContent } from "./about-content";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Who We Are"
        title="About SLIIT FOSS"
        subtitle={aboutContent.mission}
      />
      <AboutContent />
    </>
  );
}
