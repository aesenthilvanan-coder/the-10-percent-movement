"use client";
import { useEffect, useState } from "react";
import PopulationDots from "./PopulationDots";

export default function HeroCounter() {
  const [count, setCount] = useState(100);
  const [done, setDone] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  const [showBody, setShowBody] = useState(false);

  useEffect(() => {
    // Count from 100 → 10 over 1.4s with ease-out
    const start = Date.now();
    const duration = 1400;
    const startVal = 100;
    const endVal = 10;

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      // Fast start, slow finish
      const eased = 1 - Math.pow(1 - t, 2.5);
      const current = Math.round(startVal + (endVal - startVal) * eased);
      setCount(current);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(10);
        setDone(true);
        setTimeout(() => setShowSlogan(true), 200);
        setTimeout(() => setShowBody(true), 600);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center">
      {/* Announcement badge */}
      <div
        className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888] tracking-wide"
        style={{ animation: "slideDown 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse" />
        Cohort &amp; newsletter submissions open June 11, 2026
      </div>

      {/* Population visualization */}
      <div
        className="flex justify-center mb-8 opacity-80"
        style={{ animation: "stampIn 0.7s cubic-bezier(0.34,1.4,0.64,1) 0.2s both" }}
      >
        <PopulationDots />
      </div>

      {/* Counter */}
      <div className="relative mb-4">
        <span
          className="text-[100px] md:text-[140px] font-bold tracking-tight leading-none tabular-nums"
          style={{
            animation: "stampIn 0.5s cubic-bezier(0.34,1.3,0.64,1) 0.15s both",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {count}
          <span className="text-[60px] md:text-[80px] text-white/60">%</span>
        </span>

        {done && (
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-white"
            style={{ animation: "expandWidth 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          />
        )}
      </div>

      {/* Subtitle */}
      <p
        className="text-sm md:text-base text-[#555] uppercase tracking-[0.3em] font-medium mb-6"
        style={{ animation: "slideDown 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
      >
        The 10% Movement
      </p>

      {/* Slogan — serif italic */}
      <div
        className="overflow-hidden mb-10"
        style={{
          clipPath: showSlogan ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-2xl md:text-3xl font-serif italic text-white/90">
          &ldquo;Because 90% isn&apos;t enough.&rdquo;
        </p>
      </div>

      {/* Body */}
      <div
        style={{
          opacity: showBody ? 1 : 0,
          transform: showBody ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl mx-auto mb-12">
          A research-driven initiative dedicated to the patients, populations, and biological
          outliers often overlooked by majority-focused science. Through curated research digests,
          scientific communication, and a growing community, we ensure the 10% are never
          an afterthought.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/research"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors"
          >
            Join the Research Cohort
          </a>
          <a
            href="/newsletter"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium border border-[#2a2a2a] text-[#ccc] rounded-sm hover:bg-[#111] hover:text-white transition-colors"
          >
            Read The 10% Newsletter
          </a>
        </div>
      </div>
    </div>
  );
}
