import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  try {
    await connectDB();
    const dbUser = await User.findById(session.id).select("name email role image company phone").lean();
    return NextResponse.json({
      user: dbUser
        ? { id: dbUser._id.toString(), email: dbUser.email, name: dbUser.name, role: dbUser.role, image: dbUser.image }
        : session,
    });
  } catch {
    return NextResponse.json({ user: session });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await connectDB();
    const { name, company, phone } = await request.json();

    const user = await User.findById(session.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (name) user.name = name;
    if (company !== undefined) user.company = company;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        company: user.company,
        phone: user.phone,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
