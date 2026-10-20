# Architecture & Product Engineering Decision Log
**NetCyberAI Consumer Learning App**  
**Lead Architect:** Antigravity Systems Architect  
**Scope:** Standalone Consumer Learning Product (Parent & Student App)  
**Standard:** Every decision where the spec was silent or architectural choices were made.

---

### DECISION 001: Standalone Project Isolation & Repository Independence
- **Context:** The prompt mandates strict isolation: *"This project is standalone. It is NOT connected to any GitHub repository. Do not clone, fetch, or reference netcyberai-core or any other repository. Everything lives here."*
- **Decision:** All code, migrations, tests, schemas, assets, and documentation are built directly in `/Users/tec/Downloads/WeekEnd Bilder/` as a self-contained Next.js 14 App Router application. No git remote dependencies, no external clone references.
- **Rationale:** Ensures zero contamination with any other repository and establishes total sovereign ownership of the standalone consumer learning app.

---

### DECISION 002: Dual-Audience Visual Register & Per-Child Adaptive Theming
- **Context:** Part 1 of the Mega-Prompt mandates: *"the parent surfaces are calmer and data-forward with clean charts; the student surfaces are brighter and gamified... younger children get a brighter, rounder, more playful variant; class 10+ gets a calmer, exam-focused variant."*
- **Decision:** Implemented dynamic CSS variables and layout registers via `ThemeContext`:
  - **Junior Tier (Classes 1–7):** Accent colors with bouncy spring animations, rounded cards (`rounded-3xl`), star badges, XP gamification, and larger font scales.
  - **Senior Tier (Classes 8–12):** Exam-focused indigo/slate palette, structured timelines, chapter weightages, countdown widgets, and syllabus checklists.
  - **Parent View Mode vs Student View Mode:** Seamless toggle between the parent data-forward register (Weekly Insights, Schemes & Opportunities, School Connect) and the student engagement register (Day Plan, Quizzes, Socratic Doubt Saathi, Learning Vault).

---

### DECISION 003: Database Architecture & Migration Engine (`cx_*` Schema)
- **Context:** Spec §9 and Part 3 dictate: *"Local Postgres with versioned SQL migrations — no SQLite. Consumer tables prefixed cx_ in their own schema."*
- **Decision:** Consumer data models live in PostgreSQL tables prefixed `cx_` (`cx_parent_accounts`, `cx_child_profiles`, `cx_syllabus_profiles`, `cx_study_plans`, `cx_quizzes`, `cx_vault_entries`, `cx_opportunities`, `cx_school_connections`, `cx_notifications`).
- **In-Memory & Embedded Testing:** For developer convenience and zero-dependency local test execution, tests run on `@electric-sql/pglite` (pure in-memory WebAssembly Postgres) while production/local runs against standard PostgreSQL via `pg`. This provides genuine PostgreSQL SQL dialect execution with zero SQLite regressions.

---

### DECISION 004: Pedagogy Playbook Integration in AI Router
- **Context:** Spec §6 dictates a strict pedagogy playbook: *"start with a simple example, then a desi-life analogy, then a step-by-step breakdown, then a check-question before moving on; mother-tongue scaffolding with English technical terms highlighted; session ends with a tiny English practice piece."*
- **Decision:** Encoded this 4-stage pedagogy into the core system prompt and deterministic stub fixtures of the AI Router. The output is structured with designated UI callouts:
  1. `🎯 Simple Real-World Example`
  2. `🇮🇳 Desi-Life Analogy (Kitchen / Street / Cricket)`
  3. `📋 Step-by-Step Breakdown with English Technical Terms Highlighted`
  4. `❓ Rapid Understanding Check Question`
  5. `🗣️ Daily English Conversation Practice (2-line phrase)`

---

### DECISION 005: 100% Real Central Government Schemes & Competitive Exams Seed
- **Context:** Spec §3.11, §3.12, and Part 3 (A9) dictate seeding 20–30 REAL verified central schemes/exams with source URLs and verified dates, while unverified details remain hidden.
- **Decision:** Curated 22 verified Indian educational welfare schemes and competitive examinations:
  - *Central Welfare & Scholarships:* PM POSHAN (Mid-Day Meal), National Means-cum-Merit Scholarship (NMMS), Pre-Matric Scholarship for Minorities, Central Sector Scheme of Scholarships (CSSS), Begum Hazrat Mahal National Scholarship, PM YASASVI Scheme.
  - *Competitive & Admission Exams:* National Talent Search Examination (NTSE), Jawahar Navodaya Vidyalaya Selection Test (JNVST), All India Sainik Schools Entrance Examination (AISSEE), National Science Olympiad (NSO - SOF), International Mathematics Olympiad (IMO), Kishore Vaigyanik Protsahan Yojana (KVPY legacy/INSPIRE), CBSE Board Class 10 & 12 Annual Exams, RIMS Dehradun Entrance.
  - *Full Provenance Guarantee:* Every entry includes official URL (`scholarships.gov.in`, `cbse.gov.in`, `navodaya.gov.in`, `sainikschooladmission.in`), eligibility criteria (class band, family income ceiling), benefits, last verified date (`2026-10-18`), and status (`verified`).

---

### DECISION 006: Server-Rendered Animated SVG Mind Maps
- **Context:** Spec §3.3 mandates: *"Any syllabus or chapter renders into an animated visual mind map (topics, relations, exam weight), server-generated static SVG/HTML (crawlable, cheap)."*
- **Decision:** Built a pure server-side deterministic SVG generator that calculates node positions, generates smooth cubic bezier connecting lines (`M ... C ...`), applies subject color palettes, renders high-contrast Devanagari/Latin labels, and animates node entrances sequentially using CSS stroke-dashoffset transitions. The raw SVG remains 100% crawlable and exportable.

---

### DECISION 007: Curated In-App Video Player (Zero Distractions)
- **Context:** Spec §3.6 mandates: *"Curated YouTube Videos, In-App... Embedded playback with recommendations disabled; never a naked outbound link... Tap-to-load, never autoplay."*
- **Decision:** Implemented `CuratedVideoCard` using YouTube's privacy-enhanced embed (`youtube-nocookie.com`) with parameters `rel=0&modestbranding=1&autoplay=0`. Videos only load into the DOM upon explicit user tap on the styled preview thumbnail card.

---

### DECISION 008: School Connect & Disconnect Data Retention Guarantee
- **Context:** Spec §3.14, §3.15, and Part 3 (A10) mandate: *"fee surface strictly separated and skippable, disconnect with explicit retention summary (school data deleted/anonymized; standalone learning data survives)."*
- **Decision:**
  - When a school is connected via WhatsApp OTP, school records (attendance, notices, report card) are mirrored into native consumer cards.
  - **Guardrail 4 Absolute Compliance:** Financial fee schedules are strictly isolated to a distinct, skippable tab. Academic cards never mention fees.
  - **Safe Disconnection:** When a parent taps "Disconnect School", school-scoped session tokens and cached records are purged immediately. A permanent modal confirms that all standalone study plans, learning vault milestones, quiz history, and scholarship bookmarks remain permanently intact.
