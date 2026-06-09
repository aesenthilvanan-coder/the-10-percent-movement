import type { Metadata } from "next";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Research Cohort — The 10% Movement",
  description: "Join a selective community of researchers dedicated to underserved populations. Applications open June 11, 2026.",
};

export default function Research() {
  return (
    <div>
      {/* PAGE HEADER */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">Research Cohort</p>
          </AnimateIn>
          <AnimateIn animation="skew-up" delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight mb-6">
              A community of researchers who believe the outlier{" "}
              <span className="text-[#555]">deserves the same rigor as the majority.</span>
            </h1>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.25}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888]">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse" />
              Applications open June 11, 2026
            </div>
          </AnimateIn>
          {/* draw-line */}
          <AnimateIn animation="draw-line" delay={0.4} className="mt-10 h-px bg-[#2a2a2a]" />
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <AnimateIn animation="blur-reveal" className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">What It Is</p>
            <h2 className="text-xl font-semibold leading-snug">
              A selective, ongoing cohort for serious researchers
            </h2>
          </AnimateIn>
          <div className="lg:col-span-2 space-y-5 text-[#888] text-sm leading-relaxed">
            {[
              { text: "The 10% Movement Research Cohort is a vetted community of researchers, clinicians, scientists, and advocates working at the intersection of underserved populations, rare conditions, and population-specific medicine.", dir: "slide-left" },
              { text: "Cohort members have their work featured in The 10% Newsletter, receive editorial support and amplification, and become part of a growing network of people who share the conviction that science must work for everyone — not just the majority.", dir: "slide-right" },
              { text: "This cohort is highly selective. We are not optimizing for volume. We are optimizing for researchers whose work reflects the mission of the movement: rigorous, relevant, and aimed at the populations mainstream science overlooks.", dir: "slide-left" },
            ].map((para, i) => (
              <AnimateIn key={i} animation={para.dir as "slide-left" | "slide-right"} delay={i * 0.1}>
                <p>{para.text}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT RESEARCHERS GET — white contrast section */}
      <section className="bg-white text-black py-20 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="mb-14">
            <p className="text-xs text-black/40 uppercase tracking-[0.2em] font-medium mb-3">What Cohort Members Get</p>
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              More than a community — infrastructure for your work
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {[
              { heading: "Publication in The 10% Newsletter", body: "Your research summaries, case studies, and perspective pieces are published and distributed to our growing reader and researcher community. Full attribution always." },
              { heading: "Editorial support", body: "Access to editorial review and editing from our team. We help translate rigorous research into clear, compelling science communication without compromising accuracy." },
              { heading: "Network access", body: "Connection with other vetted cohort members — researchers, clinicians, and advocates working across pharmacogenomics, rare disease, and underserved population science." },
              { heading: "Amplification", body: "Your work reaches an audience that includes both technical researchers and patient advocates who can act on what you publish. We prioritize signal over noise." },
            ].map((item, i) => (
              <AnimateIn key={item.heading} animation="flip-in" delay={i * 0.13} className="bg-white p-8">
                <h3 className="text-sm font-semibold mb-3 text-black">{item.heading}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{item.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION CRITERIA */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <AnimateIn animation="blur-reveal" className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">Selection</p>
            <h2 className="text-xl font-semibold leading-snug">
              We are selective. Here&apos;s what that means.
            </h2>
          </AnimateIn>
          <div className="lg:col-span-2">
            <div className="space-y-px">
              {[
                { heading: "Open to anyone", body: "There is no credential requirement. PhD students, independent researchers, clinicians, and citizen scientists are all welcome to apply. What matters is the quality and relevance of your work.", dir: "slide-left" },
                { heading: "Rigor is non-negotiable", body: "We evaluate work on scientific accuracy, methodological soundness, and evidence quality. We do not publish speculation, advocacy disguised as research, or work that misrepresents data.", dir: "rotate-in" },
                { heading: "Scope alignment", body: "We prioritize work on underserved populations, pharmacogenomic variation, rare or neglected conditions, and structural gaps in clinical trial representation. Adjacent work may be considered.", dir: "slide-left" },
                { heading: "Commitment to the mission", body: "We look for researchers who believe this work matters — not just as a publication credit, but as a contribution to ensuring science serves everyone. That orientation shows in how people write and what they choose to study.", dir: "rotate-in" },
              ].map((item, i) => (
                <AnimateIn key={item.heading} animation={item.dir as "slide-left" | "rotate-in"} delay={i * 0.12}>
                  <div className="border border-[#1e1e1e] p-6 bg-[#0a0a0a]">
                    <h3 className="text-sm font-semibold mb-2">{item.heading}</h3>
                    <p className="text-sm text-[#888] leading-relaxed">{item.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="scale-reveal" className="border border-[#1e1e1e] p-12 bg-[#0a0a0a]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888]">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60 animate-pulse" />
                Opens June 11, 2026
              </div>
              <h2 className="text-2xl font-semibold mb-3">Apply to the Research Cohort</h2>
              <AnimateIn animation="blur-reveal" delay={0.2}>
                <p
                  className="italic text-[#555] mb-8 max-w-xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  &ldquo;The first cohort will be small and selective. If your work belongs in this
                  movement — we want to hear from you.&rdquo;
                </p>
              </AnimateIn>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-[#1a1a1a] text-[#444] rounded-sm cursor-not-allowed border border-[#2a2a2a] w-fit">
                  Apply to the Cohort (Opens June 11)
                </div>
                <Link href="/newsletter" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-[#2a2a2a] text-[#888] rounded-sm hover:text-white hover:bg-[#111] transition-colors w-fit">
                  Submit to the Newsletter →
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
