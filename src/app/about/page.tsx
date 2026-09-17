import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { aboutContent } from "@/content/site";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About SLIIT FOSS",
  description: aboutContent.mission
};

export default function AboutPage() {
  return (
    <>
      <PageHeader label="Who We Are" title={metadata.title as string} subtitle={aboutContent.mission} />
      <AboutContent />
    </>
  );
}
