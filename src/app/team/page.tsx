import type { Metadata } from "next";
import FounderImage from "@/components/FounderImage";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team — The 10% Movement",
  description: "Meet the founders of The 10% Movement.",
};

const founders = [
  {
    name: "Aaryan Senthilvanan",
    role: "Co-Founder",
    age: "16",
    img: "/images/aaryan.jpg",
    initials: "AS",
    affiliations: ["Founder @ SYALIS Labs", "Intern @ Palisades Therapeutics", "Stanford", "Caltech"],
    contact: null,
    bio: "Aaryan is a 16-year-old self-taught researcher with a singular focus: making medicine work for everyone it currently fails. Trained in Python and R without formal instruction, he has published three times in peer-reviewed journals and holds an accepted paper in Springer Nature and Nature Biotechnology. His research spans neuropharmacology, protein-based platforms, and computational simulation for drug discovery, producing systems including TRC-TopoGen, REFOLD, ORACLE, and InteractionFormer. He has presented at IEEE, Johns Hopkins, and Stanford conferences. Outside the lab, he founded InteractionFormer and BravizineOS, both in active partnership with Stanford and Harvard affiliates, and runs a research mentorship organization with an 8% acceptance rate, 200 active students, and 13 mentors. He founded The 10% Movement because the gaps he kept encountering in how science treats outlier populations demanded a platform, not just a paper.",
  },
  {
    name: "Chloe",
    role: "Co-Founder",
    age: "17",
    img: "/images/chloe.jpg",
    initials: "C",
    affiliations: ["Intern @ Stanford School of Medicine", "Hillbrook School", "Co-Founder @ Nexus Autonomous Biotherapeutics"],
    contact: "cscott2027@hillbrook.org",
    bio: "Chloe is 17 and has spent most of the last two years thinking about what happens to heart tissue after an ischemic event. She researches cardiac biomaterials at Stanford School of Medicine's Woo Lab, focusing on vasculature fabrication and bioprinter design. She is currently building her own bioprinter from scratch. Alongside that work, she is independently developing a neural network-guided conductive hydrogel for real-time ischemia detection and autonomous intervention, sitting at the intersection of smart materials and implantable diagnostics. She co-founded Nexus Autonomous Biotherapeutics and has been recognized by IEEE, NASA, MIT THINK, and the Conrad Challenge. She has also researched gender bias in LLM-driven clinical diagnostics through UPenn's Social Innovators Program. Open to research collaborations and conversations at the edge of biomaterials and bioelectronics.",
  },
  {
    name: "Buno",
    role: "Co-Founder",
    age: null,
    img: "/images/buno.jpg",
    initials: "B",
    affiliations: ["Intern @ MIT", "Founder @ Synthica"],
    contact: "quang@synthica.org",
    bio: "Buno is an AI and machine learning researcher and builder. Through Synthica, he is building infrastructure for the next generation of biological data systems. His time at MIT reinforced a recurring observation: the most consequential science is often the hardest to find, fund, and amplify. The 10% Movement is his answer to that. He joined because the platform was missing, and building it was the right use of his time.",
  },
];

export default function Team() {
  return (
    <div>
      {/* PAGE HEADER */}
      <section className="py-20 px-6 border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn animation="reveal-left">
            <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">Team</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
              Three founders.{" "}
              <span className="text-[#555]">One conviction.</span>
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto space-y-px">
          {founders.map((founder, fi) => (
            <AnimateIn key={founder.name} animation="slide-up" delay={fi * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#1e1e1e]">
                {/* Photo + identity */}
                <div className="bg-[#0a0a0a] md:col-span-2 p-8 flex flex-col items-start">
                  <AnimateIn
                    animation="iris-reveal"
                    className="w-40 h-40 rounded-full overflow-hidden mb-6 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0"
                  >
                    <FounderImage
                      src={founder.img}
                      alt={founder.name}
                      initials={founder.initials}
                      size={160}
                    />
                  </AnimateIn>
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
                  {founder.contact && (
                    <Link
                      href={`mailto:${founder.contact}`}
                      className="text-xs text-[#888] hover:text-white transition-colors underline underline-offset-2"
                    >
                      {founder.contact}
                    </Link>
                  )}
                </div>

                {/* Bio */}
                <div className="bg-[#0a0a0a] md:col-span-3 p-8 flex items-start pt-12 md:pt-8">
                  <p className="text-sm text-[#888] leading-[1.9] max-w-xl">{founder.bio}</p>
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
          <AnimateIn animation="slide-up" delay={0.15}>
            <p
              className="text-2xl md:text-3xl italic text-black/80 leading-relaxed max-w-3xl mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;We kept encountering the same gap: rigorous science on underserved
              populations, buried in journals, disconnected from the researchers and
              patients who needed it most.&rdquo;
            </p>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.25}>
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
          <AnimateIn animation="slide-up" delay={0.1}>
            <Link
              href="/research"
              className="inline-flex items-center px-6 py-3 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors"
            >
              Join the Research Cohort →
            </Link>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.2}>
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
