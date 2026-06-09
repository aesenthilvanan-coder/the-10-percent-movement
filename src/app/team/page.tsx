import type { Metadata } from "next";
import FounderImage from "@/components/FounderImage";

export const metadata: Metadata = {
  title: "Team — The 10% Movement",
  description:
    "Meet the founders of The 10% Movement.",
};

const founders = [
  {
    name: "Aaryan Senthilvanan",
    role: "Co-Founder",
    img: "/images/aaryan.jpg",
    initials: "AS",
    affiliations: [
      "Founder @ SYALIS Labs",
      "Intern @ Palisades Therapeutics",
      "Stanford",
      "Caltech",
    ],
    bio: "Aaryan works at the intersection of computational biology and translational medicine. Through SYALIS Labs, he is building tools to accelerate research at the frontier of neglected biology. His work at Palisades Therapeutics deepened his conviction that the most important problems in medicine are the ones that affect the fewest people — and that those problems deserve the same rigor applied to blockbuster therapies. The 10% Movement is the platform he felt was missing.",
  },
  {
    name: "Chloe",
    role: "Co-Founder",
    img: "/images/chloe.jpg",
    initials: "C",
    affiliations: ["Intern @ Stanford", "Creator of Francesca"],
    bio: "Chloe brings a research background in biomedical science and a rare ability to communicate complex science clearly. Her work at Stanford has taken her to the edges of what medicine knows and doesn't know — and she's most interested in the latter. She believes that scientific communication is not a soft skill but a structural requirement for evidence to reach the people who need it. She is also the proud creator of Francesca.",
  },
  {
    name: "Buno",
    role: "Co-Founder",
    img: "/images/buno.jpg",
    initials: "B",
    affiliations: ["Intern @ MIT", "Founder @ Synthica"],
    bio: "Buno founded Synthica to address gaps in how biological data is structured and accessed for research. His time at MIT has been shaped by a recurring observation: the most interesting science is often the science that's hardest to find, hardest to fund, and hardest to publish. The 10% Movement is his answer to that — a platform that makes underserved research visible, accessible, and actionable.",
  },
];

export default function Team() {
  return (
    <div>
      {/* PAGE HEADER */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] font-medium mb-4">
            Team
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
            Three founders.{" "}
            <span className="text-[#555]">One conviction.</span>
          </h1>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-20 px-6 border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto space-y-px">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#1e1e1e]"
            >
              {/* Photo + identity */}
              <div className="bg-[#0a0a0a] p-8 flex flex-col items-start">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-5 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                  <FounderImage
                    src={founder.img}
                    alt={founder.name}
                    initials={founder.initials}
                    size={80}
                  />
                </div>
                <p className="text-lg font-semibold mb-0.5">{founder.name}</p>
                <p className="text-xs text-[#555] uppercase tracking-widest font-medium mb-5">
                  {founder.role}
                </p>
                <div className="space-y-1.5">
                  {founder.affiliations.map((aff) => (
                    <p key={aff} className="text-xs text-[#666] leading-relaxed">
                      {aff}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="bg-[#0a0a0a] md:col-span-3 p-8 flex items-center">
                <p className="text-sm text-[#888] leading-relaxed">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-l-2 border-[#2a2a2a] pl-8 max-w-2xl">
            <p className="text-[#555] text-xs uppercase tracking-widest font-medium mb-4">
              From the founders
            </p>
            <p className="text-base text-[#888] leading-relaxed mb-6">
              We started The 10% Movement because we kept encountering the same gap:
              rigorous science on underserved populations, buried in journals, disconnected
              from the researchers and patients who needed it most.
            </p>
            <p className="text-base text-[#888] leading-relaxed mb-6">
              The pharmacogenomics literature on Clopidogrel non-responders has existed
              for years. The data on EGFR non-responders in lung cancer has existed for years.
              The rare disease research has existed — in fragments, in specialized journals,
              in conference proceedings that never reach clinicians.
            </p>
            <p className="text-base text-[#888] leading-relaxed">
              The 10% Movement is the infrastructure layer that was missing. We are building
              the platform, the community, and the publication channel that ensures this
              science reaches the people who can act on it.
            </p>
            <p className="mt-6 text-sm font-medium text-[#666]">
              — Aaryan, Chloe, and Buno
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
