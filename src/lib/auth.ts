import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET || "dev-secret-change-in-production";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "client" | "viewer";
}

export function createSessionToken(user: SessionUser): string {
  return jwt.sign(user, AUTH_SECRET, { expiresIn: "7d" });
}

export async function getServerSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;
    return jwt.verify(token, AUTH_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export function setAuthCookieOnResponse(
  response: NextResponse,
  token: string
) {
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookieOnResponse(response: NextResponse) {
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
