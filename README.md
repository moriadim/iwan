# Iwan (إيوان) | Premium Real Estate Extranet

![Iwan Banner](https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop)

### **Elevating Modern Real Estate Architecture**
Iwan is a luxury-tier cloud platform designed for the Middle Eastern real estate market. Built with a focus on high-performance, bilingual accessibility, and cloud-native scalability.

---

## 🏗️ Architectural Analysis: Cloud-Native Logistics

### **Financial Philosophy: CAPEX vs. OPEX**
The architecture of **Iwan** is strategically built on a cloud-native stack (Vercel + Supabase), prioritizing **OPEX (Operating Expenditure)** over **CAPEX (Capital Expenditure)**. 
- **CAPEX Avoidance**: By bypassing the need to purchase physical hardware, cooling systems, and dedicated server racks, Iwan eliminates the heavy upfront investment typically required for traditional real estate systems.
- **OPEX Efficiency**: We utilize a pay-as-you-go model. This allows the startup to scale costs linearly with user growth, ensuring that capital remains liquid for market expansion rather than being "sunken" into depreciating assets.

### **Global Scalability & Edge Performance**
Unlike a local physical Data Center, which suffers from latency and requires manual hardware maintenance, Iwan leverages **Vercel’s Serverless and Edge Network**.
- **Serverless Compute**: Business logic (e.g., booking validations) runs on-demand, scaling to zero when idle and instantly to thousands during peak demand.
- **Edge Delivery**: By deploying the frontend to global edge locations, Iwan ensures sub-millisecond response times for users in Dubai, Riyadh, or internationally, without the overhead of physical hardware maintenance.

### **Data Classification & Integrity**
Iwan manages data through two distinct lenses to ensure high availability and security:
1.  **Structured Data (PostgreSQL)**: Stored in Supabase SQL tables. This includes Luxury Units (`units`), User Profiles (`profiles`), and viewing appointments (`visits`). This data is relational, indexed, and subject to strict Row Level Security (RLS).
2.  **Unstructured Data (Object Storage)**: This includes binary files such as Emirates ID scans and high-resolution Passport PDFs. These are stored in the `id-documents` bucket, optimized for CDN distribution and isolated from the database for peak performance.

---

## 🗺️ Theme Mapping (Dar-Connect)

| Theme Component | Table/Entity | Arabic Translation | Description |
| :--- | :--- | :--- | :--- |
| **Table A** | Users / Profiles | المستأجرون | Handles authentication and tenant profiles. |
| **Table B** | Units | الوحدات العقارية | Structured data for luxury villas and apartments. |
| **Table C** | Visits | طلبات المعاينة | Junction table linking tenants to their potential homes. |
| **File** | ID Document | نسخة الهوية | Unstructured file upload (Emirates ID / Passport). |

---

## ✨ Premium Features
- **Bilingual RTL Support**: Native Arabic/English layout with zero-flicker language switching.
- **Motion Orchestration**: Advanced Framer Motion animations for a premium feel.
- **Security-First**: Row Level Security (RLS) policies and Signed URLs protect all sensitive data.
- **AI-Ready Catalog**: High-fidelity property grid with dynamic status updates and fallbacks.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4, Framer Motion.
- **Backend**: Supabase (Auth, PostgreSQL, Storage).
- **Icons**: Lucide React.
- **Deployment**: Vercel.

---

## 🚀 Installation & Setup

1. **Clone the repo**: `git clone https://github.com/moriadim/iwan.git`
2. **Install dependencies**: `npm install`
3. **Database Configuration**:
   - Create a Supabase project.
   - Run the contents of `supabase/schema.sql` in the SQL Editor.
4. **Environment Variables**:
   - Create a `.env.local` file:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
     ```
5. **Run Locally**: `npm run dev`

---
*Created for the Final Project Submission - Cloud Computing 2026*
