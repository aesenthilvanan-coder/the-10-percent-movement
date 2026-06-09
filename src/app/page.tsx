import Image from "next/image";
import Link from "next/link";
import FounderImage from "@/components/FounderImage";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-[#1e1e1e]">
        {/* Background subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 border border-[#2a2a2a] rounded-full bg-[#111] text-xs text-[#888] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            Cohort & newsletter submissions open June 11, 2026
          </div>

          {/* Main heading */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-6">
            10%
          </h1>

          <p className="text-lg md:text-xl font-light tracking-wider text-[#888] mb-2 uppercase">
            The 10% Movement
          </p>

          <p className="text-xs text-[#444] uppercase tracking-[0.3em] font-medium mb-12">
            — Because 90% isn&apos;t enough. —
          </p>

          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl mx-auto mb-12">
            A research-driven initiative dedicated to the patients, populations, and biological
            outliers often overlooked by majority-focused science. Through curated research digests,
            scientific communication, and a growing community, we ensure the 10% are never
            an afterthought.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/research"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors"
            >
              Join the Research Cohort
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-[#2a2a2a] text-[#ccc] rounded-sm hover:bg-[#111] hover:text-white transition-colors"
            >
              Read The 10% Newsletter
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <div className="w-px h-10 bg-white" />
        </div>
      </section>

      {/* MISSION PILLARS */}
      <section className="py-24 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Science moves fastest for the majority.{" "}
              <span className="text-[#555]">We move for everyone else.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
            {[
              {
                number: "01",
                title: "Research Digests",
                description:
                  "Curated, peer-reviewed summaries of emerging evidence on underserved populations and neglected therapeutic challenges. Published by vetted researchers.",
              },
              {
                number: "02",
                title: "Scientific Communication",
                description:
                  "Translating complex pharmacogenomic, rare disease, and population-specific research into accessible, rigorous content for researchers and advocates alike.",
              },
              {
                number: "03",
                title: "Research Community",
                description:
                  "A selective cohort of researchers, clinicians, and advocates committed to advancing science for the biological outliers conventional medicine overlooks.",
              },
            ].map((pillar) => (
              <div key={pillar.number} className="bg-[#0a0a0a] p-8 md:p-10">
                <p className="text-xs text-[#333] font-mono mb-6">{pillar.number}</p>
                <h3 className="text-base font-semibold mb-3">{pillar.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAGSHIP CASE STUDY */}
      <section className="py-24 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Editorial narrative */}
            <div>
              <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
                Flagship Case Study
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight">
                The drug worked for 90%.{" "}
                <span className="text-[#555]">The other 10% were left at risk.</span>
              </h2>

              <div className="space-y-5 text-sm text-[#888] leading-relaxed">
                <p>
                  A patient has a heart attack. Doctors prescribe Clopidogrel (Plavix) — one of
                  the most common blood-thinning drugs in the world. For most patients, it works.
                </p>
                <p>
                  But a significant minority carry variants of the{" "}
                  <span className="text-white font-medium">CYP2C19</span> gene that prevent them
                  from converting Clopidogrel into its active form. For these patients, the
                  drug is literally less effective — or may barely work at all.
                </p>
                <p>
                  The result? The therapy that protects the majority can leave a genetically
                  distinct subgroup at{" "}
                  <span className="text-white">
                    increased risk of stroke, stent thrombosis, or recurrent cardiovascular events.
                  </span>
                </p>
                <blockquote className="border-l-2 border-[#333] pl-4 py-1 my-6">
                  <p className="text-[#666] italic">
                    &ldquo;The average patient was protected. The outlier patient was overlooked.&rdquo;
                  </p>
                </blockquote>
                <p className="text-[#555]">
                  This is exactly the kind of story The 10% Movement exists to surface — and
                  to fund the science that addresses it.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[#1e1e1e]">
                <p className="text-xs text-[#444] uppercase tracking-widest font-medium mb-3">
                  Sources
                </p>
                <ul className="space-y-1.5 text-xs text-[#555] leading-relaxed">
                  <li>CYP2C19 Pharmacogenomics · St. Jude Research</li>
                  <li>MDPI Journal of Personalized Medicine, 2018</li>
                  <li>NCBI Medical Genetics Summaries · NBK84114</li>
                </ul>
              </div>
            </div>

            {/* Stats panel */}
            <div className="space-y-px">
              {[
                {
                  label: "Poor metabolizers — Europeans & African Americans",
                  stat: "2–4%",
                  sub: "CYP2C19 poor metabolizers with significantly reduced Clopidogrel efficacy",
                },
                {
                  label: "Poor metabolizers — Chinese population",
                  stat: "14%",
                  sub: "Of Chinese individuals are poor metabolizers — seven times the European rate",
                },
                {
                  label: "Intermediate metabolizers — East Asians",
                  stat: "45%+",
                  sub: "Of East Asians have reduced drug activation; the majority in this group are affected",
                },
                {
                  label: "EGFR-targeted lung cancer non-responders",
                  stat: "~10%",
                  sub: "Receive little benefit from standard targeted therapies due to distinct mutations",
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#111] border border-[#1e1e1e] p-6">
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
                    {item.label}
                  </p>
                  <p className="text-4xl font-bold tracking-tight">{item.stat}</p>
                  <p className="text-xs text-[#666] mt-2 leading-relaxed">{item.sub}</p>
                </div>
              ))}

              {/* Diagram */}
              <div className="bg-[#111] border border-[#1e1e1e] p-6">
                <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-4">
                  DNA Profiling & Treatment Response
                </p>
                <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-white">
                  <Image
                    src="/images/pharmacogenomics.jpg"
                    alt="Diagram showing how DNA profiling stratifies patients into good response, no response, and bad side effects groups"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JUNE 11 OPENINGS */}
      <section className="py-24 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
              Opening June 11, 2026
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Two ways to join the movement
            </h2>
            <p className="text-sm text-[#888] mt-4 max-w-xl mx-auto leading-relaxed">
              Both open simultaneously on June 11th. The cohort is highly selective.
              The newsletter is open to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
            {/* Research Cohort */}
            <div className="bg-[#0a0a0a] p-10 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
                    For researchers
                  </p>
                  <h3 className="text-xl font-semibold">Research Cohort</h3>
                </div>
                <span className="mt-1 px-2.5 py-0.5 border border-[#2a2a2a] rounded-sm text-xs text-[#555]">
                  Selective
                </span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-8">
                Join a vetted community of researchers, clinicians, and scientists working on
                underserved populations. Your work will be featured, amplified, and connected
                to advocates who need it most.
              </p>
              <ul className="space-y-3 mb-10 flex-1">
                {[
                  "Open to researchers at any career stage",
                  "Highly selective — quality over quantity",
                  "Work featured in The 10% Newsletter",
                  "Network of aligned scientists and advocates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <span className="mt-1.5 w-1 h-1 bg-[#555] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/research"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors w-fit"
              >
                View Cohort Details →
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-[#0a0a0a] p-10 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
                    For everyone
                  </p>
                  <h3 className="text-xl font-semibold">The 10% Newsletter</h3>
                </div>
                <span className="mt-1 px-2.5 py-0.5 border border-[#2a2a2a] rounded-sm text-xs text-[#555]">
                  Open
                </span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-8">
                Submit research, case studies, or perspective pieces to The 10% — a curated
                digest featuring emerging evidence on underserved populations and neglected
                therapeutic challenges.
              </p>
              <ul className="space-y-3 mb-10 flex-1">
                {[
                  "Submissions open to any researcher or writer",
                  "Curated, edited, and fact-checked by our team",
                  "Reach researchers, patients, and advocates worldwide",
                  "Feature work like the Clopidogrel + CYP2C19 story",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <span className="mt-1.5 w-1 h-1 bg-[#555] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/newsletter"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-[#2a2a2a] text-white rounded-sm hover:bg-[#111] transition-colors w-fit"
              >
                View Newsletter Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-3">
                Founded by
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                The People Behind the Movement
              </h2>
            </div>
            <Link
              href="/team"
              className="text-sm text-[#888] hover:text-white transition-colors hidden sm:inline"
            >
              Meet the team →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1e1e]">
            {[
              {
                name: "Aaryan Senthilvanan",
                role: "Co-Founder",
                affiliations:
                  "Founder @ SYALIS Labs · Intern @ Palisades Therapeutics · Stanford · Caltech",
                initials: "AS",
                img: "/images/aaryan.jpg",
              },
              {
                name: "Chloe",
                role: "Co-Founder",
                affiliations: "Intern @ Stanford · Creator of Francesca",
                initials: "C",
                img: "/images/chloe.jpg",
              },
              {
                name: "Buno",
                role: "Co-Founder",
                affiliations: "Intern @ MIT · Founder @ Synthica",
                initials: "B",
                img: "/images/buno.jpg",
              },
            ].map((founder) => (
              <div key={founder.name} className="bg-[#0a0a0a] p-8">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-5 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                  <FounderImage
                    src={founder.img}
                    alt={founder.name}
                    initials={founder.initials}
                    size={48}
                  />
                </div>
                <p className="text-base font-medium mb-0.5">{founder.name}</p>
                <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-3">
                  {founder.role}
                </p>
                <p className="text-xs text-[#666] leading-relaxed">{founder.affiliations}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link href="/team" className="text-sm text-[#888] hover:text-white transition-colors">
              Meet the full team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
