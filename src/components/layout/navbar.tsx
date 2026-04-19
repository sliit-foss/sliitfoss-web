"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const navLinks = siteConfig.navLinks;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandLink({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center overflow-hidden border border-[#eee] bg-[#f8f9fa] text-[#333] transition-all duration-300",
        mobile ? "h-10 gap-2 rounded-2xl px-3" : "h-8 w-8 justify-start rounded-full hover:w-[110px]"
      )}
    >
      <div className={cn("flex items-center justify-center", mobile ? "h-4 w-4" : "h-8 w-8 flex-shrink-0")}>
        <Image
          src="/logo-dark.png"
          alt="SLIIT FOSS"
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      </div>
      <span
        className={cn(
          "font-medium tracking-wide whitespace-nowrap",
          mobile ? "text-[0.72rem] uppercase" : "pr-3 text-[0.7rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        )}
      >
        SLIIT FOSS
      </span>
    </Link>
  );
}

function DesktopNavbar({ pathname }: { pathname: string }) {
  return (
    <header className="pointer-events-none fixed top-6 left-1/2 z-50 hidden w-full max-w-fit -translate-x-1/2 items-center justify-center gap-3 px-4 lg:flex">
      <motion.div
        className="liquid-glass pointer-events-auto p-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BrandLink />
      </motion.div>

      <motion.nav
        className="liquid-glass pointer-events-auto flex items-center gap-1 p-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      >
        {navLinks.map((link) => {
          const isActive = isActivePath(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-1.5 text-[0.7rem] font-normal uppercase tracking-wide whitespace-nowrap transition-all duration-200",
                isActive ? "bg-[#e9f4fa] text-[#46a5d8]" : "bg-[#fafafa] text-[#333] hover:bg-[#f0f0f0]"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </motion.nav>

      <motion.div
        className="liquid-glass pointer-events-auto p-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <Link
          href="/join"
          className="flex items-center justify-center rounded-full bg-[#fafafa] px-5 py-1.5 text-[0.7rem] font-normal uppercase tracking-wide whitespace-nowrap text-[#333] transition-colors hover:bg-[#f0f0f0]"
        >
          Join Us
        </Link>
      </motion.div>
    </header>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavbarRef = useRef<HTMLDivElement>(null);
  const desktopNavItemClass =
    "bg-[#fafafa] text-[#333] hover:bg-[#f0f0f0] transition-all duration-200";

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopMediaQuery.addEventListener("change", handleDesktopChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (mobileNavbarRef.current?.contains(target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <DesktopNavbar pathname={pathname} />

      <header className="fixed inset-x-0 top-4 z-50 px-4 lg:hidden">
        <div
          ref={mobileNavbarRef}
          className="pointer-events-none mx-auto flex w-full max-w-sm flex-col"
        >
          <motion.div
            className="liquid-glass pointer-events-auto flex items-center justify-between p-1.5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ borderRadius: "1.75rem" }}
          >
            <BrandLink mobile />
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-2xl",
                desktopNavItemClass
              )}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-site-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </motion.div>

          <AnimatePresence initial={false}>
            {isMenuOpen ? (
              <motion.div
                key="mobile-site-navigation"
                id="mobile-site-navigation"
                className="liquid-glass pointer-events-auto mt-3 overflow-hidden p-2 shadow-[0_24px_80px_rgba(17,17,17,0.08)]"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{ borderRadius: "2.2rem" }}
              >
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = isActivePath(pathname, link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.78rem] font-normal uppercase tracking-[0.18em]",
                          isActive ? "bg-[#e9f4fa] text-[#46a5d8]" : desktopNavItemClass
                        )}
                      >
                        <span className="flex-1 text-right">{link.label}</span>
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            isActive ? "bg-[#46a5d8]" : "bg-[#d7d7d7]"
                          )}
                        />
                      </Link>
                    );
                  })}

                  <Link
                    href="/join"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-2 flex items-center justify-end rounded-2xl bg-[#111] px-4 py-3 text-right text-[0.78rem] font-normal uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[#222]"
                  >
                    Join Us
                  </Link>
                </nav>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
