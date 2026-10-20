# NetCyberAI Consumer Learning App — Product Roadmap (Phases B, C, D)

**Product:** NetCyberAI Consumer Learning App  
**Architecture:** Standalone Consumer Layer with Optional School-Connect Gateway  
**Document Status:** Approved Engineering Plan (Post-Phase A)  

---

## 1. Phase B — Depth, Expansion & Intelligence

### 1.1 Multi-State & Multi-Board Expansion
- **Target Boards:** ICSE, Maharashtra State Board (MSBSHSE), Uttar Pradesh Board (UPMSP), Karnataka (KSEEB).
- **Curriculum Taxonomy:** Standardized concept ontology mapping chapter codes across NCERT and state-specific textbooks.
- **Language Scaffolding:** Expand mother-tongue scaffolding beyond Hindi to Marathi, Kannada, Telugu, Tamil, and Bengali while maintaining highlighted English technical vocabulary.

### 1.2 Two-Way Real-Time Voice Tutor (Doubt Saathi Premium)
- **Current State (v1):** Browser Speech-to-Text (STT) mic input on all inputs; text & structured pedagogical rendering.
- **Target Architecture:**
  - WebSocket audio duplex stream connecting to low-latency voice pipeline (e.g., Gemini Live Audio API or Cartesia/ElevenLabs TTS).
  - Interruption handling: Parent or student can interrupt the AI mid-sentence.
  - Socratic boundary: Voice model strictly adheres to the 4-step Pedagogy Playbook (example &rarr; desi analogy &rarr; step-by-step &rarr; confirmation check). Never dumps answers.

### 1.3 Production AI Provider Configuration
- **AI Router Swapping:** Config-driven transition from local deterministic stubs to live production inference:
  - Vision Extraction: Gemini 1.5 Pro / GPT-4o Vision for complex handwritten school notes and faded textbook scans.
  - Explanation & Socratic Guidance: Claude 3.5 Sonnet / Gemini 1.5 Flash for high-speed pedagogy assembly.
  - Cost Optimization: Aggressive caching of topic explanations by `(board, grade, subject, chapter, topic, language)` tuple.

---

## 2. Phase C — Messaging & Communication Infrastructure

### 2.1 Production WhatsApp Delivery
- **Provider:** Meta WhatsApp Cloud API (directly or via verified Indian BSP e.g. Gupshup / Kaleyra).
- **Templates Approved:**
  1. `weekly_parent_insight_digest`: 3-line diagnostic brief sent every Sunday at 7:00 PM.
  2. `daily_quiz_nudge`: 1-tap WhatsApp button to open today's quiz in PWA.
  3. `verified_scheme_alert`: Direct notification when a high-value scholarship matches the child's class/state.
- **Cost Guardrail:** Maximum 2 push messages per week per child; in-app notification center remains primary.

---

## 3. Phase D — Monetization Activation & Family Plans

### 3.1 Pricing Tiers

| Tier | Price Hypothesis | Capabilities |
|---|---|---|
| **Free (Buniyaad)** | ₹0 forever | 3 syllabus scans/week, complete Day-wise Study Plan, Daily Quiz loop (5 Qs), text Doubt Saathi, Opportunities Radar. |
| **Pro Student (Shikhar)** | ₹299 / month (or ₹1,999/yr) | Unlimited scans, 10-question senior quizzes, high-yield exam question generator, curated video player, offline PDF vault export. |
| **Family Plan (Kutumb)** | ₹499 / month (or ₹3,499/yr) | Up to 3 children on one subscription with independent syllabus profiles, sibling switcher, and combined weekly parent insights. |
| **School-Connect Households** | Bundled with School ERP | Full Pro features unlocked via school's NetCyberAI ERP institutional license. |

---

## 4. School-ERP Merge & Integration Checklist

When the founder decides to connect the standalone Consumer App with `netcyberai-core`:

1. [ ] **SSO / Identity Federation:** Guardian WhatsApp OTP in Consumer App verifies against `guardian_contacts` in school ERP.
2. [ ] **Governed API Plane:** School endpoints (attendance, homework, report cards) expose sanitized, read-only JSON payloads.
3. [ ] **Strict Fee Isolation:** Fee details remain in a separate, optional, skippable card — never mixed with academic ranking.
4. [ ] **Design System Enforcement:** School modules MUST render using Consumer App design tokens (rounded 24px cards, soft shadows), never an unstyled iframe.
5. [ ] **Disconnect Policy:** Unlinking a school immediately revokes school access tokens while preserving 100% of the child's learning vault, study plans, and quiz history.
