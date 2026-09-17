import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { aboutContent } from "@/content/site";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.mission
};

export default function AboutPage() {
  return (
    <>
      <PageHeader label="Who We Are" title="About SLIIT FOSS" subtitle={aboutContent.mission} />
      <AboutContent />
    </>
  );
}
