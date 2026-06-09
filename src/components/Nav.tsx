"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "The Movement" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/research", label: "Research Cohort" },
  { href: "/team", label: "Team" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Announcement banner */}
      <div className="bg-white text-black text-center text-xs font-medium tracking-wide py-2.5 px-4">
        Research Cohort & Newsletter submissions open{" "}
        <span className="font-semibold">June 11, 2026</span>
        <span className="mx-2 opacity-40">·</span>
        <Link href="/research" className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity">
          Learn more
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-2.5 bg-white rounded-sm" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-tight">The 10% Movement</span>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                    active
                      ? "text-white bg-[#1e1e1e]"
                      : "text-[#888] hover:text-white hover:bg-[#161616]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/newsletter"
              className="hidden sm:inline-flex items-center text-sm text-[#888] hover:text-white transition-colors"
            >
              Subscribe
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center px-3.5 py-1.5 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors"
            >
              Apply
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-[#1e1e1e] px-6 py-2 flex gap-4 overflow-x-auto">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs whitespace-nowrap py-1 transition-colors ${
                  active ? "text-white" : "text-[#666] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
