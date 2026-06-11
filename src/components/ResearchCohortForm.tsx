"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { upload } from "@vercel/blob/client";

type FormState = "idle" | "uploading" | "submitting" | "success" | "error";

const CAREER_STAGES = [
  "High School Student",
  "Undergraduate Student",
  "Graduate / PhD Student",
  "Postdoctoral Researcher",
  "Faculty / Principal Investigator",
  "Independent Researcher",
  "Clinician / Physician",
  "Science Writer",
  "Other",
];

export default function ResearchCohortForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("uploading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = fileRef.current?.files?.[0];

    let resumeUrl = "";

    try {
      if (file) {
        if (file.size > 20 * 1024 * 1024) {
          setState("error");
          setErrorMessage("Resume/CV must be under 20MB.");
          return;
        }
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        resumeUrl = blob.url;
      }

      setState("submitting");

      const payload = {
        type: "research",
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        institution: formData.get("institution"),
        careerStage: formData.get("careerStage"),
        researchField: formData.get("researchField"),
        researchFocus: formData.get("researchFocus"),
        underservedPopulation: formData.get("underservedPopulation"),
        significantWork: formData.get("significantWork"),
        contribution: formData.get("contribution"),
        scienceGetsWrong: formData.get("scienceGetsWrong") || "",
        linkedin: formData.get("linkedin") || "",
        website: formData.get("website") || "",
        resumeUrl,
      };

      const res = await fetch("/api/submit-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Submission failed. Please try again.");

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-[#1e1e1e] p-12 bg-[#0a0a0a] text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-green-900/50 rounded-full bg-green-950/20 text-xs text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Application received
        </div>
        <h3 className="text-xl font-semibold mb-3">You&apos;re in the queue.</h3>
        <p className="text-sm text-[#888] max-w-md mx-auto leading-relaxed">
          We&apos;ve received your application to the Research Cohort. Our team reviews every
          submission carefully — expect to hear from us before the July 1st deadline.
        </p>
      </div>
    );
  }

  const busy = state === "uploading" || state === "submitting";
  const statusLabel = state === "uploading" ? "Uploading file..." : state === "submitting" ? "Submitting..." : "Submit Application →";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Duplicate disclaimer */}
      <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-4 rounded-sm">
        <p className="text-xs text-[#555] leading-relaxed">
          <span className="text-[#777] font-medium">Note on resubmission:</span> If you submit twice using the same email address, only your most recent submission will be retained — your previous entry will be automatically replaced. This lets you update your application at any time before the deadline.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            First Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="First"
          />
        </div>
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Last Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            required
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="Last"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="you@institution.edu"
          />
        </div>
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Institution / Affiliation <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="institution"
            required
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="University, hospital, or independent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Career Stage <span className="text-red-700">*</span>
          </label>
          <select
            name="careerStage"
            required
            defaultValue=""
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#555] transition-colors appearance-none disabled:opacity-50"
          >
            <option value="" disabled>Select stage</option>
            {CAREER_STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Field of Research <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="researchField"
            required
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="e.g. Pharmacogenomics, Rare Disease..."
          />
        </div>
      </div>

      {/* Substantive questions — casual phrasing, high signal */}
      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          What problem are you trying to solve? <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">In your own words. No jargon required — just tell us what you&apos;re working on and why it matters to you.</p>
        <textarea
          name="researchFocus"
          required
          rows={4}
          disabled={busy}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="Describe your research focus..."
        />
      </div>

      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          Who is your research for, and why are they being missed? <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">Describe the population, condition, or scientific gap at the center of your work — and why the mainstream has overlooked it.</p>
        <textarea
          name="underservedPopulation"
          required
          rows={4}
          disabled={busy}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="Describe the population or gap..."
        />
      </div>

      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          Walk us through your strongest piece of work. <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">What you found, how you found it, and what it means for the people it affects. Be specific — methodology, findings, implications.</p>
        <textarea
          name="significantWork"
          required
          rows={5}
          disabled={busy}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="Describe your most significant work..."
        />
      </div>

      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          How does your work connect to what The 10% Movement is doing? <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">Not a pitch — just how you genuinely see your research fitting with what we&apos;re building.</p>
        <textarea
          name="contribution"
          required
          rows={3}
          disabled={busy}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="How your work connects..."
        />
      </div>

      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          What&apos;s one assumption in your field you think is wrong?
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">Optional — but this is the response we read most carefully. A methodology, a consensus, a gap that the majority is ignoring.</p>
        <textarea
          name="scienceGetsWrong"
          rows={3}
          disabled={busy}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="Optional, but tells us the most..."
        />
      </div>

      {/* Resume upload */}
      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          Resume / CV <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">
          PDF, DOC, or DOCX — max 20MB.{" "}
          <span className="text-[#777]">
            By uploading, you grant The 10% Movement permission to access and review your file. Please ensure your file is not password-protected.
          </span>
        </p>
        <div
          className="border border-dashed border-[#2a2a2a] p-6 text-center cursor-pointer hover:border-[#444] transition-colors"
          onClick={() => !busy && fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            name="resume"
            required
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          {fileName ? (
            <div>
              <p className="text-sm text-white">{fileName}</p>
              <p className="text-xs text-[#555] mt-1">Click to change</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#555]">Click to upload your resume / CV</p>
              <p className="text-xs text-[#333] mt-1">PDF, DOC, DOCX — max 20MB</p>
            </>
          )}
        </div>
      </div>

      {/* Optional links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin"
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Personal / Lab Website
          </label>
          <input
            type="url"
            name="website"
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="https://..."
          />
        </div>
      </div>

      {state === "error" && (
        <p className="text-sm text-red-500 border border-red-900/40 bg-red-950/20 px-4 py-3">{errorMessage}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#1e1e1e]">
        <p className="text-xs text-[#444]">Applications close July 1, 2026</p>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium bg-white text-black rounded-sm hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {statusLabel}
        </button>
      </div>
    </form>
  );
}
