import { cookies } from "next/headers";

const AUTH_SECRET = process.env.AUTH_SECRET || "dev-secret-change-in-production";

function encode(str: string) {
  const key = AUTH_SECRET;
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return Buffer.from(result).toString("base64");
}

function decode(str: string) {
  const key = AUTH_SECRET;
  const decoded = Buffer.from(str, "base64").toString();
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;
    return JSON.parse(decode(token)) as { id: string; role: string; name: string; email: string };
  } catch {
    return null;
  }
}

export function createSessionToken(user: { id: string; role: string; name: string; email: string }) {
  return encode(JSON.stringify(user));
}
