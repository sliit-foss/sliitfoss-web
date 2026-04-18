import Link from "next/link";
import Image from "next/image";

const navColumns = [
  {
    title: "Navigate",
    links: [
      { href: "/about", label: "About" },
      { href: "/events", label: "Events" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://github.com/sliitfoss", label: "GitHub" },
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "Discord" },
      { href: "#", label: "Twitter/X" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "#", label: "Projects" },
      { href: "#", label: "Podcast" },
      { href: "#", label: "Gallery" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f0f0f0] border-t border-black/[0.04] pt-16 pb-8 px-6 md:px-10 text-[#111]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image 
                src="/logo-dark.png" 
                alt="SLIIT FOSS" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-[#999] text-left leading-relaxed">
              A community of volunteers who believe in the power of Free & Open
              Source Software.
            </p>
          </div>

          {navColumns.map((col) => (
            <div key={col.title}>
              <div className="text-[0.65rem] uppercase tracking-[3px] text-[#bbb] font-medium mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#777] transition-colors hover:text-[#111]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/[0.06] pt-5 text-center text-xs text-[#ccc]">
          &copy; {new Date().getFullYear()} SLIIT FOSS Community
        </div>
      </div>
    </footer>
  );
}
