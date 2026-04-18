"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { siteConfig } from "@/content/site";

const navLinks = siteConfig.navLinks;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2 w-full max-w-fit px-4 flex items-center justify-center gap-3 pointer-events-none">
      {/* Logo Pill */}
      <motion.div
        className="liquid-glass pointer-events-auto p-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f8f9fa] border border-[#eee] transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo-dark.png"
            alt="SLIIT FOSS"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </Link>
      </motion.div>

      {/* Main Nav (Links) */}
      <motion.nav
        className="liquid-glass pointer-events-auto flex items-center gap-1 p-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-[0.7rem] font-normal uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "text-[#46a5d8] bg-[#e9f4fa]"
                  : "text-[#333] bg-[#fafafa] hover:bg-[#f0f0f0]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </motion.nav>

      {/* CTA (Login / Join) Separated */}
      <motion.div
        className="liquid-glass pointer-events-auto p-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <Link
          href="/join"
          className="px-5 py-1.5 flex items-center justify-center rounded-full text-[0.7rem] font-normal uppercase tracking-wide text-[#333] bg-[#fafafa] transition-colors whitespace-nowrap hover:bg-[#f0f0f0]"
        >
          Join Us
        </Link>
      </motion.div>
    </header>
  );
}
