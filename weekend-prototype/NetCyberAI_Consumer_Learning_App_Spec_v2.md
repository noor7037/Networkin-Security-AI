# NetCyberAI Consumer Learning App — Product Spec v2

**Status:** Consolidated draft — raw brainstorm of 18 Oct 2026 synthesized
**Owner:** Noor (Founder) / NetCyberAI (parent company)
**Supersedes:** v1 (same day). v2 integrates all decisions taken in the raw discussion.
**Build vehicle:** Google Antigravity, standalone project (NOT connected to netcyberai-core GitHub). Claude Code handoff/merge deferred until founder decides.

---

## 1. Purpose and positioning

A **standalone consumer learning app for parents and students** under the NetCyberAI parent company. It delivers daily value on its own (learning support, study plan, opportunities, watchable content) and offers an **optional School Connect** so families of NetCyberAI ERP schools can see school data inside the same app. If no school is connected — or the connection ends — every standalone feature keeps working.

The school ERP (netcyberai-core) remains the core business. The consumer app is a separate product surface under the same parent company; NetCyberAI domain is used short-term (per founder), product naming deferred.

### Positioning statement (working)

> "Your child's school syllabus, explained every day in your language, with the best videos, quizzes and every government scheme you qualify for — whether or not your school uses NetCyberAI."

### What this is NOT

- Not a replacement for the NetCyberAI Family App inside the school ERP.
- Not a coaching platform or content publisher. It curates, explains, plans and connects.
- Not a school-ID/username/password distribution system.

---

## 2. Guiding principles (decisions)

1. **Specific, never generic.** Every explanation, plan and suggestion is computed from the child's profile and Syllabus Profile. Context injection, not model fine-tuning.
2. **Verified content only.** Every factual item carries a source link and "last verified" date. Nothing auto-publishes to families without human review.
3. **No spam.** Profile-matched notifications, frequency caps, weekly digest default.
4. **Text-first.** Text and visuals work on slow networks and cost little.
5. **Voice input everywhere from v1; voice output later.** Every text input has a mic (speech-to-text). Two-way voice conversation is premium/later.
6. **Value survives school disconnect.** Standalone value is the product; school connect is an enhancement.
7. **Low data cost.** Videos are tap-to-load additions to text/mind maps, never autoplay.
8. **Feature depth over feature count.** ~15 high-quality problem-solving features, not 50 modules.
9. **Freshness is an agent job.** One agent-system pattern serves all "keep it updated" needs, on a weekly cadence with human review before publish.

---

## 3. The feature set (v1 scope: 15 features)

### Core learning (the signature flow)

1. **Syllabus Scan** — Parent/student photographs or attaches anything (syllabus pages, textbook chapter, worksheet). Vision extracts subject/class/board/chapters/topics; stored as the child's **Syllabus Profile**. Uncertainty → one short clarifying question, never guessed board-specific syllabus. Corrections by the parent are first-class data. Scans merge into one profile per child.
2. **Specific Explain** — Every explanation is generated with the child's profile + Syllabus Profile + language preference as context, so answers reference the actual chapter and board phrasing, not generic internet content.
3. **Mind Maps & Graphics** — Any syllabus or chapter renders into an animated visual mind map (topics, relations, exam weight), server-generated static SVG/HTML (crawlable, cheap). Charts and simple graphics wherever a visual explains better than prose.
4. **Day-wise Study Plan** — The Syllabus Profile becomes a day-by-day plan until the exam/term date. Missed days reflow from today; no shaming backlog wall.
5. **Daily Quiz Loop** — 5–10 questions per day from that day's topics; weak topics resurface. This loop is the habit mechanism and the input to per-child level detection.
6. **Curated YouTube Videos, In-App** — After any explanation, 1–3 videos matched to class/board/topic/language. Selection: curated/verified library first; otherwise AI-ranked public results with metadata sanity check, flagged for later human curation. Embedded playback with recommendations disabled; never a naked outbound link. Every video shows channel, duration, language, "verified on" date. Tap-to-load, never autoplay.

### Support & insight

