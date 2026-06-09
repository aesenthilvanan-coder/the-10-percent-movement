import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Movement — The 10% Movement",
  description: "What The 10% Movement is, why it exists, and how it's changing the way science speaks to everyone.",
};

export default function About() {
  return (
    <div>
      {/* PAGE HEADER */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">The Movement</p>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
              Science is built on averages.{" "}
              <span className="text-[#555]">Millions of patients fall outside them.</span>
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* VISION */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <AnimateIn animation="reveal-left" className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">The Vision</p>
            <h2 className="text-xl font-semibold leading-snug">
              A world where being in the minority doesn&apos;t mean being left behind.
            </h2>
          </AnimateIn>
          <div className="lg:col-span-2 space-y-5 text-[#888] text-sm leading-relaxed">
            {[
              "Medical science has made extraordinary progress in the last century. But the incentives that drive research — funding, clinical trial design, regulatory approval — reward therapies that work for the largest number of people.",
              "This is rational. And it leaves millions behind.",
              "The patients with rare genetic variants. The populations whose biology differs from the clinical trial cohort. The conditions too uncommon to attract major pharmaceutical investment. The biological outliers who receive standard therapies that simply don't work for them, and in some cases, cause active harm.",
              "The 10% Movement was founded on a simple premise: if the system won't naturally surface these patients, we will. Through rigorous scientific communication, a community of aligned researchers, and a platform that amplifies evidence on underserved populations, we are building the infrastructure that the 10% deserve.",
            ].map((para, i) => (
              <AnimateIn key={i} animation="slide-up" delay={i * 0.08}>
                <p>{para}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

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
              <AnimateIn key={item.heading} animation="scale-reveal" delay={i * 0.12} className="bg-white p-8 md:p-10">
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
          <AnimateIn animation="reveal-left" className="mb-14">
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
              <AnimateIn key={item.number} animation="slide-right" delay={i * 0.1}>
                <div className="flex gap-8 p-8 border border-[#1e1e1e] bg-[#0a0a0a] hover:bg-[#111] transition-colors">
                  <p className="text-xs text-[#333] font-mono mt-1 flex-shrink-0 w-6">{item.number}</p>
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
          <AnimateIn animation="reveal-left">
            <p
              className="text-4xl md:text-6xl italic leading-tight text-white/20"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;Because 90% isn&apos;t enough.&rdquo;
            </p>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.3}>
            <p className="mt-8 text-sm text-[#555] max-w-md mx-auto leading-relaxed">
              Every patient, every population, every outlier deserves the evidence they need
              to survive and thrive.
            </p>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.45} className="mt-10">
            <Link href="/research" className="inline-flex items-center px-6 py-3 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors">
              Join the Movement →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
