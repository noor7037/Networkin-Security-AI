# NetCyberAI Consumer Learning App (Standalone)
**A modern, consumer-grade educational companion for Indian parents and students.**

---

## 1. Overview & Vision
The **NetCyberAI Consumer Learning App** is a standalone, AI-augmented consumer product designed for Indian households. It delivers daily academic clarity, personalized study plans, Socratic doubt resolution, verified scholarship discovery, and a permanent lifelong learning vault—completely independent of any school ERP, while providing an optional, privacy-governed **School Connect** bridge for partner schools.

---

## 2. Core Capabilities (15 Signature Features)
1. **Syllabus Scan:** Computer vision extraction of textbooks and worksheets into a unified, versioned Syllabus Profile.
2. **Specific Explain:** Pedagogy-encoded explanations referencing exact textbook chapters, desi analogies, and English technical vocabulary.
3. **Animated Mind Maps:** Server-generated, crawlable, animated SVG concept trees with dynamic hierarchy lines.
4. **Day-wise Study Plan:** Auto-reflowing study schedule adapting to exam countdowns without shaming backlog accumulation.
5. **Daily Quiz Loop:** 5–10 diagnostic questions per day with weak topic resurfacing, XP progression, and celebratory confetti finishes.
6. **Curated YouTube Videos:** Distraction-free, embedded educational videos with recommendations disabled and tap-to-load mechanics.
7. **Doubt Saathi (Voice + Text):** Scaffolded Socratic doubt guide with browser speech-to-text mic input.
8. **Exam-Day Toolkit:** Countdown timers, official exam blueprints, timetable schedules, and rapid-revision checklists.
9. **Lifetime Learning Vault:** Permanent digital portfolio archiving certificates, scanned work, and achievements from Nursery to Class 12.
10. **Weekly Parent Insight:** 3-line plain-language digest summarizing covered concepts, weak areas, and next week's focus.
11. **Schemes & Scholarships:** Verified central and state welfare schemes with eligibility matching and official portal links.
12. **Competitive Exams Radar:** National Olympiads, Navodaya, NTSE, and Sainik School schedules with application deadlines.
13. **Homework Helper:** Method-first step guidance teaching conceptual mastery without providing bare solutions.
14. **School Connect via OTP:** Optional WhatsApp-verified bridge syncing school attendance and report cards with strict fee isolation.
15. **School Module Auto-Mirror:** Native design-system card rendering of school announcements and circulars (zero ugly iframes).

---

## 3. Technology Stack & Architecture
- **Framework:** Next.js 14 App Router (React 18, TypeScript)
- **Styling & Design System:** Tailwind CSS with custom Indian education tokens, 16–24px rounded radii, and layered shadow elevation
- **Typography:** Latin geometric UI fonts paired with full Devanagari typography (`Noto Sans Devanagari`)
- **Animation Primitives:** Spring micro-interactions, compressed tap states (`scale: 0.97`), staggered card entrances, celebration confetti, and SVG path animations
- **Database:** PostgreSQL schema with migrations (`cx_*` consumer table prefix) and `@electric-sql/pglite` in-memory test harness
- **Security & Privacy:** Signed JWT sessions with child context, DPDP Act 2023 compliance, zero Aadhaar storage, zero hardcoded secrets

---

## 4. Getting Started Locally

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start development server
npm run dev

# Run full Vitest test suite
npm test

# Run typecheck
npm run typecheck

# Run production build
npm run build
```
