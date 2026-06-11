import type { Metadata } from "next";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import WaveformHero from "@/components/WaveformHero";
import NewsletterSubmissionForm from "@/components/NewsletterSubmissionForm";

export const metadata: Metadata = {
  title: "The 10% Newsletter — The 10% Movement",
  description: "A curated research digest featuring emerging evidence on underserved populations. Submissions open now — closes July 15, 2026.",
};

export default function Newsletter() {
  return (
    <div>
      <WaveformHero />

      {/* WHAT IT IS */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <AnimateIn animation="blur-reveal" className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">What is The 10%?</p>
            <h2 className="text-xl font-semibold leading-snug">
              A curated digest at the frontier of underserved science
            </h2>
          </AnimateIn>
          <div className="lg:col-span-2 space-y-5 text-[#888] text-sm leading-relaxed">
            {[
              { text: "The 10% Newsletter is a research digest dedicated to patients, populations, and biological outliers underrepresented in mainstream science. Each issue features peer-reviewed evidence, expert commentary, and compelling case studies — translated from academic prose into language that researchers, advocates, and curious readers can act on.", dir: "slide-left" },
              { text: "We cover pharmacogenomics, rare disease, population-specific treatment response, and the structural gaps in how clinical trials are designed and who they serve.", dir: "slide-right" },
              { text: "The Clopidogrel and CYP2C19 story is the kind of work we exist to amplify. A well-documented, evidence-backed case where majority-focused medicine systematically underserved a genetically distinct population — and almost nobody talked about it.", dir: "slide-left" },
            ].map((para, i) => (
              <AnimateIn key={i} animation={para.dir as "slide-left" | "slide-right"} delay={i * 0.1}>
                <p>{para.text}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT TYPES — white contrast section */}
      <section className="bg-white text-black py-20 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="mb-14">
            <p className="text-xs text-black/40 uppercase tracking-[0.2em] font-medium mb-3">What We Publish</p>
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              What gets featured in The 10%
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {[
              {
                type: "Research Summary",
                description: "A structured summary of a peer-reviewed paper on underserved populations. Includes context, methodology overview, key findings, and implications.",
                example: "e.g. CYP2C19 variant prevalence and Clopidogrel efficacy stratified by ancestry",
              },
              {
                type: "Case Study",
                description: "An editorial narrative built around a specific patient population, drug-gene interaction, or treatment failure. Written for a general science audience.",
                example: "e.g. Why EGFR-targeted therapies fail in 10% of lung cancer patients",
              },
              {
                type: "Perspective Piece",
                description: "An expert opinion on structural issues in how science addresses or fails to address minority populations, rare conditions, or biological outliers.",
                example: "e.g. What clinical trial design gets wrong about ethnic diversity",
              },
              {
                type: "Data Brief",
                description: "A concise presentation of a key dataset, statistic, or registry finding with context and implications for treatment or research strategy.",
                example: "e.g. Rare disease diagnosis delays by demographic — a longitudinal analysis",
              },
            ].map((item, i) => (
              <AnimateIn key={item.type} animation="flip-in" delay={i * 0.13} className="bg-white p-8">
                <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-3">{item.type}</p>
                <p className="text-sm text-black/70 leading-relaxed mb-3">{item.description}</p>
                <p className="text-xs text-black/30 italic">{item.example}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMISSION GUIDELINES */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <AnimateIn animation="blur-reveal" className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">Submissions</p>
            <h2 className="text-xl font-semibold leading-snug">
              Open to anyone. Held to a high standard.
            </h2>
          </AnimateIn>

          <div className="lg:col-span-2">
            <div className="space-y-px">
              {[
                { heading: "Who can submit", body: "Any researcher, clinician, PhD student, science writer, or patient advocate with relevant work to share. We do not discriminate by career stage, institutional affiliation, or geography." },
                { heading: "What we look for", body: "Rigor, relevance, and clarity. We prioritize work that is evidence-backed, addresses an underserved population or neglected challenge, and can be communicated to a scientifically literate general audience." },
                { heading: "Editorial process", body: "All submissions are reviewed for scientific accuracy, scope fit, and editorial quality. We may request revisions. Accepted submissions are edited for clarity and published with full attribution." },
                { heading: "What happens after acceptance", body: "Your work is featured in The 10% Newsletter, distributed to our reader and researcher community, and archived on our platform. You retain full authorship credit." },
              ].map((item, i) => (
                <AnimateIn key={item.heading} animation="rotate-in" delay={i * 0.12}>
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

      {/* SUBMISSION FORM */}
      <section id="submit" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateIn animation="reveal-left" className="mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Now Open — Closes July 15, 2026
            </div>
            <h2 className="text-2xl font-semibold mb-3">Submit to The 10%</h2>
            <AnimateIn animation="blur-reveal" delay={0.2}>
              <p
                className="italic text-[#555] max-w-md"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &ldquo;If you have work that belongs in The 10% — bring it. We&apos;ll be ready.&rdquo;
              </p>
            </AnimateIn>
          </AnimateIn>

          <NewsletterSubmissionForm />

          <div className="mt-12 pt-8 border-t border-[#1e1e1e] flex items-center justify-between">
            <p className="text-xs text-[#444]">Also accepting research cohort applications</p>
            <Link href="/research#apply" className="text-sm text-[#888] hover:text-white transition-colors">
              Apply to the Cohort →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
