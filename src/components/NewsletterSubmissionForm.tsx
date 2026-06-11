"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { upload } from "@vercel/blob/client";

type FormState = "idle" | "uploading" | "submitting" | "success" | "error";

const SUBMISSION_TYPES = [
  "Research Summary",
  "Case Study",
  "Perspective Piece",
  "Data Brief",
  "Original Research Article",
  "Other",
];

export default function NewsletterSubmissionForm() {
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

    let paperUrl = "";

    try {
      if (file) {
        if (file.size > 50 * 1024 * 1024) {
          setState("error");
          setErrorMessage("PDF must be under 50MB.");
          return;
        }
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        paperUrl = blob.url;
      }

      setState("submitting");

      const payload = {
        type: "newsletter",
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        bio: formData.get("bio"),
        submissionType: formData.get("submissionType"),
        title: formData.get("title"),
        abstract: formData.get("abstract"),
        paperUrl,
        compliance: formData.get("compliance") === "on",
      };

      const res = await fetch("/api/submit-newsletter", {
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
          Submission received
        </div>
        <h3 className="text-xl font-semibold mb-3">We&apos;ve got it.</h3>
        <p className="text-sm text-[#888] max-w-md mx-auto leading-relaxed">
          Your submission to The 10% Newsletter is in review. Our editorial team goes through
          every piece carefully. Expect to hear from us before the July 15th deadline.
        </p>
      </div>
    );
  }

  const busy = state === "uploading" || state === "submitting";
  const statusLabel = state === "uploading" ? "Uploading file..." : state === "submitting" ? "Submitting..." : "Submit Work →";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Duplicate disclaimer */}
      <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-4 rounded-sm">
        <p className="text-xs text-[#555] leading-relaxed">
          <span className="text-[#777] font-medium">Note on resubmission:</span> If you submit twice using the same email address, only your most recent submission will be kept — your previous entry is automatically replaced. Use this if you need to update your work before the deadline.
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
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          Short Author Bio <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">2–3 sentences. Used as your byline if your piece is published. Include your role, affiliation, and what you work on.</p>
        <textarea
          name="bio"
          required
          rows={3}
          disabled={busy}
          maxLength={600}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="e.g. PhD candidate in pharmacogenomics at [University], researching CYP2C19 variant prevalence in East Asian populations..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Submission Type <span className="text-red-700">*</span>
          </label>
          <select
            name="submissionType"
            required
            defaultValue=""
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#555] transition-colors appearance-none disabled:opacity-50"
          >
            <option value="" disabled>Select type</option>
            {SUBMISSION_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-2">
            Title of Submission <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            disabled={busy}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors disabled:opacity-50"
            placeholder="Full title of your work"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          Abstract / Summary <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">150–300 words. Summarize your work — the question, the key evidence, and why it matters for underserved populations.</p>
        <textarea
          name="abstract"
          required
          rows={5}
          disabled={busy}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors resize-y disabled:opacity-50"
          placeholder="Summarize your work in 150–300 words..."
        />
      </div>

      {/* PDF upload */}
      <div>
        <label className="block text-xs text-[#555] uppercase tracking-widest font-medium mb-1.5">
          Full PDF Paper / Article <span className="text-red-700">*</span>
        </label>
        <p className="text-xs text-[#444] mb-3 leading-relaxed">
          PDF only — up to 50MB.{" "}
          <span className="text-[#777]">
            By uploading, you grant The 10% Movement permission to access and review your file for editorial consideration. Please ensure your PDF is not password-protected so our team can open it.
          </span>
        </p>
        <div
          className="border border-dashed border-[#2a2a2a] p-6 text-center cursor-pointer hover:border-[#444] transition-colors"
          onClick={() => !busy && fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            name="paper"
            required
            accept=".pdf"
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
              <p className="text-sm text-[#555]">Click to upload your PDF</p>
              <p className="text-xs text-[#333] mt-1">PDF only — up to 50MB</p>
            </>
          )}
        </div>
      </div>

      {/* Compliance checkbox */}
      <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
        <label className="flex items-start gap-4 cursor-pointer group">
          <input
            type="checkbox"
            name="compliance"
            required
            disabled={busy}
            className="mt-0.5 w-4 h-4 accent-white flex-shrink-0"
          />
          <span className="text-sm text-[#888] leading-relaxed group-hover:text-[#aaa] transition-colors">
            My submission focuses on underserved minority populations, rare conditions, or scientific modalities neglected by majority-focused science. I align with the mission of The 10% Movement — to ensure research serves everyone, not only those represented by the statistical majority.{" "}
            <span className="text-red-700">*</span>
          </span>
        </label>
      </div>

      {state === "error" && (
        <p className="text-sm text-red-500 border border-red-900/40 bg-red-950/20 px-4 py-3">{errorMessage}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#1e1e1e]">
        <p className="text-xs text-[#444]">Submissions close July 15, 2026</p>
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
