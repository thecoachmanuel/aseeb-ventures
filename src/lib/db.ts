import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

let seeded = false;

async function seedAdminUser() {
  if (seeded) return;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    seeded = true;
    return;
  }
  try {
    const User = mongoose.models.User;
    if (!User) {
      seeded = true;
      return;
    }
    const existing = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!existing) {
      await User.create({
        name: "Admin",
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: "admin",
      });
      console.log(`[seed] Admin user created: ${adminEmail}`);
    }
  } catch (e) {
    console.error("[seed] Failed:", (e as Error).message);
  }
  seeded = true;
}

export async function connectDB() {
  if (cached.conn) {
    if (!seeded) await seedAdminUser();
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
    if (!seeded) await seedAdminUser();
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
