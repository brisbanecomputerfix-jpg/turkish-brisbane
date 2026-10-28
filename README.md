# Turkish Brisbane (turkishbrisbane.com)

A modern, lightning-fast, and highly SEO-optimized community platform and business directory for the Turkish-speaking community in Brisbane and Greater Queensland.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, Server Components & Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4) & Shadcn-style accessible components
- **Database ORM:** Prisma
- **Database:** SQLite (local development) / PostgreSQL (production)
- **Icons:** Lucide React
- **SEO & Structured Data:** Schema.org JSON-LD (`ItemList`, `LocalBusiness`, `WebSite`), Dynamic OpenGraph & Meta tags

---

## 🎯 Features

1. **Hero & Anti-Bot WhatsApp Funnel**
   - High-impact hero section highlighting Brisbane community resources.
   - **Community Rules Modal:** Protected verification gate that requires users to acknowledge anti-spam & community guidelines before the WhatsApp invitation link is unveiled (defeats scraping bots).

2. **Searchable & Filterable Business Directory**
   - Instant search across business names, services, and Brisbane suburbs.
   - Category filtering: **Medical**, **Legal**, **Food & Groceries**, **Tech Support & IT**, **Trades**, and **Education**.
   - Direct click-to-call (`tel:`), website links, and suburb badges.

3. **Community Noticeboard & Group Orders**
   - Live noticeboard for bulk imports (Turkish coffee, olive oil), job offers, and student housing.
   - Filter by notice type (`bulk_order`, `job`, `general`).

4. **Client-Side Submissions (Moderation Queue)**
   - Business submission modal saving entries with `isApproved = false` status for administrator moderation.
   - Noticeboard submission modal for community announcements.

5. **REST API & Server Actions**
   - `GET /api/businesses` & `POST /api/businesses`
   - `GET /api/notices` & `POST /api/notices`
   - Full TypeScript Server Actions in `src/actions/`

---

## 🛠️ Quickstart (Local Development)

```bash
# 1. Navigate to project
cd /Users/mac/turkish-brisbane

# 2. Install dependencies (already completed)
npm install

# 3. Synchronize Prisma with local SQLite database
npx prisma db push

# 4. Seed initial Brisbane businesses & community notices
npx prisma db seed

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Coolify or Hostinger (PostgreSQL)

### 1. Switch Database Provider to PostgreSQL

In `prisma/schema.prisma`, update the datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Set Environment Variables in Coolify / Hostinger

In your Coolify or Hostinger dashboard, set:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@your-db-host:5432/turkishbrisbane?schema=public"
NEXT_PUBLIC_WHATSAPP_LINK="https://chat.whatsapp.com/YOUR_REAL_INVITE_URL"
NODE_ENV="production"
```

### 3. Deploy via Git or Docker

- **Coolify:** Add a new Application from your GitHub repository. Coolify will auto-detect the `Dockerfile` or build using Nixpacks/Node.
- **Build / Pre-deploy Command:**
  ```bash
  npx prisma db push && npm run build
  ```
- **Start Command:**
  ```bash
  npm run start
  ```

---

## 📂 Project Structure

```
turkish-brisbane/
├── prisma/
│   ├── schema.prisma         # Database schema (Business & Notice models)
│   └── seed.ts               # Seed data for businesses and notices
├── src/
│   ├── actions/              # Next.js Server Actions (form handlers)
│   │   ├── businesses.ts
│   │   └── notices.ts
│   ├── app/                  # Next.js App Router
│   │   ├── api/
│   │   │   ├── businesses/   # REST API endpoint
│   │   │   └── notices/      # REST API endpoint
│   │   ├── globals.css       # Tailwind CSS & theme tokens
│   │   ├── layout.tsx        # SEO metadata, fonts & OpenGraph tags
│   │   └── page.tsx          # Server Component with JSON-LD Schema
│   ├── components/
│   │   ├── ui/               # Reusable UI primitives (Button, Card, Input, Modal, Badge)
│   │   ├── navbar.tsx        # Responsive navigation header
│   │   ├── hero.tsx          # Hero section with community CTAs
│   │   ├── directory-section.tsx # Searchable directory grid
│   │   ├── noticeboard-section.tsx # Bulk orders & classifieds board
│   │   ├── whatsapp-modal.tsx # Anti-bot community rules modal
│   │   ├── submit-business-modal.tsx # Listing submission form
│   │   ├── submit-notice-modal.tsx   # Notice submission form
│   │   ├── home-client.tsx   # Client hydration shell
│   │   └── footer.tsx        # Emergency contacts & community footer
│   └── lib/
│       ├── prisma.ts         # Singleton Prisma client
│       └── utils.ts          # Tailwind cn helper
├── Dockerfile                # Production multi-stage Docker build
└── package.json
```
