import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 10% Newsletter — The 10% Movement",
  description:
    "A curated research digest featuring emerging evidence on underserved populations and neglected therapeutic challenges. Submissions open June 11, 2026.",
};

export default function Newsletter() {
  return (
    <div>
      {/* PAGE HEADER */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
            The 10% Newsletter
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight mb-6">
            Research that doesn&apos;t reach the people who need it{" "}
            <span className="text-[#555]">is research that doesn&apos;t matter.</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            Submissions open June 11, 2026
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">
              What is The 10%?
            </p>
            <h2 className="text-xl font-semibold tracking-tight leading-snug">
              A curated digest at the frontier of underserved science
            </h2>
          </div>
          <div className="lg:col-span-2 space-y-5 text-[#888] text-sm leading-relaxed">
            <p>
              The 10% Newsletter is a research digest dedicated to patients, populations, and
              biological outliers underrepresented in mainstream science. Each issue features
              peer-reviewed evidence, expert commentary, and compelling case studies — translated
              from academic prose into language that researchers, advocates, and curious readers
              can act on.
            </p>
            <p>
              We cover pharmacogenomics, rare disease, population-specific treatment response,
              and the structural gaps in how clinical trials are designed and who they serve.
            </p>
            <p>
              The Clopidogrel + CYP2C19 story is the kind of work we exist to amplify. A
              well-documented, evidence-backed case where majority-focused medicine systematically
              underserved a genetically distinct population — and almost nobody talked about it.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT GETS FEATURED */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">
              What We Publish
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              What gets featured in The 10%
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
            {[
              {
                type: "Research Summary",
                description:
                  "A structured summary of a peer-reviewed paper on underserved populations. Includes context, methodology overview, key findings, and implications.",
                example: "e.g. CYP2C19 variant prevalence and Clopidogrel efficacy stratified by ancestry",
              },
              {
                type: "Case Study",
                description:
                  "An editorial narrative built around a specific patient population, drug-gene interaction, or treatment failure. Written for a general science audience.",
                example: "e.g. Why EGFR-targeted therapies fail in 10% of lung cancer patients",
              },
              {
                type: "Perspective Piece",
                description:
                  "An expert opinion on structural issues in how science addresses (or fails to address) minority populations, rare conditions, or biological outliers.",
                example: "e.g. What clinical trial design gets wrong about ethnic diversity",
              },
              {
                type: "Data Brief",
                description:
                  "A concise presentation of a key dataset, statistic, or registry finding with context and implications for treatment or research strategy.",
                example: "e.g. Rare disease diagnosis delays by demographic — a longitudinal analysis",
              },
            ].map((item) => (
              <div key={item.type} className="bg-[#0a0a0a] p-8">
                <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-3">
                  {item.type}
                </p>
                <p className="text-sm text-[#999] leading-relaxed mb-3">{item.description}</p>
                <p className="text-xs text-[#444] italic">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMISSION GUIDELINES */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">
              Submissions
            </p>
            <h2 className="text-xl font-semibold leading-snug">
              Open to anyone. Held to a high standard.
            </h2>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-px">
              {[
                {
                  heading: "Who can submit",
                  body: "Any researcher, clinician, PhD student, science writer, or patient advocate with relevant work to share. We do not discriminate by career stage, institutional affiliation, or geography.",
                },
                {
                  heading: "What we look for",
                  body: "Rigor, relevance, and clarity. We prioritize work that is evidence-backed, addresses an underserved population or neglected challenge, and can be communicated to a scientifically literate general audience.",
                },
                {
                  heading: "Editorial process",
                  body: "All submissions are reviewed by the editorial team for scientific accuracy, scope fit, and editorial quality. We may request revisions. Accepted submissions are edited for clarity and published with full attribution.",
                },
                {
                  heading: "What happens after acceptance",
                  body: "Your work is featured in The 10% Newsletter, distributed to our reader and researcher community, and archived on our platform. You retain full authorship credit.",
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="border border-[#1e1e1e] p-6 bg-[#0a0a0a]"
                >
                  <h3 className="text-sm font-semibold mb-2">{item.heading}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border border-[#1e1e1e] p-12 text-center bg-[#0a0a0a]">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888]">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60" />
              Opens June 11, 2026
            </div>
            <h2 className="text-2xl font-semibold mb-3">Submit to The 10%</h2>
            <p className="text-sm text-[#888] max-w-md mx-auto mb-8 leading-relaxed">
              Submissions open on June 11, 2026. If you have work that belongs in The 10% —
              bring it. We&apos;ll be ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-[#1a1a1a] text-[#555] rounded-sm cursor-not-allowed border border-[#2a2a2a]">
                Submit Your Work (Opens June 11)
              </div>
              <Link
                href="/research"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-[#2a2a2a] text-[#888] rounded-sm hover:text-white hover:bg-[#111] transition-colors"
              >
                Join the Research Cohort →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