7. **Doubt Saathi** — Doubt box (text + mic) that answers with the same per-child context. v1: text + speech-input. Two-way voice: premium, later.
8. **Exam-Day Toolkit** — Countdown, paper pattern, timetable, revision checklist. Becomes the app's most critical surface in exam season.
9. **Learning Vault / Portfolio** — The child's milestones, certificates, scanned work, watched videos, quiz history — one timeline the child keeps even if the school changes. (Weekend sprint already built this surface for the school side; the consumer version is per-child and standalone.)
10. **Weekly Parent Insight** — Three lines: what was studied this week, where the child was weak, what's next. Clarity, not a lecture.

### Opportunities & life admin

11. **Schemes & Scholarships (state/class-wise)** — Government schemes, scholarships, matched to the child's profile. Every item: what it is, who qualifies, key dates, benefit, official source link, last-verified date. Expired items visibly archived.
12. **Competitive Exams Radar** — Olympiad, NTSE, Navodaya, board dates: what, when, how to apply. Includes private exams. Sourced and refreshed by the Freshness Agent System (§5) from government and private/news sources alike.
13. **Homework Helper** — Scan the school homework; get step-by-step guidance that teaches the method, not the answer.

### School Connect (optional)

14. **School Connect via OTP** — School-registered guardian WhatsApp number + OTP, or one-time connection code. Connected families see attendance, homework, notices, report card (fee only in a separated, skippable section). Disconnect: school-scoped access stops immediately; school-sourced data deleted/anonymized per stated retention; standalone learning data survives. No school-distributed credentials.
15. **School Module Auto-Mirror** — Modules a school publishes on its portal automatically appear in the parent app through the governed ERP API plane. **Rule: school content renders in the consumer app's design system (standard card/layout types), never a raw embed** — one school's ugly module must not break the whole app's look.

---

## 4. Per-child architecture (decision)

- One account holds multiple child profiles (e.g., class 5 and class 12).
- Tap a profile → the entire app switches context to that child: their syllabus, plan, quizzes, vault, opportunities, school connection.
- **Class-adaptive presentation:** same engine, different experience — class 5 gets simple language, big icons, short quizzes; class 12 gets exam mode, PYQs, revision planner.
- Notifications are per-child and labeled per-child.
- Premium pricing stays child-keyed so a family plan (2–3 children, one price) can be offered later; child-keyed data is what makes family pricing easy.
- Everything is keyed by child ID; nothing assumes a single child.

---

## 5. Freshness Agent System (decision)

One agent pattern serves every "keep it updated" need:

- **Jobs at launch:** (a) schemes/scholarships/competitive-exams scanner — weekly scan of government sources, exam boards, private-exam notices and education news; (b) video link-rot checker; (c) scheme expiry checker; (d) exam-date updater.
- **Cadence:** weekly scan + immediate recheck of a source when an event fires (e.g., a form window opens). Not real-time — cost without benefit.
- **Hard rule:** agents produce a **candidate queue**; nothing reaches parents without human review (founder initially, ~15–30 min/week). Every published item carries source link + verified date.
- **Review UI:** a simple queue — proposal, official source link, approve/reject.
- Agent output that fails verification is shown nothing, not shown unverified.

---

## 6. Teaching & Language Layer (decision)

1. **Pedagogy playbook baked into the AI:** start with a simple example, then a desi-life analogy, then a step-by-step breakdown, then a check-question before moving on; adjust difficulty using the child's profile and quiz history. This is well-designed instructions + context, not fine-tuning. Every doubt is explained, then confirmed understood — not just answered.
2. **Mother-tongue scaffolding:** profile medium (Hindi/English/other) decides explanation language. Non-English-medium children get explanations in their language **with English technical terms highlighted in English** (e.g., "photosynthesis — प्रकाश संश्लेषण") so exam-facing vocabulary builds passively.
3. **Embedded English practice:** every session ends with a tiny English communication piece (2–3 lines, one pattern a day). No separate English course; English learning is woven into the explanation itself, honoring the founder's intent to teach English while respecting the mother tongue.
4. **Honest boundary:** v1 adapts to profile + quiz history with a fixed playbook. Real-time learning-style detection is NOT claimed in v1.

---

## 7. Voice input (decision)

- Every text input (doubt box, search, profile corrections, quiz answers) carries a mic button using speech-to-text (browser/device API or Lovable AI STT).
- Two-way voice conversation (system speaks back): premium tier, post-v1.

