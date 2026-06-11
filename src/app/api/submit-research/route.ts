import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const webhookUrl = process.env.APPS_SCRIPT_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Submission service is not configured yet. Please contact us directly." },
        { status: 503 }
      );
    }

    const payload = {
      type: "research",
      firstName: String(data.firstName || "").trim(),
      lastName: String(data.lastName || "").trim(),
      email: String(data.email || "").trim().toLowerCase(),
      institution: String(data.institution || "").trim(),
      careerStage: String(data.careerStage || "").trim(),
      researchField: String(data.researchField || "").trim(),
      researchFocus: String(data.researchFocus || "").trim(),
      underservedPopulation: String(data.underservedPopulation || "").trim(),
      significantWork: String(data.significantWork || "").trim(),
      contribution: String(data.contribution || "").trim(),
      scienceGetsWrong: String(data.scienceGetsWrong || "").trim(),
      linkedin: String(data.linkedin || "").trim(),
      website: String(data.website || "").trim(),
      resumeUrl: String(data.resumeUrl || "").trim(),
    };

    // Validate required fields
    const required = ["firstName", "lastName", "email", "institution", "careerStage", "researchField", "researchFocus", "underservedPopulation", "significantWork", "contribution"] as const;
    for (const field of required) {
      if (!payload[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let result: { success: boolean; error?: string };
    try {
      result = await response.json();
    } catch {
      result = { success: response.ok };
    }

    if (!result.success) {
      console.error("Apps Script error:", result.error);
      return NextResponse.json({ success: false, error: "Failed to save submission. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Research submission error:", err);
    return NextResponse.json({ success: false, error: "Internal error. Please try again." }, { status: 500 });
  }
}
