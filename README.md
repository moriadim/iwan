# Iwan (إيوان) | Premium Real Estate Extranet

## 🏗️ Architectural Analysis: Cloud-Native Logistics

### Financial Philosophy: CAPEX vs. OPEX
The architecture of **Iwan** is strategically built on a cloud-native stack (Vercel + Supabase), prioritizing **OPEX (Operating Expenditure)** over **CAPEX (Capital Expenditure)**. 
- **CAPEX Avoidance**: By bypassing the need to purchase physical hardware, cooling systems, and dedicated server racks, Iwan eliminates the heavy upfront investment typically required for traditional real estate systems.
- **OPEX Efficiency**: We utilize a pay-as-you-go model. This allows the startup to scale costs linearly with user growth, ensuring that capital remains liquid for market expansion rather than being "sunken" into depreciating assets.

### Global Scalability & Edge Performance
Unlike a local physical Data Center, which suffers from latency and requires manual hardware maintenance, Iwan leverages **Vercel’s Serverless and Edge Network**.
- **Serverless Compute**: Business logic (e.g., booking validations) runs on-demand, scaling to zero when idle and instantly to thousands during peak demand.
- **Edge Delivery**: By deploying the frontend to global edge locations, Iwan ensures sub-millisecond response times for users in Dubai, Riyadh, or internationally, without the overhead of physical hardware maintenance.

### Data Classification & Integrity
Iwan manages data through two distinct lenses to ensure high availability and security:
1.  **Structured Data (PostgreSQL)**: Stored in Supabase SQL tables. This includes Luxury Units (`units`), User Profiles (`profiles`), and viewing appointments (`visits`). This data is relational, indexed, and subject to strict Row Level Security (RLS).
2.  **Unstructured Data (Object Storage)**: This includes binary files such as Emirates ID scans and high-resolution Passport PDFs. These are stored in the `id-documents` bucket, optimized for CDN distribution and isolated from the primary database to maintain performance.

---

## 🗺️ Theme Mapping (Dar-Connect)

| Theme Component | Table/Entity | Arabic Translation | Description |
| :--- | :--- | :--- | :--- |
| **Table A** | Users / Profiles | المستأجرون | Handles authentication and tenant profiles. |
| **Table B** | Units / Maisons | الوحدات العقارية | Structured data for luxury villas and apartments. |
| **Table C** | Visits / Interactions | طلبات المعاينة | Junction table linking tenants to their potential homes. |
| **File** | ID Document | نسخة الهوية | Unstructured file upload (Emirates ID / Passport). |

---

## ✨ Premium Features
- **Bilingual RTL Support**: Fully implemented Right-to-Left (Arabic) and Left-to-Right (English) toggle with dynamic layout shifting.
- **Motion Polish**: Framer Motion orchestration for a "Vibe Coding" premium experience.
- **Security-First**: Bulletproof RLS and server-side file validation protect sensitive unstructured data.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4, Framer Motion.
- **Backend**: Supabase (Auth, PostgreSQL, Storage).
- **Security**: Supabase Row Level Security (RLS).
- **Deployment**: Vercel.

---

## 🚀 Installation & Setup
1. **Clone the repo**: `git clone <repo-url>`
2. **Install deps**: `npm install`
3. **Database**: Execute `supabase/schema.sql` in your Supabase SQL Editor.
4. **Storage**: Create a bucket titled `id-documents`.
5. **Environment**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
