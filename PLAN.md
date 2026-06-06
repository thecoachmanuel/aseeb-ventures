# Cropnuts.com Clone — Implementation Plan

## Overview
Clone the entire https://cropnuts.com/ website (agricultural & environmental laboratory testing)
using **Next.js** (App Router) for the frontend/backend and **MongoDB** (via Mongoose) for the database.

---

## Phase 1: Scrape & Analyze the Live Site

**Goal:** Download a complete local copy of cropnuts.com and catalog every page, feature, and data type.

### Step 1.1 — Full Site Mirror with wget
```bash
wget --mirror --page-requisites --adjust-extension --convert-links \
     --wait=1 --limit-rate=500k --no-parent \
     --directory-prefix=./cropnuts-scrape \
     https://cropnuts.com/
```
This produces a fully browsable static mirror in `./cropnuts-scrape/`.

### Step 1.2 — Structural Analysis
After scraping, analyze:
- **Pages:** Every unique URL/page discovered
- **Navigation:** Menu structure, header, footer, breadcrumbs
- **Content types:** Services, lab tests, blog posts, case studies, resources
- **Forms:** Contact forms, quote requests, sample submission forms, newsletter signups
- **Interactive elements:** Search, filters, calculators, maps, sliders, tabs
- **Auth areas:** Login, registration, client portals, dashboards
- **E-commerce elements:** Shopping cart, checkout, pricing, subscriptions
- **Third-party integrations:** Payment gateways, analytics, chat widgets, maps, social media
- **SEO structure:** Meta tags, Open Graph, structured data, sitemap

### Step 1.3 — Data Model Extraction
From the scraped content, identify all data entities:
- Laboratory tests / services (name, category, price, turnaround time, description)
- Blog posts / articles (title, author, date, categories, tags, content)
- Team members / staff
- Locations / branches
- Client testimonials
- FAQ items
- Certifications / accreditations
- Resource downloads (PDFs, reports)

---

## Phase 2: Next.js + MongoDB Architecture

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Database | MongoDB via Mongoose |
| Styling | Tailwind CSS |
| Auth | NextAuth.js v5 |
| Forms | React Hook Form + Zod |
| Email | Resend / Nodemailer |
| Payment (if needed) | Stripe |
| File Storage | Vercel Blob / AWS S3 |
| Search | In-memory Fuse.js or MongoDB Atlas Search |
| CMS | Custom admin panel or Payload CMS |

### Project Structure
```
cropnuts-clone/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/        # Public-facing pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   ├── (auth)/             # Auth pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/        # Client portal/dashboard
│   │   │   ├── dashboard/
│   │   │   ├── orders/
│   │   │   └── layout.tsx
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── ...
│   │   └── layout.tsx
│   ├── components/             # Shared React components
│   │   ├── ui/                 # Primitive UI (buttons, inputs)
│   │   ├── layout/             # Header, Footer, Nav
│   │   ├── sections/           # Page sections (hero, features, CTA)
│   │   └── forms/              # Form components
│   ├── lib/                    # Utilities
│   │   ├── db.ts               # MongoDB connection
│   │   ├── auth.ts             # NextAuth config
│   │   └── utils.ts
│   ├── models/                 # Mongoose models
│   │   ├── Service.ts
│   │   ├── BlogPost.ts
│   │   ├── User.ts
│   │   ├── ContactSubmission.ts
│   │   └── ...
│   └── types/                  # TypeScript types
│       └── index.ts
├── public/                     # Static assets
│   └── images/
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── .env.local
```

### MongoDB Models (Initial Set — to be refined after scraping)
```
User            — email, name, passwordHash, role, company, phone, createdAt
Service         — name, slug, category, description, price, turnaroundTime, 
                  accreditation, isActive, metadata
BlogPost        — title, slug, author, publishedAt, excerpt, content, 
                  categories, tags, featuredImage, seoMetadata
ContactSubmission — name, email, phone, company, message, service, createdAt
Testimonial     — name, company, role, quote, rating, avatar, isPublished
TeamMember      — name, role, bio, photo, linkedin, order
FAQ             — question, answer, category, order
Location        — name, address, phone, email, coordinates, isMainOffice
Page            — title, slug, content, metaDescription, isPublished (for CMS pages)
```

---

## Phase 3: Implementation Order

### 3.1 — Project Scaffolding
- Initialize Next.js with TypeScript and Tailwind
- Set up MongoDB connection and Mongoose
- Configure NextAuth.js
- Set up folder structure and shared layouts

### 3.2 — Core Layout & Navigation
- Header with responsive navigation (desktop hamburger, mobile drawer)
- Footer with links, contact info, social media
- Replicate the exact visual design from the scraped site (colors, fonts, spacing)

### 3.3 — Public Pages (in priority order)
1. **Homepage** — hero, services overview, testimonials, CTAs, stats
2. **Services / Lab Tests** — list view with filters, individual service detail pages
3. **About Us** — company story, team, certifications
4. **Blog** — post list with pagination, individual posts, categories/tags
5. **Contact** — multi-step form, location map, office info
6. **FAQ** — accordion-style expandable sections
7. **Resources** — downloadable documents, reports
8. **Careers** — job listings (if present)

### 3.4 — Interactive Features
- **Service search/filter** — by category, accreditation, price range
- **Contact forms** — with validation, email notifications, DB storage
- **Sample submission form** (if present on the site)
- **Newsletter signup**
- **Blog search** — full-text search across posts

### 3.5 — Authentication & User Areas
- Registration with email verification
- Login with credentials (optionally OAuth/Google)
- Client dashboard — order history, test results, account settings
- Admin panel — manage services, blog posts, submissions

### 3.6 — Performance & SEO
- Static generation where possible (ISR for dynamic content)
- Metadata API for SEO tags
- Sitemap generation
- Image optimization with next/image
- Structured data (JSON-LD) for services and blog

### 3.7 — Deployment
- Deploy to Vercel
- Set up MongoDB Atlas cluster
- Configure environment variables
- Set up domain and SSL

---

## Verification Checklist
- [ ] All pages from the original site are present and visually match
- [ ] All forms submit correctly and store data
- [ ] Mobile responsiveness matches the original
- [ ] Blog posts load with pagination
- [ ] Service pages are filterable and searchable
- [ ] Contact form sends email notifications
- [ ] Auth flow works (register → verify → login → dashboard)
- [ ] Admin can CRUD services, blog posts, and manage submissions
- [ ] Page load performance is acceptable (Lighthouse score)
- [ ] SEO meta tags, sitemap, and structured data are present
