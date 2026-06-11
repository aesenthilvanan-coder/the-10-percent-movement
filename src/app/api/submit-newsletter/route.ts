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
      type: "newsletter",
      firstName: String(data.firstName || "").trim(),
      lastName: String(data.lastName || "").trim(),
      email: String(data.email || "").trim().toLowerCase(),
      bio: String(data.bio || "").trim(),
      submissionType: String(data.submissionType || "").trim(),
      title: String(data.title || "").trim(),
      abstract: String(data.abstract || "").trim(),
      paperUrl: String(data.paperUrl || "").trim(),
      compliance: Boolean(data.compliance),
    };

    // Validate required fields
    const required = ["firstName", "lastName", "email", "bio", "submissionType", "title", "abstract"] as const;
    for (const field of required) {
      if (!payload[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!payload.compliance) {
      return NextResponse.json({ success: false, error: "You must confirm alignment with the 10% Movement mission." }, { status: 400 });
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
    console.error("Newsletter submission error:", err);
    return NextResponse.json({ success: false, error: "Internal error. Please try again." }, { status: 500 });
  }
}
