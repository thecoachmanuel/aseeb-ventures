# architecture
- Use NextJS for architecture. Confidence: 0.50
- Use MongoDB for database. Confidence: 0.50

# nextjs
- Pages with inline event handlers (onSubmit, onChange, etc.) must include "use client" directive at top of file to avoid prerendering errors. Confidence: 0.75
- API routes that import server-only modules (connectDB, Mongoose, bcrypt) must include `export const dynamic = "force-dynamic"` to prevent Next.js 16/Turbopack from statically prerendering them at build time. Confidence: 0.80

# branding
- Use "aseeb-ventures.vercel.app" as the project domain, not "cropnuts.com". Confidence: 0.65

# typescript
- Avoid naming model imports the same as browser globals (e.g., use LocationModel instead of Location) to prevent TS redeclaration errors. Confidence: 0.70

