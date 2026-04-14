export interface Speaker {
  name: string;
  role: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
}

export interface Event {
  slug: string;
  name: string;
  date: string;
  endDate?: string;
  type: "hackathon" | "workshop" | "tech-talk" | "meetup";
  description: string;
  shortDescription: string;
  venue: string;
  speakers: Speaker[];
  schedule: ScheduleItem[];
  registrationUrl?: string;
  status: "upcoming" | "completed" | "cancelled";
  color: {
    bg: string;
    accent: string;
    borderHover: string;
    shape: string;
  };
}

export const events: Event[] = [
  {
    slug: "hackfoss-2026",
    name: "HackFOSS 2026",
    date: "2026-04-28",
    endDate: "2026-04-29",
    type: "hackathon",
    description:
      "HackFOSS is our flagship 24-hour open source hackathon. Teams of 3-5 build real projects that solve real problems — all open source, all shipped by the end. With 200+ participants, 30+ industry mentors, and prizes worth over LKR 500,000, this is the biggest student hackathon of the year.",
    shortDescription:
      "24-hour open source hackathon. Build real projects. Win real prizes. Ship real code. 200+ participants, 30+ mentors from industry.",
    venue: "SLIIT Main Auditorium, Malabe",
    speakers: [
      { name: "Dilshan Fernando", role: "Lead Organizer" },
      { name: "Kavitha Perera", role: "Industry Mentor, WSO2" },
      { name: "Ravindu Silva", role: "Industry Mentor, IFS" },
    ],
    schedule: [
      { time: "08:00", title: "Registration & Breakfast" },
      { time: "09:00", title: "Opening Ceremony" },
      { time: "10:00", title: "Hacking Begins" },
      { time: "13:00", title: "Lunch & Mentor Sessions" },
      { time: "18:00", title: "Dinner & Lightning Talks" },
      { time: "09:00", title: "Hacking Ends (Day 2)" },
      { time: "10:00", title: "Presentations & Judging" },
      { time: "12:00", title: "Awards Ceremony" },
    ],
    registrationUrl: "https://forms.google.com/hackfoss2026",
    status: "upcoming",
    color: {
      bg: "bg-gradient-to-br from-indigo-50 to-blue-100",
      accent: "text-indigo-600",
      borderHover: "hover:border-indigo-200",
      shape: "bg-indigo-200/40",
    },
  },
  {
    slug: "git-workshop",
    name: "Git & GitHub Workshop",
    date: "2026-05-12",
    type: "workshop",
    description:
      "A beginner-friendly, hands-on workshop covering everything from your first git init to your first merged pull request. You'll learn branching, merging, resolving conflicts, writing good commit messages, and contributing to open source projects on GitHub. Bring your laptop — we'll be coding together.",
    shortDescription:
      "From your first fork to your first pull request. Hands-on, guided, and beginner friendly. Open to everyone.",
    venue: "SLIIT Lab 3, Malabe",
    speakers: [
      { name: "Thisara Jayawardena", role: "Workshop Lead" },
      { name: "Sachini Dissanayake", role: "Assistant Lead" },
    ],
    schedule: [
      { time: "14:00", title: "Setup & Introduction" },
      { time: "14:30", title: "Git Basics: init, add, commit" },
      { time: "15:30", title: "Branching & Merging" },
      { time: "16:30", title: "Your First Pull Request" },
      { time: "17:30", title: "Q&A & Wrap Up" },
    ],
    registrationUrl: "https://forms.google.com/git-workshop",
    status: "upcoming",
    color: {
      bg: "bg-gradient-to-br from-teal-50 to-cyan-100",
      accent: "text-teal-600",
      borderHover: "hover:border-teal-200",
      shape: "bg-teal-200/40",
    },
  },
  {
    slug: "rust-beginners",
    name: "Rust for Beginners",
    date: "2026-05-26",
    type: "tech-talk",
    description:
      "Curious about Rust? This talk covers why Rust is taking over systems programming, its ownership model, and how to write your first Rust program. We'll walk through practical examples and show you how Rust prevents entire classes of bugs at compile time. No prior Rust experience needed — just curiosity.",
    shortDescription:
      "A gentle introduction to the language taking over systems programming. No prior Rust experience needed.",
    venue: "SLIIT Auditorium B, Malabe",
    speakers: [
      { name: "Naveen Bandara", role: "Speaker" },
    ],
    schedule: [
      { time: "16:00", title: "Why Rust?" },
      { time: "16:30", title: "Ownership & Borrowing" },
      { time: "17:00", title: "Live Coding: A CLI Tool" },
      { time: "17:30", title: "Q&A" },
    ],
    status: "upcoming",
    color: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-100",
      accent: "text-orange-600",
      borderHover: "hover:border-orange-200",
      shape: "bg-orange-200/40",
    },
  },
  {
    slug: "docker-101",
    name: "Docker 101",
    date: "2025-11-15",
    type: "workshop",
    description:
      "Hands-on introduction to Docker. Learn containerization, Dockerfiles, images, volumes, and docker-compose. By the end, you'll deploy a full-stack app in containers.",
    shortDescription: "Learn Docker from scratch. Containerize and deploy a full-stack app.",
    venue: "SLIIT Lab 2, Malabe",
    speakers: [
      { name: "Kavindu Ratnayake", role: "Workshop Lead" },
    ],
    schedule: [
      { time: "14:00", title: "What is Docker?" },
      { time: "14:45", title: "Your First Container" },
      { time: "15:45", title: "Docker Compose" },
      { time: "16:30", title: "Deploying a Full-Stack App" },
    ],
    status: "completed",
    color: {
      bg: "bg-gradient-to-br from-blue-50 to-sky-100",
      accent: "text-blue-600",
      borderHover: "hover:border-blue-200",
      shape: "bg-blue-200/40",
    },
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents() {
  return events.filter((e) => e.status === "upcoming");
}

export function getCompletedEvents() {
  return events.filter((e) => e.status === "completed");
}

export function formatEventDate(date: string, endDate?: string) {
  const d = new Date(date);
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  if (endDate) {
    const end = new Date(endDate);
    return `${d.toLocaleDateString("en-US", { month: "long", day: "numeric" })} — ${end.toLocaleDateString("en-US", opts)}`;
  }
  return d.toLocaleDateString("en-US", opts);
}

export function eventTypeLabel(type: Event["type"]) {
  const labels: Record<Event["type"], string> = {
    hackathon: "Hackathon",
    workshop: "Workshop",
    "tech-talk": "Tech Talk",
    meetup: "Meetup",
  };
  return labels[type];
}
