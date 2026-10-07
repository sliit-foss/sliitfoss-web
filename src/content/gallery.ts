export interface GalleryItem {
  title: string;
  label: string;
  alt: string;
  image: string;
  layout: string;
  aspectRatio: string;
  unoptimized?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    title: "Bashaway Photo Booth",
    label: "Bashaway",
    alt: "Group of smiling participants posing inside a photo frame at Bashaway, the inter-university scripting competition",
    image: "/gallery/bashaway-photo-booth.webp",
    layout: "lg:col-span-3",
    aspectRatio: "aspect-[4/4.15]"
  },
  {
    title: "Bashaway 2025",
    label: "Bashaway",
    alt: "Organizers and participants gathered for a group photo behind the Bashaway sign",
    image: "/gallery/bashaway-2025-group.webp",
    layout: "lg:col-span-5",
    aspectRatio: "aspect-[16/9]"
  },
  {
    title: "Speaker Session",
    label: "Talks",
    alt: "Speaker presenting at a podium to a seated audience in a colorful, modern venue",
    image: "/gallery/speaker-session.webp",
    layout: "lg:col-span-4",
    aspectRatio: "aspect-[4/3]"
  },
  {
    title: "SLIIT Buildathon 2026",
    label: "Buildathon",
    alt: "Large group photo of SLIIT Buildathon 2026 participants standing in front of a lecture hall",
    image: "/gallery/buildathon-2026-group.webp",
    layout: "lg:col-span-12",
    aspectRatio: "aspect-[21/8]",
    unoptimized: true
  },
  {
    title: "Buildathon Workshop",
    label: "Learning",
    alt: "Students working on laptops while a presentation is shown on a projector screen at SLIIT Buildathon 2026",
    image: "/gallery/buildathon-workshop.webp",
    layout: "lg:col-span-3",
    aspectRatio: "aspect-[4/4.15]"
  },
  {
    title: "Meet the Team",
    label: "Behind The Scenes",
    alt: "Seven SLIIT FOSS Community team members in black shirts smiling together in front of a projector screen",
    image: "/gallery/foss-team.webp",
    layout: "lg:col-span-6",
    aspectRatio: "aspect-[3/2]"
  },
  {
    title: "Bashaway Team Frame",
    label: "Bashaway",
    alt: "Five Bashaway organizers smiling and posing together inside a large social media photo frame",
    image: "/gallery/bashaway-photo-booth-2.webp",
    layout: "lg:col-span-3",
    aspectRatio: "aspect-[4/4.15]"
  }
];
