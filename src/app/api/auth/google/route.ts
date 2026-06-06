import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { createSessionToken, setAuthCookieOnResponse } from "@/lib/auth";

const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID!;
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface GoogleUser {
  sub: string;
  name: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    return handleCallback(code);
  }

  const redirectUri = `${SITE_URL}/api/auth/google`;
  const scope = "openid profile email";
  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

  return NextResponse.redirect(authUrl);
}

async function handleCallback(code: string) {
  try {
    const redirectUri = `${SITE_URL}/api/auth/google`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(`${SITE_URL}/login?error=google_auth_failed`);
    }

    const tokens = await tokenRes.json();

    const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${SITE_URL}/login?error=google_auth_failed`);
    }

    const googleUser: GoogleUser = await userRes.json();

    await connectDB();

    let user = await User.findOne({ email: googleUser.email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email.toLowerCase(),
        image: googleUser.picture,
        role: "client",
      });
    } else if (!user.image && googleUser.picture) {
      user.image = googleUser.picture;
      await user.save();
    }

    const sessionUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = createSessionToken(sessionUser);
    const response = NextResponse.redirect(`${SITE_URL}/dashboard`);
    setAuthCookieOnResponse(response, token);
    return response;
  } catch {
    return NextResponse.redirect(`${SITE_URL}/login?error=google_auth_failed`);
  }
}
