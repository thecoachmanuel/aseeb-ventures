import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { createSessionToken, setAuthCookieOnResponse } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, password, company, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      company,
      phone,
      role: "client",
    });

    const sessionUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = createSessionToken(sessionUser);
    const response = NextResponse.json({ user: sessionUser }, { status: 201 });
    setAuthCookieOnResponse(response, token);

    sendWelcomeEmail({ name: user.name, email: user.email });

    return response;
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
