import Link from "next/link";
import HeroCounter from "@/components/HeroCounter";
import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import ScrollPopup from "@/components/ScrollPopup";

export default function Home() {
  return (
    <div>

      {/* ── HERO: Counter + population dots ─────────────────────── */}
      <section className="relative min-h-[96vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-[#1e1e1e]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <HeroCounter />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <div className="w-px h-10 bg-white" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ──────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-[#1e1e1e] py-4 bg-[#0d0d0d]">
        <div className="marquee-track">
          {[
            "CYP2C19 poor metabolizers · 14% in Chinese populations",
            "East Asian intermediate metabolizers · 45%+",
            "EGFR non-responders · ~10% of NSCLC patients",
            "300 million rare disease patients globally",
            "Clinical trials underrepresent minority populations",
            "Clopidogrel efficacy varies dramatically by genotype",
            "The 10% Movement · now open",
            "Pharmacogenomics is not a niche — it's a gap in standard care",
            "CYP2C19 poor metabolizers · 14% in Chinese populations",
            "East Asian intermediate metabolizers · 45%+",
            "EGFR non-responders · ~10% of NSCLC patients",
            "300 million rare disease patients globally",
            "Clinical trials underrepresent minority populations",
            "Clopidogrel efficacy varies dramatically by genotype",
            "The 10% Movement · now open",
            "Pharmacogenomics is not a niche — it's a gap in standard care",
          ].map((fact, i) => (
            <span key={i} className="flex-shrink-0 text-xs text-[#444] uppercase tracking-[0.18em] font-medium px-10 select-none">
              {fact}
              <span className="text-[#2a2a2a] ml-10">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── MISSION PILLARS: Staggered slide from right ─────────── */}
      <section className="py-24 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="mb-16 max-w-2xl">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Science moves fastest for the majority.{" "}
              <span className="text-[#555]">We move for everyone else.</span>
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
            {[
              {
                number: "01",
                title: "Research Digests",
                description:
                  "Curated, peer-reviewed summaries of emerging evidence on underserved populations and neglected therapeutic challenges.",
              },
              {
                number: "02",
                title: "Scientific Communication",
                description:
                  "Translating pharmacogenomic, rare disease, and population-specific research into accessible, rigorous content for researchers and advocates.",
              },
              {
                number: "03",
                title: "Research Community",
                description:
                  "A selective cohort of researchers, clinicians, and advocates advancing science for the biological outliers conventional medicine overlooks.",
              },
            ].map((pillar, i) => (
              <AnimateIn
                key={pillar.number}
                animation="slide-right"
                delay={i * 0.12}
                className="bg-[#0a0a0a] p-8 md:p-10"
              >
                <p className="text-xs text-[#333] font-mono mb-6">{pillar.number}</p>
                <h3 className="text-base font-semibold mb-3">{pillar.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{pillar.description}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS: White section contrast + count-up numbers ────── */}
      <section className="bg-white text-black py-24 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="mb-14">
            <p className="text-xs text-black/40 uppercase tracking-[0.2em] font-medium mb-3">
              The Numbers
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black leading-tight max-w-2xl">
              A medication validated on millions.{" "}
              <span className="text-black/40">Failing a genetically distinct minority.</span>
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
            {[
              { stat: 4, suffix: "%", label: "CYP2C19 poor metabolizers — Europeans & African Americans" },
              { stat: 14, suffix: "%", label: "Poor metabolizers — Chinese population" },
              { stat: 45, suffix: "%", label: "Intermediate metabolizers — East Asians" },
              { stat: 10, suffix: "%", label: "EGFR non-responders in lung cancer" },
            ].map((item, i) => (
              <AnimateIn key={i} animation="slide-up" delay={i * 0.1} className="bg-white p-8">
                <p className="text-5xl font-bold tracking-tight text-black mb-2">
                  <CountUp end={item.stat} suffix={item.suffix} duration={2200} />
                </p>
                <p className="text-xs text-black/50 leading-relaxed">{item.label}</p>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn animation="slide-up" delay={0.4} className="mt-10">
            <blockquote className="border-l-2 border-black/20 pl-6 max-w-2xl">
              <p
                className="text-xl md:text-2xl italic text-black/70 leading-relaxed"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &ldquo;The average patient was protected. The outlier patient was overlooked.&rdquo;
              </p>
            </blockquote>
          </AnimateIn>
        </div>
      </section>

      {/* ── CASE STUDY: Clip-path reveals + scale cards ─────────── */}
      <section className="py-24 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <AnimateIn animation="reveal-left">
                <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
                  Flagship Case Study
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight">
                  The drug worked for 90%.{" "}
                  <span className="text-[#555]">The other 10% were left at risk.</span>
                </h2>
              </AnimateIn>

              <div className="space-y-5 text-sm text-[#888] leading-relaxed">
                <AnimateIn animation="slide-up" delay={0.05}>
                  <p>
                    A patient has a heart attack. Doctors prescribe Clopidogrel (Plavix) — one of
                    the most common blood-thinning drugs in the world. For most patients, it works.
                  </p>
                </AnimateIn>
                <AnimateIn animation="slide-up" delay={0.15}>
                  <p>
                    But a significant minority carry variants of the{" "}
                    <span className="text-white font-medium">CYP2C19</span> gene that prevent them
                    from converting Clopidogrel into its active form. For these patients, the drug
                    is literally less effective — or may barely work at all.
                  </p>
                </AnimateIn>
                <AnimateIn animation="slide-up" delay={0.25}>
                  <p>
                    The result? The therapy that protects the majority can leave a genetically
                    distinct subgroup at{" "}
                    <span className="text-white">
                      increased risk of stroke, stent thrombosis, or recurrent cardiovascular events.
                    </span>
                  </p>
                </AnimateIn>
                <AnimateIn animation="slide-up" delay={0.35}>
                  <blockquote className="border-l-2 border-[#333] pl-4 py-1 my-6">
                    <p
                      className="text-[#666] italic"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      &ldquo;The average patient was protected. The outlier patient was overlooked.&rdquo;
                    </p>
                  </blockquote>
                </AnimateIn>
              </div>

              <AnimateIn animation="slide-up" delay={0.4} className="mt-8 pt-8 border-t border-[#1e1e1e]">
                <p className="text-xs text-[#444] uppercase tracking-widest font-medium mb-3">Sources</p>
                <ul className="space-y-1.5 text-xs text-[#555]">
                  <li>CYP2C19 Pharmacogenomics · St. Jude Children&apos;s Research Hospital</li>
                  <li>MDPI Journal of Personalized Medicine, 2018</li>
                  <li>NCBI Medical Genetics Summaries · NBK84114</li>
                </ul>
              </AnimateIn>
            </div>

            <div className="space-y-px">
              {[
                { label: "Poor metabolizers — Europeans & African Americans", stat: "2–4%", sub: "Significantly reduced Clopidogrel efficacy" },
                { label: "Poor metabolizers — Chinese population", stat: "14%", sub: "Seven times the European rate — same drug, different outcome" },
                { label: "Intermediate metabolizers — East Asians", stat: "45%+", sub: "Reduced drug activation across the majority of this population" },
                { label: "EGFR-targeted lung cancer non-responders", stat: "~10%", sub: "Distinct mutations mean standard therapy provides little benefit" },
              ].map((item, i) => (
                <AnimateIn key={i} animation="scale-reveal" delay={i * 0.1} className="bg-[#111] border border-[#1e1e1e] p-6">
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-2">{item.label}</p>
                  <p className="text-4xl font-bold tracking-tight">{item.stat}</p>
                  <p className="text-xs text-[#666] mt-2 leading-relaxed">{item.sub}</p>
                </AnimateIn>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN: Scale from bottom reveal ───────────────────── */}
      <section className="py-24 px-6 border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="text-center mb-16">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
              Now Open
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Two ways to join the movement
            </h2>
            <p className="text-sm text-[#888] mt-4 max-w-xl mx-auto leading-relaxed">
              Applications are open today. The cohort is highly selective.
              The newsletter is open to everyone.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
            <AnimateIn animation="slide-up" delay={0.1} className="bg-[#0a0a0a] p-10 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">For researchers</p>
                  <h3 className="text-xl font-semibold">Research Cohort</h3>
                </div>
                <span className="mt-1 px-2.5 py-0.5 border border-[#2a2a2a] rounded-sm text-xs text-[#555]">Selective</span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-8">
                Join a vetted community of researchers, clinicians, and scientists working on
                underserved populations. Your work will be featured, amplified, and connected
                to advocates who need it most.
              </p>
              <ul className="space-y-3 mb-10 flex-1">
                {["Open to researchers at any career stage", "Highly selective — quality over quantity", "Work featured in The 10% Newsletter", "Network of aligned scientists and advocates"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <span className="mt-1.5 w-1 h-1 bg-[#555] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/research" className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors w-fit">
                View Cohort Details →
              </Link>
            </AnimateIn>

            <AnimateIn animation="slide-up" delay={0.2} className="bg-[#0a0a0a] p-10 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">For everyone</p>
                  <h3 className="text-xl font-semibold">The 10% Newsletter</h3>
                </div>
                <span className="mt-1 px-2.5 py-0.5 border border-[#2a2a2a] rounded-sm text-xs text-[#555]">Open</span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-8">
                Submit research, case studies, or perspective pieces to The 10% — a curated
                digest featuring emerging evidence on underserved populations and neglected
                therapeutic challenges.
              </p>
              <ul className="space-y-3 mb-10 flex-1">
                {["Submissions open to any researcher or writer", "Curated, edited, and fact-checked by our team", "Reach researchers, patients, and advocates worldwide", "Feature work like Clopidogrel + CYP2C19"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <span className="mt-1.5 w-1 h-1 bg-[#555] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/newsletter" className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-[#2a2a2a] text-white rounded-sm hover:bg-[#111] transition-colors w-fit">
                View Newsletter Details →
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW: Iris reveal photos ────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left" className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">Founded by</p>
              <h2 className="text-2xl font-semibold tracking-tight">The People Behind the Movement</h2>
            </div>
            <Link href="/team" className="text-sm text-[#888] hover:text-white transition-colors hidden sm:inline">
              Meet the team →
            </Link>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1e1e]">
            {[
              { name: "Aaryan Senthilvanan", role: "Co-Founder", affiliations: "Founder @ SYALIS Labs · Intern @ Palisades Therapeutics", initials: "AS", linkedin: "https://www.linkedin.com/in/aaryan-senthilvanan/" },
              { name: "Chloe", role: "Co-Founder", affiliations: "Intern @ Stanford School of Medicine · Hillbrook School", initials: "C", linkedin: "https://www.linkedin.com/in/chloe-scott-161758290/" },
              { name: "Buno", role: "Co-Founder", affiliations: "Intern @ MIT · Founder @ Synthica", initials: "B", linkedin: "https://www.linkedin.com/in/buiducquang/" },
            ].map((founder, i) => (
              <AnimateIn key={founder.name} animation="rotate-in" delay={i * 0.14} className="bg-[#0a0a0a] p-8">
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="block group">
                  {/* Rotating avatar */}
                  <div className="relative w-20 h-20 mb-5">
                    <div
                      className="absolute inset-0 rounded-full spin-ring"
                      style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.2) 28%, rgba(255,255,255,0.05) 48%, transparent 68%)" }}
                    />
                    <div className="absolute inset-[1.5px] rounded-full bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-lg font-semibold text-white/35 italic" style={{ fontFamily: "var(--font-serif)" }}>
                        {founder.initials}
                      </span>
                    </div>
                  </div>
                  <p className="text-base font-medium mb-0.5 group-hover:text-white/80 transition-colors">{founder.name}</p>
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-3">{founder.role}</p>
                  <p className="text-xs text-[#666] leading-relaxed mb-4">{founder.affiliations}</p>
                  <p className="text-xs text-[#444] group-hover:text-white/50 transition-colors">LinkedIn ↗</p>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <ScrollPopup />
    </div>
  );
}