---

## 8. AI/model architecture

- All AI goes through a **provider-configurable AI Router**: vision (scan), generation (explain/plan/quiz), ranking (video curation, opportunity matching). Providers swappable per task; keys in config, never hard-coded.
- **Local development runs on a stub provider:** canned/sample outputs so the whole flow is testable end-to-end without any API key. Swapping in a real key later is a config change only.
- Cost control: cache explanations per topic-profile pair, cache quiz banks per chapter, regenerate plans weekly.

---

## 9. Build vehicle and stack (decision)

- Built in the **Antigravity project**, standalone from netcyberai-core GitHub.
- Stack chosen for clean future merge with netcyberai-core conventions: **TypeScript + Next.js-style app structure + Tailwind + local Postgres with real migrations + Vitest.** No SQLite.
- Consumer app data lives in its own schema/tables (clear prefix), separate from any school-ERP tables.
- Auth: OTP flow with dev-mode mock (no live WhatsApp needed locally); notification queue built now, delivery deferred.
- Sibling switcher pattern from the weekend sprint carries over conceptually.

---

## 10. Competitor research mandate (decision)

- **Allowed and required (feature level):** unlimited research of competitor features from public surfaces — official sites, docs, app store listings, demos, reviews, public releases. Produce a feature matrix: what exists elsewhere, what maps onto our 15 features, what we should define ourselves because no reference exists.
- **Not allowed (code level):** no decompilation of competitor binaries/apps (Ghidra or otherwise), no copying of code, assets, or layouts. The reason is IP ownership, not contamination — this holds whether or not the workspace touches our GitHub.
- References tracked in the plan: Acadine, LoiLoNote, ClassDojo, Satchel One, Eneza, Khanmigo, Seesaw, Toddle, Google Classroom.

---

## 11. Build sequencing

**Phase A — Core learning loop (first build):** per-child accounts + sibling switcher, syllabus scan + Syllabus Profile (stub vision provider), specific explain + mind map (stub generation provider), curated video embed (seed library), day-wise plan + quiz loop, mic (STT) on all inputs, notification queue, AI Router with stub provider, Postgres schema + migrations + tests.
Scope: classes 6–10, one board-band (CBSE-like), English + Hindi UI.

**Phase B — Opportunities engine:** schemes/exams radar for central schemes + 1–2 pilot states, candidate queue + review UI, digest notifications. Requires founder as human reviewer.

**Phase C — School Connect:** OTP/code connector concept against the governed ERP API plane, disconnect policy implementation, fee-surface separation, school module auto-mirror with design-system rendering rule.

**Phase D — Depth & premium:** voice tutor (two-way), more states/boards/classes, analytics, Vault exports, monetization activation.

---

## 12. Monetization (hypothesis to validate)

| Tier | Contents |
|---|---|
| Free | Limited scans/week, explain, mind map, daily plan, weekly digest |
| Premium | Unlimited scans, full quiz bank, curated videos, priority languages, voice tutor (later) |
| School-Connect households | Premium-equivalent bundled via the school's ERP license |

Child-keyed data enables a family plan (2–3 children, one price) — a likely India selling point. No pricing finalized before free-flow retention is observed in pilots.

---

## 13. Risks and guardrails (decision-grade)

1. **Content ops is the product.** Curated video library and verified schemes need ongoing human review; without it, launch scope shrinks.
2. **Trust asymmetry.** One fabricated scheme eligibility or wrong video costs more than ten good items build. Default: show nothing over unverified.
3. **Voice output and video are cost centers** at India scale; meter them through the AI Router.
4. **Confusion with the school ERP Family App** is a product risk; separate navigation and naming surface.
5. **WhatsApp costs** apply to digests at scale; in-app-first until unit economics are proven.
6. **IP discipline:** feature research unlimited; code/asset/binary copying never.

---

## 14. Open questions (founder decisions pending)

1. Which 1–2 pilot states for the Opportunities layer?
2. Product name under the NetCyberAI parent company (NetCyberAI domain short-term).
3. Free-tier scan quota (working assumption: 3–5/week).
4. Hindi-medium quiz phrasing at launch or later?
