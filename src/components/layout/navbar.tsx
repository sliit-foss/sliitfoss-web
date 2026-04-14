"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/content/site";

const navLinks = siteConfig.navLinks;

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Make glass more opaque as user scrolls
  const bgOpacity = useTransform(scrollY, [0, 150], [0.35, 0.65]);
  const shadowOpacity = useTransform(scrollY, [0, 150], [0.02, 0.08]);

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center gap-1.5 rounded-full px-2.5 py-2"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(245, 245, 248, ${v})`),
        backdropFilter: "blur(40px) saturate(1.8)",
        WebkitBackdropFilter: "blur(40px) saturate(1.8)",
        border: "1px solid rgba(255, 255, 255, 0.55)",
        boxShadow: useTransform(
          shadowOpacity,
          (v) =>
            `0 8px 32px rgba(0,0,0,${v}), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -0.5px 0 rgba(0,0,0,0.03)`
        ),
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center w-9 h-9 rounded-full mr-1 shrink-0 bg-white/50 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <Image
          src="/logo-dark.png"
          alt="SLIIT FOSS"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      </Link>

      {/* Nav links */}
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-1.5 rounded-full text-[0.75rem] font-medium uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
              isActive
                ? "text-[#111] bg-white/60 border border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.04)]"
                : "text-[#888] hover:text-[#333] hover:bg-white/30 border border-transparent"
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      {/* CTA */}
      <Link
        href="/join"
        className="ml-1 px-4 py-1.5 rounded-full text-[0.75rem] font-medium uppercase tracking-wide text-[#333] bg-white/50 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.04)] transition-all whitespace-nowrap hover:bg-white/70 hover:text-[#111]"
      >
        Join Us
      </Link>
    </motion.nav>
  );
}
