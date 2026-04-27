# ARCHITECT’S REPORT: Iwan Real Estate Extranet
**Project Name:** Iwan (إيوان)  
**Date:** April 27, 2026  
**Subject:** Cloud Infrastructure & System Logistics Analysis  

---

## 1. Executive Summary
**Iwan** is a high-fidelity cloud-native extranet designed to digitize the property viewing ecosystem for the luxury real estate markets in Dubai and Riyadh. The system provides a secure, bilingual, and highly-available environment for tenants to manage their property lifecycle from discovery to identity verification.

---

## 2. Cloud Logistics & Financial Strategy

### 2.1 CAPEX vs. OPEX Optimization
The system architecture prioritizes **Operating Expenditure (OPEX)** to minimize upfront capital requirements.
- By utilizing **Vercel** and **Supabase**, Iwan eliminates the need for physical data centers, cooling infrastructure, and hardware maintenance (CAPEX).
- Costs scale linearly with user growth, allowing for agile pivoting and financial liquidity.

### 2.2 Global Scalability
Iwan leverages a **Global Edge Network**. By deploying the application logic at the edge, we ensure sub-100ms latency for users regardless of their geographical location, fulfilling the high-speed requirements of premium international investors.

---

## 3. Technical Architecture (The Stack)

### 3.1 Data Classification
The system distinguishes between three types of data to ensure performance and security:
1. **Structured Data**: Property listings, user profiles, and visit logs managed via a Relational PostgreSQL engine (Supabase DB).
2. **Unstructured Data**: Sensitive identity documents (Emirates IDs, Passports) stored in secure Object Storage (Supabase Storage).
3. **Logic Layer**: Serverless functions handling authentication, file signing, and real-time lead capture.

### 3.2 Security & Compliance (Mission 1)
- **Identity Protection**: Sensitive files are stored in private buckets accessible only through **Signed URLs** with a 1-hour expiration.
- **Row Level Security (RLS)**: Every database query is restricted at the kernel level based on the user's Auth ID, ensuring total data isolation.

---

## 4. UI/UX & Bilingual Implementation
- **Bilingual Core**: Integrated RTL (Arabic) support using native logical properties and dynamic font swapping.
- **Micro-interactions**: Orchestrated animations using Framer Motion to provide a "cinematic luxury" feel appropriate for the business domain.

---

## 5. Conclusion
Iwan represents a state-of-the-art implementation of "Build and Ship" philosophy. It demonstrates that lean cloud architectures can deliver enterprise-grade security and luxury aesthetics while remaining operationally efficient and ready for immediate market scale.

---
**Architectural Lead:** MERZOUGUI ABDELLAH EL GHAZALI  
**Support Team:** Hadjer Khawla MEGHOUFEL, BENHAOUA Boualem
