import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import HelixHero from "@/components/HelixHero";

export const metadata: Metadata = {
  title: "The Movement — The 10% Movement",
  description: "What The 10% Movement is, why it exists, and how it's changing the way science speaks to everyone.",
};

export default function About() {
  const marqueeStats = [
    "CYP2C19 poor metabolizers · 14% in Chinese populations",
    "East Asian intermediate metabolizers · 45%+",
    "EGFR non-responders · ~10% of NSCLC patients",
    "300 million rare disease patients globally",
    "Clinical trials underrepresent minority populations",
    "The Clopidogrel case — documented, underaddressed",
    "CYP2C19 poor metabolizers · 14% in Chinese populations",
    "East Asian intermediate metabolizers · 45%+",
    "EGFR non-responders · ~10% of NSCLC patients",
    "300 million rare disease patients globally",
    "Clinical trials underrepresent minority populations",
    "The Clopidogrel case — documented, underaddressed",
  ];

  return (
    <div>
      <HelixHero />

      {/* VISION */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <AnimateIn animation="blur-reveal" className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">The Vision</p>
            <h2 className="text-xl font-semibold leading-snug">
              A world where being in the minority doesn&apos;t mean being left behind.
            </h2>
          </AnimateIn>
          <div className="lg:col-span-2 space-y-5 text-[#888] text-sm leading-relaxed">
            {[
              { text: "Medical science has made extraordinary progress in the last century. But the incentives that drive research — funding, clinical trial design, regulatory approval — reward therapies that work for the largest number of people.", dir: "slide-left" },
              { text: "This is rational. And it leaves millions behind.", dir: "slide-right" },
              { text: "The patients with rare genetic variants. The populations whose biology differs from the clinical trial cohort. The conditions too uncommon to attract major pharmaceutical investment. The biological outliers who receive standard therapies that simply don't work for them, and in some cases, cause active harm.", dir: "slide-left" },
              { text: "The 10% Movement was founded on a simple premise: if the system won't naturally surface these patients, we will. Through rigorous scientific communication, a community of aligned researchers, and a platform that amplifies evidence on underserved populations, we are building the infrastructure that the 10% deserve.", dir: "slide-right" },
            ].map((para, i) => (
              <AnimateIn key={i} animation={para.dir as "slide-left" | "slide-right"} delay={i * 0.08}>
                <p>{para.text}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE — between vision and problem */}
      <div className="overflow-hidden border-y border-[#1e1e1e] py-4 bg-[#0d0d0d]">
        <div className="marquee-track">
          {marqueeStats.map((stat, i) => (
            <span key={i} className="flex-shrink-0 text-xs text-[#444] uppercase tracking-[0.18em] font-medium px-10 select-none">
              {stat}
              <span className="text-[#2a2a2a] ml-10">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* THE PROBLEM — white contrast section */}
      <section className="bg-white text-black py-20 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="mb-14">
            <p className="text-xs text-black/40 uppercase tracking-[0.2em] font-medium mb-3">The Problem</p>
            <h2 className="text-2xl font-semibold tracking-tight text-black max-w-2xl">
              Three ways majority-focused science fails minority populations
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {[
              {
                heading: "Clinical trial underrepresentation",
                body: "Most clinical trials recruit participants who resemble the modal patient. Outcomes derived from these populations may not translate to others. The drug gets approved. The minority population gets an untested therapy.",
              },
              {
                heading: "Genetic heterogeneity",
                body: "Pharmacogenomic variation means the same drug can be highly effective, ineffective, or dangerous depending on a patient's genetic background. When efficacy data is not stratified by genotype, outlier patients receive treatments that fail them silently.",
              },
              {
                heading: "Rare disease neglect",
                body: "Conditions affecting fewer than 1 in 2,000 people rarely attract the commercial investment needed for clinical development. Researchers in these spaces often lack the communication infrastructure to surface their findings to the people who need them.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.heading} animation="flip-in" delay={i * 0.14} className="bg-white p-8 md:p-10">
                <h3 className="text-sm font-semibold mb-4 text-black leading-snug">{item.heading}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{item.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE RESPOND */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="blur-reveal" className="mb-14">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">Our Approach</p>
            <h2 className="text-2xl font-semibold tracking-tight max-w-2xl">
              How The 10% Movement responds
            </h2>
          </AnimateIn>

          <div className="space-y-px">
            {[
              { number: "01", heading: "Curated research digests", body: "We identify, summarize, and distribute emerging research on underserved populations and neglected therapeutic areas. Each piece is reviewed for scientific rigor before publication in The 10% Newsletter." },
              { number: "02", heading: "A selective researcher cohort", body: "We curate a community of researchers working at the intersection of genetics, rare disease, and population-specific medicine. Cohort members receive amplification, community, and editorial support for their work." },
              { number: "03", heading: "Open submissions", body: "We accept submissions from any researcher, clinician, or science writer with relevant work to share. The editorial bar is high. The door is open. We believe the best ideas come from everywhere." },
              { number: "04", heading: "Scientific storytelling", body: "Cases like Clopidogrel and CYP2C19 are not just research findings. They are narratives about how standard medicine fails real people. We translate complex evidence into stories that create urgency and drive change." },
            ].map((item, i) => (
              <AnimateIn key={item.number} animation="rotate-in" delay={i * 0.12}>
                <div className="flex gap-8 p-8 border border-[#1e1e1e] bg-[#0a0a0a] hover:bg-[#111] transition-colors">
                  <p
                    className="text-xs text-[#333] font-mono mt-1 flex-shrink-0 w-6"
                    style={{ animation: "stampIn 0.5s cubic-bezier(0.34,1.3,0.64,1) both" }}
                  >
                    {item.number}
                  </p>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">{item.heading}</h3>
                    <p className="text-sm text-[#888] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SLOGAN — serif, large, dark */}
      <section className="py-28 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto text-center">
          <AnimateIn animation="blur-reveal">
            <p
              className="text-4xl md:text-6xl italic leading-tight text-white/20"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;Because 90% isn&apos;t enough.&rdquo;
            </p>
          </AnimateIn>
          <AnimateIn animation="skew-up" delay={0.3}>
            <p className="mt-8 text-sm text-[#555] max-w-md mx-auto leading-relaxed">
              Every patient, every population, every outlier deserves the evidence they need
              to survive and thrive.
            </p>
          </AnimateIn>
          <AnimateIn animation="scale-reveal" delay={0.45} className="mt-10">
            <Link href="/research" className="inline-flex items-center px-6 py-3 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors">
              Join the Movement →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
