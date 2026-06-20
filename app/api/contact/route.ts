import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const body: ContactPayload = await req.json();
    const { name, email, company, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Log the inquiry server-side (swap for email/DB integration later)
    console.log("[Contact Form Submission]", {
      name,
      email,
      company: company || "N/A",
      message,
      receivedAt: new Date().toISOString(),
    });

    // TODO: Add email sending or database storage here
    // e.g. await sendEmail({ to: "inquiries@skillcommerce.com", from: email, ... })

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
