export interface GalleryItem {
  title: string;
  label: string;
  alt: string;
  image: string;
  layout: string;
  aspectRatio: string;
}

export const galleryItems: GalleryItem[] = [
  {
    title: "Community Welcome",
    label: "Onboarding",
    alt: "Stylized community welcome session inside a bright event space",
    image: "/gallery/community-welcome.svg",
    layout: "lg:col-span-3",
    aspectRatio: "aspect-[4/4.15]",
  },
  {
    title: "Hackathon Build Night",
    label: "HackFOSS",
    alt: "Stylized late-evening hackathon scene with glowing screens and collaborative teams",
    image: "/gallery/hackathon-build-night.svg",
    layout: "lg:col-span-5",
    aspectRatio: "aspect-[16/9]",
  },
  {
    title: "Open Source Meetup",
    label: "Community",
    alt: "Stylized meetup setup with a talk stage and audience",
    image: "/gallery/open-source-meetup.svg",
    layout: "lg:col-span-4",
    aspectRatio: "aspect-[4/3]",
  },
  {
    title: "Workshop Flow",
    label: "Learning",
    alt: "Stylized workshop area with tables, laptops, and movement through the venue",
    image: "/gallery/workshop-flow.svg",
    layout: "lg:col-span-5",
    aspectRatio: "aspect-[16/9]",
  },
  {
    title: "Speaker Session",
    label: "Talks",
    alt: "Stylized speaker session inside a warm interior venue",
    image: "/gallery/speaker-session.svg",
    layout: "lg:col-span-4",
    aspectRatio: "aspect-[4/3]",
  },
  {
    title: "Team Huddle",
    label: "Behind The Scenes",
    alt: "Stylized top-down team huddle scene arranged around a circular table",
    image: "/gallery/team-huddle.svg",
    layout: "lg:col-span-3",
    aspectRatio: "aspect-[4/4.15]",
  },
];
