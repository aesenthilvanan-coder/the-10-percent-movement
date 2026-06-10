import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import TriOrbitHero from "@/components/TriOrbitHero";

export const metadata: Metadata = {
  title: "Team — The 10% Movement",
  description: "Meet the founders of The 10% Movement.",
};

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const founders = [
  {
    name: "Aaryan Senthilvanan",
    role: "Co-Founder",
    age: "16",
    initials: "AS",
    linkedin: "https://www.linkedin.com/in/aaryan-senthilvanan/",
    affiliations: ["Founder @ SYALIS Labs", "Intern @ Palisades Therapeutics", "Stanford", "Caltech"],
    contact: null,
    bio: "Aaryan is a 16-year-old self-taught researcher with a singular focus: making medicine work for everyone it currently fails. Trained in Python and R without formal instruction, he has published three times in peer-reviewed journals and holds an accepted paper in Springer Nature and Nature Biotechnology. His research spans neuropharmacology, protein-based platforms, and computational simulation for drug discovery, producing systems including TRC-TopoGen, REFOLD, ORACLE, and InteractionFormer. He has presented at IEEE, Johns Hopkins, and Stanford conferences. Outside the lab, he founded InteractionFormer and BravizineOS, both in active partnership with Stanford and Harvard affiliates, and runs a research mentorship organization with an 8% acceptance rate, 200 active students, and 13 mentors. He founded The 10% Movement because the gaps he kept encountering in how science treats outlier populations demanded a platform, not just a paper.",
  },
  {
    name: "Chloe",
    role: "Co-Founder",
    age: "17",
    initials: "C",
    linkedin: "https://www.linkedin.com/in/chloe-scott-161758290/",
    affiliations: ["Intern @ Stanford School of Medicine", "Hillbrook School", "Co-Founder @ Nexus Autonomous Biotherapeutics"],
    contact: "cscott2027@hillbrook.org",
    bio: "Chloe is 17 and has spent most of the last two years thinking about what happens to heart tissue after an ischemic event. She researches cardiac biomaterials at Stanford School of Medicine's Woo Lab, focusing on vasculature fabrication and bioprinter design. She is currently building her own bioprinter from scratch. Alongside that work, she is independently developing a neural network-guided conductive hydrogel for real-time ischemia detection and autonomous intervention, sitting at the intersection of smart materials and implantable diagnostics. She co-founded Nexus Autonomous Biotherapeutics and has been recognized by IEEE, NASA, MIT THINK, and the Conrad Challenge. She has also researched gender bias in LLM-driven clinical diagnostics through UPenn's Social Innovators Program. Open to research collaborations and conversations at the edge of biomaterials and bioelectronics.",
  },
  {
    name: "Buno",
    role: "Co-Founder",
    age: null,
    initials: "B",
    linkedin: "https://www.linkedin.com/in/buiducquang/",
    affiliations: ["Intern @ MIT", "Founder @ Synthica"],
    contact: "quang@synthica.org",
    bio: "Buno is an AI and machine learning researcher and builder. Through Synthica, he is building infrastructure for the next generation of biological data systems. His time at MIT reinforced a recurring observation: the most consequential science is often the hardest to find, fund, and amplify. The 10% Movement is his answer to that. He joined because the platform was missing, and building it was the right use of his time.",
  },
];

export default function Team() {
  return (
    <div>
      <TriOrbitHero />

      {/* FOUNDERS */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto space-y-px">
          {founders.map((founder, fi) => (
            <AnimateIn key={founder.name} animation="flip-in" delay={fi * 0.15}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#1e1e1e]">
                {/* Avatar + identity */}
                <div className="bg-[#0a0a0a] md:col-span-2 p-8 flex flex-col items-start">

                  {/* Rotating avatar ring */}
                  <AnimateIn animation="iris-reveal" delay={fi * 0.15 + 0.2} className="mb-6">
                    <div className="relative w-40 h-40">
                      {/* Spinning conic ring */}
                      <div
                        className="absolute inset-0 rounded-full spin-ring"
                        style={{
                          background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                        }}
                      />
                      {/* Inner circle */}
                      <div className="absolute inset-[1.5px] rounded-full bg-[#0d0d0d] flex items-center justify-center">
                        <span
                          className="text-5xl text-white/25 italic select-none"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {founder.initials}
                        </span>
                      </div>
                    </div>
                  </AnimateIn>

                  <AnimateIn animation="slide-up" delay={fi * 0.15 + 0.3}>
                    <p className="text-xl font-semibold mb-0.5">{founder.name}</p>
                    {founder.age && (
                      <p className="text-xs text-[#555] mb-1">Age {founder.age}</p>
                    )}
                    <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-5">
                      {founder.role}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {founder.affiliations.map((aff) => (
                        <p key={aff} className="text-xs text-[#666] leading-relaxed">{aff}</p>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-white transition-colors border border-[#2a2a2a] hover:border-[#555] px-3 py-1.5 rounded-sm w-fit"
                      >
                        <LinkedInIcon />
                        LinkedIn ↗
                      </a>
                      {founder.contact && (
                        <Link
                          href={`mailto:${founder.contact}`}
                          className="text-xs text-[#555] hover:text-white transition-colors underline underline-offset-2 w-fit"
                        >
                          {founder.contact}
                        </Link>
                      )}
                    </div>
                  </AnimateIn>
                </div>

                {/* Bio */}
                <div className="bg-[#0a0a0a] md:col-span-3 p-8 flex items-start pt-12 md:pt-8">
                  <AnimateIn animation="blur-reveal" delay={fi * 0.15 + 0.35}>
                    <p className="text-sm text-[#888] leading-[1.9] max-w-xl">{founder.bio}</p>
                  </AnimateIn>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* FOUNDERS' NOTE — white section with serif */}
      <section className="bg-white py-24 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left">
            <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-6">
              From the founders
            </p>
          </AnimateIn>

          {/* Draw line */}
          <AnimateIn animation="draw-line" delay={0.1} className="mb-8 h-px bg-black/10" />

          <AnimateIn animation="blur-reveal" delay={0.2}>
            <p
              className="text-2xl md:text-3xl italic text-black/80 leading-relaxed max-w-3xl mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;We kept encountering the same gap: rigorous science on underserved
              populations, buried in journals, disconnected from the researchers and
              patients who needed it most.&rdquo;
            </p>
          </AnimateIn>

          <AnimateIn animation="slide-up" delay={0.35}>
            <p className="text-sm text-black/50 max-w-2xl leading-relaxed mb-4">
              The Clopidogrel and CYP2C19 data has existed for years. EGFR non-responder
              research has existed for years. Rare disease literature exists in fragments
              across specialized journals that never reach the clinicians who need them.
            </p>
            <p className="text-sm text-black/50 max-w-2xl leading-relaxed">
              The 10% Movement is the infrastructure layer that was missing. We are building
              the platform, the community, and the publication channel that ensures this
              science reaches the people who can act on it.
            </p>
            <p className="mt-6 text-sm font-medium text-black/40">Aaryan, Chloe, and Buno</p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4">
          <AnimateIn animation="rotate-in" delay={0.1}>
            <Link
              href="/research"
              className="inline-flex items-center px-6 py-3 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors"
            >
              Join the Research Cohort →
            </Link>
          </AnimateIn>
          <AnimateIn animation="rotate-in" delay={0.2}>
            <Link
              href="/newsletter"
              className="inline-flex items-center px-6 py-3 text-sm font-medium border border-[#2a2a2a] text-[#888] rounded-sm hover:text-white hover:bg-[#111] transition-colors"
            >
              Read The 10% Newsletter →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
