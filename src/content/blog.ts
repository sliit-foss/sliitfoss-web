export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  readTime: string;
  gradient: string;
  tagBg: string;
  content: string; // Markdown content — will be replaced by MDX later
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cli-in-rust",
    title: "Why We Rewrote Our CLI in Rust",
    date: "2026-04-05",
    author: "Naveen Bandara",
    tags: ["rust", "cli", "open-source"],
    description:
      "Our Node.js CLI was slow and memory-hungry. Here's why we rewrote it in Rust, the challenges we faced, and the results.",
    readTime: "8 min read",
    gradient: "from-indigo-100 to-indigo-300",
    tagBg: "bg-indigo-500 text-white",
    content: `
## The Problem

Our community CLI tool — used for scaffolding projects and managing contributions — was written in Node.js. It worked, but it was slow to start (2-3 seconds cold start) and ate 150MB of RAM for basic operations.

## Why Rust?

- **Performance**: Near-instant startup, minimal memory usage
- **Reliability**: If it compiles, it (usually) works
- **Distribution**: Single binary, no runtime dependencies
- **Learning**: We wanted to learn Rust as a community

## The Rewrite

We spent 3 weekends rewriting the core functionality. The hardest parts were:

1. **Async HTTP**: Moving from fetch/axios to reqwest
2. **Error handling**: Rust's Result type forced us to handle every edge case
3. **CLI parsing**: clap is amazing but has a learning curve

## Results

- Cold start: 2.3s → 15ms (150x faster)
- Memory: 150MB → 3MB (50x less)
- Binary size: 8MB (vs 80MB node_modules)
- Zero runtime dependencies for end users

## Lessons Learned

Start with a small scope. We only ported the 3 most-used commands first, then iterated. Trying to port everything at once would have killed the project.
    `.trim(),
  },
  {
    slug: "first-contribution",
    title: "Your First Open Source Contribution",
    date: "2026-03-20",
    author: "Sachini Dissanayake",
    tags: ["open-source", "beginner", "github"],
    description:
      "A step-by-step guide to making your first open source contribution, from finding a project to getting your PR merged.",
    readTime: "5 min read",
    gradient: "from-teal-100 to-teal-300",
    tagBg: "bg-teal-500 text-white",
    content: `
## Finding a Project

Don't start with Linux kernel. Look for projects with:

- A "good first issue" label
- Active maintainers (recent commits)
- Clear CONTRIBUTING.md
- A welcoming community

Great places to start: **First Timers Only**, **Up For Grabs**, **Good First Issues** on GitHub.

## The Process

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your change
4. **Make the change** — fix a bug, update docs, add a test
5. **Commit** with a clear message
6. **Push** to your fork
7. **Open a Pull Request**

## Writing a Good PR

- Describe what you changed and why
- Reference the issue number
- Keep it small and focused
- Include screenshots for UI changes

## What to Expect

- Maintainers may ask for changes — that's normal
- Be patient — reviews can take days
- Be kind — everyone's volunteering their time

Your first merged PR is an incredible feeling. You're now an open source contributor.
    `.trim(),
  },
  {
    slug: "docker-students",
    title: "Docker in 10 Minutes for Students",
    date: "2026-03-10",
    author: "Kavindu Ratnayake",
    tags: ["docker", "devops", "beginner"],
    description:
      "A no-nonsense introduction to Docker for students who just want to get their apps running in containers.",
    readTime: "4 min read",
    gradient: "from-violet-100 to-violet-300",
    tagBg: "bg-violet-500 text-white",
    content: `
## What is Docker?

Docker packages your app and all its dependencies into a **container** — a lightweight, portable environment that runs the same everywhere.

No more "it works on my machine."

## Core Concepts

- **Image**: A blueprint for your container (like a class)
- **Container**: A running instance of an image (like an object)
- **Dockerfile**: Instructions to build an image
- **Volume**: Persistent storage for containers
- **docker-compose**: Run multiple containers together

## Your First Dockerfile

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Running It

\`\`\`bash
docker build -t my-app .
docker run -p 3000:3000 my-app
\`\`\`

That's it. Your app is containerized. Visit localhost:3000.

## Why Students Should Care

- Deploy projects easily for demos
- No "install X, Y, Z" for teammates
- Learn a skill every company wants
    `.trim(),
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllTags() {
  const tags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

export function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
