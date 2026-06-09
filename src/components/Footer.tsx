import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-2.5 bg-white rounded-sm" />
              </div>
              <span className="text-sm font-semibold">The 10% Movement</span>
            </div>
            <p className="text-sm text-[#888] leading-relaxed max-w-xs">
              A research-driven initiative dedicated to the patients, populations, and
              biological outliers overlooked by majority-focused science.
            </p>
            <p className="mt-4 text-xs text-[#555] uppercase tracking-widest font-medium">
              Because 90% isn&apos;t enough.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "The Movement" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/research", label: "Research Cohort" },
                { href: "/team", label: "Team" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening */}
          <div>
            <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-4">
              Opening June 11
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/research", label: "Researcher Applications" },
                { href: "/newsletter", label: "Newsletter Submissions" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1e1e1e] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-[#555]">
            © 2026 The 10% Movement. All rights reserved.
          </p>
          <p className="text-xs text-[#555]">
            Founded by Aaryan Senthilvanan, Chloe, and Buno
          </p>
        </div>
      </div>
    </footer>
  );
}
