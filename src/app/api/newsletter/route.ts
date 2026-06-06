import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
    }

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    await NewsletterSubscriber.create({
      firstName,
      lastName,
      email,
      phone,
      isActive: true,
      subscribedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
