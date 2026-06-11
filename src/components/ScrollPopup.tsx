"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ScrollPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("popup-dismissed")) return;

    const handleScroll = () => {
      if (window.scrollY > 320) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("popup-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
      onClick={dismiss}
    >
      <div
        className="w-full max-w-md bg-[#0a0a0a] border border-[#2a2a2a] p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-[#444] hover:text-white transition-colors w-7 h-7 flex items-center justify-center text-sm"
          aria-label="Dismiss"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-2 mb-5 px-2.5 py-1 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Applications are open
        </div>

        <h2 className="text-xl font-semibold mb-2">Join the movement</h2>
        <p className="text-sm text-[#888] mb-8 leading-relaxed">
          The 10% Movement is now accepting applications. Pick what fits your work.
        </p>

        <div className="space-y-3">
          <Link
            href="/research#apply"
            onClick={dismiss}
            className="flex items-center justify-between w-full px-5 py-3.5 bg-white text-black text-sm font-medium rounded-sm hover:bg-[#e0e0e0] transition-colors"
          >
            <div>
              <p className="font-semibold">Research Cohort</p>
              <p className="text-xs text-black/50 font-normal mt-0.5">Selective · Closes July 1, 2026</p>
            </div>
            <span className="ml-4">→</span>
          </Link>

          <Link
            href="/newsletter#submit"
            onClick={dismiss}
            className="flex items-center justify-between w-full px-5 py-3.5 border border-[#2a2a2a] text-white text-sm font-medium rounded-sm hover:bg-[#111] transition-colors"
          >
            <div>
              <p className="font-semibold">Newsletter Submission</p>
              <p className="text-xs text-[#666] font-normal mt-0.5">Open to all · Closes July 15, 2026</p>
            </div>
            <span className="ml-4">→</span>
          </Link>
        </div>

        <button
          onClick={dismiss}
          className="mt-6 w-full text-center text-xs text-[#3a3a3a] hover:text-[#555] transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
