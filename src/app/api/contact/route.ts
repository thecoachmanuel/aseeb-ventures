export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactSubmission } from "@/models/ContactSubmission";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, company, message, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const submission = await ContactSubmission.create({
      name,
      email,
      phone,
      company,
      message,
      service,
      status: "new",
    });

    sendContactNotification({ name, email, phone, company, message, service });

    return NextResponse.json({ success: true, id: submission._id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
