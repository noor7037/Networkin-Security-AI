# NetCyberAI — Full Automation, AI Automation, and Cross-Platform Feature Adoption Master Plan

**Prepared for:** Noor Islam (Founder) — to hand to Claude Code as a build directive.
**Written by the supervisor on 2026-10-16.**

> **Provenance statement (put this at the top of your session):** I just read the GitHub
> repository (`noor7037/netcyberai-core`) end to end — the Constitution, Master Roadmap,
> Module Catalog, the Teacher App plan (doc 20), the Family App plan (doc 31), the WhatsApp
> plan (doc 25), the Visibility Protocol (doc 06), the Decision Log, and the source tree
> (`src/app`, `src/lib`, `db`, `supabase`). On the basis of that reading, this document is
> given to you. It is grounded in what is actually built today, not in what the website
> markets. You are free to overrule any specific choice here when your reading of the code
> says something better works — the Challenge Rule (Roadmap §3.6) applies to this document
> too. Log every overrule in the Decision Log.

---

## 0. What this document asks for, in one paragraph

Make NetCyberAI a **self-running platform**: every module emits events, a central Automation
OS turns events into actions, an AI orchestration layer drafts what intelligence is needed,
a human approves anything that reaches a parent or changes a record, and every action is
visible on the exact surface where its owner needs to see it (Control, principal dashboard,
Teacher App, Family App, WhatsApp). Adopt the best of **Acadine** (AI assessment), **LoiLo**
(student portfolio, teacher-free-forever playbook, cluster management) and a small, chosen
set of features from reference startups (Khanmigo, Seesaw, ClassDojo, Eneza, Toddle,
Satchel One) — each mapped onto existing modules, never bolted on as a parallel product.
And **start building the Family App (parent + student PWA) now**; it was on hold as P7b and
the founder has lifted the hold.

---

## 1. Verified state of the repository (what Claude Code can rely on)

| Area | State today |
|---|---|
| Stack | Next.js modular monolith + Supabase (two databases: prod `netcyberai-prod`, test), RLS on every tenant table, restrictive role scopes, interfaces for every external service (`EmailSender`, `JobQueue`, `WhatsAppProvider`, `PaymentProvider`, `FileStorage`, `AuthOracle`, `AIProvider`, `ErrorReporter`). |
| P1 platform | Settings engine, onboarding-templates framework (pending screens), custom fields, filter engine + saved views, bulk actions, entitlements/plans, ModulePage design system v5, EN/HI i18n, Help Center + Raise Ticket, app shell with 8 nav groups and teacher bottom bar. |
| Teacher App (P2) | Built and tested: installable PWA shell, offline device store + outbox (`client_operations`, idempotent replay), attendance with leave codes and India-date handling, timetable view, syllabus map + one-tap "taught today" (seeds the Pulse draft + classwork log), homework with photo + copy-to-sections, Homework Recovery v1, Daily Pulse compose (draft/ready; sending waits for P4), needs-help follow-up queue, Teacher Copilot v1 behind `AIProvider` with a stand-in provider and per-school metering. Open: real Android install test, a real AI provider + key + spend limit, Hindi template review. |
| Fees (P3) | Foundation + collection rails: direct UPI to the school's account with bank-statement proof, Razorpay dormant behind per-school credentials, receipts, email reminders, clearance gate. |
| WhatsApp (P4) | Send-gate is live and CI-enforced (dedupe, consent per purpose, quiet hours, budget, template approval). Provider SPI with stand-in; Meta adapter designed but not built; no webhook, no threading, no versioned templates yet. Production database has zero messaging traffic — by design, until P4. |
| Principal + Control (P5) | Office dashboard on real data with drill-down (C203); Control has plans, messaging cost view, monitoring basics. Early Warning v2 nightly, Learning Genome v1 (staff only), Curriculum Gap v1, School Health Auditor v1 built. |
| Exams (P6) | Boards and scheme builder, exams, marks entry, publish, report cards. No AI evaluation of answer sheets, no topic-level analytics beyond Learning Genome v1. |
| Family App (P7b, doc 31) | Only the first stone is laid: a parent login created by the founder in Control, parent RLS on `students`, `attendance`, `marks`, `fees_ledger`, and a read-only home with attendance and dues. Slices 11a–11g (sign-in, fees, calendar, reports, PTM, homework hand-in, study material) are specified and reviewed but not built. |
| AI modules | Every AI output is advisory: a person approves every action that reaches a parent or changes a record (Constitution Amendment 3). `ai_usage` metering exists; no prompt or draft text is stored. |
| Hard guardrails | No Aadhaar stored or shown anywhere; no child ranked against named classmates for parents; fees never paired with academic standing; anti-fabrication (no invented numbers anywhere, demo data quarantined from AI crawlers); audit rows hold ids and counts only. |

**Read order for the implementing session:** doc 00 → this file → doc 31 (Family App) →
doc 25 (WhatsApp) → the Constitution sections the task touches → doc 17 rows for the
modules named below.

---

## 2. Non-negotiable guardrails (these outrank this plan)

1. **AI is advisory.** Every AI-drafted message, mark, suggestion or plan is approved by a
   human before it reaches a parent or changes a record. The Copilot pattern (draft →
   edit → approve → save) is the pattern for everything new in this plan.
2. **No fabricated numbers.** Any "X hours saved / Y% improvement" shown in UI must be
   computed from that school's own data or not shown. Demo numbers stay in `/demo`.
3. **Consent and DPDP come first.** The send-gate stays the only door to WhatsApp. New
   message purposes need new consent purposes on the ledger. Child data never goes to an
   AI provider unmasked: strip names, ids and guardian detail before any provider call
   (test this in CI, as the Copilot slice already does).
4. **Money and academic standing never mix.** Fee data and academic data stay on separate
   surfaces. The Family App's fees screen and reports screen never show each other's data.
5. **RLS everywhere, tested as `app_user` and `parent`.** Every new table this plan creates
   gets restrictive tenant policies and a cross-tenant test, as doc 31 §3 specifies.
6. **Portability.** New externals sit behind an interface in `src/lib`. Standard Postgres
   migrations, test DB first, then prod, then the catalog snapshot.
7. **Definition of done** (Roadmap §3.4) applies to every new screen: settings schema,
   filters, bulk actions, EN/HI, tours, empty states that teach, 360–1440 widths, charts
   with a table view, catalog row updated to Live.

---

## 3. The anti-uninstall architecture (why a teacher and a parent never delete this app)

This is the strategic spine of the plan. Two retention layers sit **beside** the school
workspace, not inside it:

### 3.1 Layer structure

| Layer | Owner | Who can see it | What lives there |
|---|---|---|---|
| **School layer** (exists) | The school | Per role scope (existing RLS) | Attendance, homework, Pulse, fees, exams, records |
| **Teacher Personal layer** (new, later phase) | The teacher as an individual | Only the teacher. School staff, principal and Control have **0% access — enforced in the database, not just the UI** | Private tuition batches, tuition fees, personal career vault (worksheets, papers, ideas), exam-prep |
| **Family Personal layer** (new, later phase) | The guardian/child as an individual | Only that family | Lifetime academic record, competitive-exam prep, doubt-solving history, health records |

### 3.2 Why this retains users

- **A teacher keeps the app** because it holds her evening income (tuition batches, fee
  reminders with UPI links) and her portable career (10 years of papers that survive her
  moving from School X to School Y). The school deleting the workspace does not delete this.
- **A parent keeps the app** because it is the child's memory from nursery to Class 12 —
  report cards, certificates, homework history, health records — plus the child's future
  tools (exam prep, doubt solver). School Y being a different school does not matter; the
  record and the tools travel with the child.
- **The school layer is what installs the app at ₹0 CAC** (through the school); the personal
  layers are what make uninstall irrational. Adoption first, retention layer second.

### 3.3 Technical shape (for when the founder green-lights each layer)

- Personal layers live on **separate tables keyed to the user's own account id**, in a
  separate schema (`personal.*`), with RLS that grants access only to the owning user's
  session — a school staff session can never read them, by policy, not by hiding routes.
- They are opened under the same PWA but behind a **private PIN / device biometric** gate.
- Tuition fee money flows through a **separate rail**, not the school's payment rails: a
  personal UPI intent link the teacher owns. NetCyberAI touches it only for reminders
  (and, if the founder later chooses, payment confirmation), never custody of funds.
- **Sequencing note:** the founder's standing decision (2026-10) is to finish and launch the
  core platform first, and add personal/D2C layers once there is a real user base. This plan
  therefore **specifies** the layers fully but schedules them after P8, unless the founder
  reorders. What is scheduled **now** is the Family App core (§6), which is school-connected
  and already approved as P7b.

---

## 4. The cross-platform automation and AI architecture

### 4.1 One nervous system: domain events

Every module stops calling other modules directly and starts emitting **domain events**.

- New table `domain_events` (id, school_id, kind, occurred_at, actor_id, subject_type,
  subject_id, payload summary — ids and counts only, per C56). Written inside the same
  transaction as the change that caused it, or enqueued immediately after via the job
  pipeline.
- Event kinds begin with the ones the platform already reacts to and grow with each module:
  `attendance.absence_marked`, `attendance.chronic_pattern`, `homework.set`,
  `homework.missed_threshold`, `homework.submitted_family`, `pulse.drafted`,
  `pulse.ready`, `pulse.parent_replied_needs_help`, `fee.overdue`, `fee.payment_credited`,
  `marks.published`, `exam.answer_sheets_uploaded`, `exam.evaluated`,
  `complaint.created`, `complaint.sla_breach`, `staff.leave_requested`,
  `proxy.substitute_needed`, `admission.gone_quiet`, `certificate.requested`,
  `consent.changed`, `document.aadhaar_detected`.
- **Every existing point-to-point caller migrates to the event** (e.g., the attendance
  absence → WhatsApp notification currently wired directly becomes a subscriber). The
  send-gate remains the only door out.

### 4.2 Automation OS v1 — from "Spec v0" to the real engine (module 32)

Build the rule engine the catalog already promised, on the job pipeline:

- **Rule shape:** trigger (event kind) → conditions (the existing filter-engine expressions
  over event payload + related records) → actions. Prebuilt action types:
  `send_whatsapp_template` (through the gate), `create_task` (owner + due),
  `draft_ai_content` (lands in the relevant human's approval queue),
  `flag_on_dashboard`, `update_record_field`, `enqueue_report`, `notify_role`.
- **Prebuilt automation packs** shipped per module, off until the school turns them on
  (Settings framework): fee reminder ladder (T-7, T-1, T+3 after overdue),
  absence-same-day alert, chronic-absence flag, homework-recovery suggestion, complaint SLA
  escalation to principal, admission gone-quiet nudge, substitute suggestion on approved
  leave, Pulse-ready reminder at the teacher's chosen hour, marks-publish → report card PDF
  → family notification chain.
- **Every run audited** (rule id, trigger event, conditions evaluated, action taken or
  skipped with the reason). **Parent-facing actions still pass the approval or template
  gate** — the packs that message parents use approved templates, so the human approval
  already happened when the school enabled the pack and approved the template wording;
  anything adaptive (AI-written) always lands in a queue.
- **Surface:** a `Automation OS` screen in group 7 (AI Intelligence) listing rules with
  on/off, last runs, and failures; school-level automation budget (runs/day) in Settings.

### 4.3 AI orchestration — one router, many drafts, human approval

- Extend the existing `AIProvider` SPI into an **AI router** with task profiles:
  `pulse_draft`, `lesson_plan`, `worksheet`, `remark_draft`, `question_paper`,
  `answer_sheet_grade`, `doubt_hint`, `weekly_brief`, `home_action_plan`,
  `complaint_summary`, `health_audit_note`. Each profile pins: allowed models, max tokens,
  PII-stripping pre-processor, language (Hinglish/Hindi/English), and where its output
  lands for approval (Teacher App queue, office queue, family screen).
- **Cost discipline:** per-school monthly spend limit in Control (already a Copilot rule);
  `ai_usage` metering per profile; a school over its limit gets a clear message, never a
  silent failure. Batch-friendly profiles (grading) run through the job queue at night on
  the India date.
- **Privacy boundary in code:** a shared pre-processor that maps student/guardian PII to
  ephemeral tokens for the provider call and back on the result; CI test asserts no real
  name or phone reaches the provider (extend the Copilot slice's test).
- **Advisory-only outputs:** every AI artifact carries its source ("drafted from the
  syllabus map, taught-today log and homework set for 8-A, 14 Oct") and sits in a
  draft state until a human approves. Nothing sends itself.

### 4.4 Visibility as per intent — the visibility registry

"Everything visible as per intent across all platforms" becomes a built rule, not a hope:

- Each kind of information declares, in one registry (`src/lib/frameworks/visibility.ts`),
  the surfaces where it may appear and to which role: e.g. `fee.dues` → office, principal
  (aggregate), family (own children) — **never** the Teacher App; `marks.topic_gap` →
  teacher (own classes), principal (aggregate), family (own child, from P6 publish rules) —
  never fee-paired; `pulse.followup` → the class teacher only; `automation.run` → office +
  Control.
- Every screen reads the registry; a CI check fails any route that renders data its
  surface is not registered for. This is the mechanical guarantee behind "per intent" —
  and it inherits the Constitution's rules (no child ranked against named classmates for
  parents; fees never beside academic standing) as pre-registered prohibitions.

### 4.5 The channel router

- One place decides where a notification goes per recipient: **WhatsApp first** (the
  parent's main channel, through the gate), in-app next, email fallback where on record;
  quiet hours hold (not drop) via the outbox; every template names the school first and
  carries its staleness window (doc 25 rules 4–5).
- Teacher-facing and staff-facing notices go in-app first (no WhatsApp cost), with email
  as the fallback. Family-app-only nudges (homework due today) are in-app and, if consented
  under `operational_communication`, WhatsApp.
- Delivery states (sent/delivered/read/failed/held with reason) become visible per message
  on the Communication screen (doc 25 7b) — the school sees the truth, always.

### 4.6 Scheduled intelligence (nightly, India date)

One nightly job runner, already the pattern of Early Warning v2, hosting:
Early Warning rollup, fee overdue marking, curriculum gap recompute, Learning Genome
refresh, answer-sheet grading batches (§5.1), automation digest for the principal
("yesterday: 3 flags, 2 held for your approval"), and the messaging cost reconciliation.

---

## 5. Adopting Acadine — end to end, mapped onto existing modules

The founder has chosen to adopt Acadine's capabilities fully. Almost everything maps onto
modules NetCyberAI already has; only one becomes a new module. Build each as an extension
of the existing module, not a parallel product.

| # | Acadine capability | Lands in | What to build |
|---|---|---|---|
| 1 | **AI evaluation of handwritten answer sheets** (rubric-based, board-aligned: CBSE/ICSE/state) | `Exams & Report Card` (P6) + Teacher App | A new **Assessment AI** capability inside the Exams module: teacher/admin photographs or uploads answer-sheet images; a nightly batch returns per-question step marks against the board's rubric with confidence and evidence quotes; the **teacher edits and approves every mark before it enters marks entry** (advisory rule). Marks entry gains an "AI pre-filled, teacher-reviewed" provenance flag (doc 21 standard). |
| 2 | **Syllabus-weighted question paper generation** (10-minute paper from chapter weightage, question types, marks distribution) | `Teacher Copilot` + `Exams` setup | Copilot already drafts from the syllabus map — add profile `question_paper` with weightage config reusing the exams scheme builder and syllabus units (5d tables). Output: editable draft → teacher/office approves → paper PDF (doc 15 templates). |
| 3 | **Topic-level performance drill-down** (student → subject → chapter/topic) | `Learning Genome` (v1 exists, staff-only) | Genome v2: ingest marks per question tagged to syllabus units (from #1's rubric and marks entry), so gaps resolve to the chapter/topic level; show teachers per-class heat rows and parents a plain-language summary at Pulse/Brief time, in the family's language. No scores on children — evidence and reasons only (C208 style). |
| 4 | **Early performance prediction** ("identify struggles before it's too late") | `Early Warning` (v2 exists, nightly) | Early Warning v3 signal: sustained topic-gap + homework-miss + attendance pattern → a flag with its evidence and a suggested action. **Never a predictive score on a child**; the flag and reason pattern is already the house style. |
| 5 | **Assignment vs formal test distinction; student uploads** | Already exists conceptually | Homework (practice, family uploads via Family App 11f) vs Exams (formal, school uploads). Keep the distinction; the AI grader applies to exams and, optionally on a school setting, to homework photos (teacher reviews). |
| 6 | **Grade challenge / re-evaluation request** | `Exams` + Family App | A family or teacher can request a re-check of a published item; office approves; result recomputed and both versions kept with the audit. Builds parent trust and is unique among budget-school ERPs. |
| 7 | **Multi-centre management from one dashboard** | `Control` + a new `Groups` capability | Indian private schools run as trusts/branches. Add **school groups**: a trust/association dashboard in Control that aggregates member schools (attendance %, fee recovery, alerts) with strict per-school data isolation. This is also the sales instrument for the association strategy. |
| 8 | **Lecture/test scheduling with automated notifications** | `Timetable` + Automation OS | The exam-calendar → notification chain becomes a prebuilt automation pack (§4.2), not new code. |

**Reality check to keep in the docs:** AI answer-sheet grading has standing competitors in
India (Eklavvya and others). The wedge is not "we have AI grading" — it is that grading
lives **inside** the whole school loop (syllabus → attendance → homework → Pulse → fees →
report cards) at no separate licence, with a teacher approving every mark. Say that
everywhere the feature is described.

---

## 6. Adopting LoiLo — the parts that strengthen retention and distribution

| # | LoiLo capability | Lands in | What to build |
|---|---|---|---|
| 1 | **Student digital notebook / portfolio with unlimited history** ("all learning data, every grade, every subject, searchable") | Family App + a new **Learning Vault** | The single highest-value adoption. Every artifact the platform already generates — taught-today logbook entries, homework submissions, teacher-marked work, Pulse topics, published report cards, certificates, ID cards, health records (blood group, vaccinations the school holds) — lands in one per-child, chronological, searchable **Learning Vault**, visible in the Family App and exportable as the Certified Admission Dossier when the child changes schools. This is the "school changes, the record travels" promise made physical. |
| 2 | **First-year free + teacher accounts free forever** | Pricing (founder decision) + Control plans | Adopt the shape: teacher seats free on every plan (already the philosophy — teachers were never the payer), schools pay per student per year with the first term/year discounted or free for pilot schools. Founder sets prices. |
| 3 | **Free structured teacher training + teacher community + open lessons** | Help Center + Teacher App "More" | Expand Help Center with per-module "Show me how" (already the P1-c standard) into a proper **teacher training track** (short videos, checklists, a certificate of completion per module), and a moderated **teacher community** (public to all schools, never anonymised gossip about employers — keep it professional: lesson ideas, board patterns, subject resources). This is LoiLo's proven retention and word-of-mouth engine and it costs nearly nothing. |
| 4 | **Municipality-wide management** (SSO, rosters, statistics for an entire district) | `Groups` (from §5.7) | The trust/association dashboard is the Indian equivalent: bulk onboarding templates per association member school, a member-school health view for the association office, and aggregate (never individual-child) reporting. |
| 5 | **AI web filter + night-time device restrictions** | Family App (not the school platform) | On personal phones a school cannot (and must not) control a child's device. Adopt the **intent** honestly: a Family App "Focus Hours" — the family sets evening study hours; during them the child sees only study content in the app and notifications pause; parents get a nudge framework. Position it as family choice, never school surveillance. |
| 6 | **Collaborative notes / thinking tools / monitoring** | Deferred, device-gated | LoiLo's classroom collaboration assumes one device per student. Budget Indian schools do not have that. Do **not** build this now. Revisit when a partner school runs a device programme; the teacher's phone + Pulse reply chain is the interim collaboration surface. |
| 7 | **Attendance integration + health monitoring** | Learning Vault (§6.1) | Health fields the school legitimately holds (blood group, vaccination record, allergies) enter the child's vault with explicit consent purposes; shown to the family, never to other parents. |
| 8 | **Teacher resources library + certified lesson materials** | Teacher App "More" | Let teachers publish worksheets/question sets to a shared library (moderated, board-tagged, credit to the author). Feeds the Copilot too: school-made and teacher-made examples improve drafts without sending child data anywhere. |

---

## 7. Adopted picks from the reference startups (only what NetCyberAI lacks)

| Reference | Adopt | Lands in |
|---|---|---|
| **Khanmigo (Khan Academy)** | The **Socratic doubt-solver pattern**: the child photographs a question; the AI gives hints and step-by-step concept scaffolds in the family's language — **never the final answer on first ask**; escalation to a worked solution only after the child's attempts, with the attempt history in the Learning Vault. This is the parent app's future "study buddy" and the strongest family-retention feature on this list. | Family App personal/study layer (post-P8), pattern specified now |
| **Seesaw** | Portfolio-as-retention: the child's own work (photos, voice notes) belongs in the vault, not only school-issued documents. Homework hand-ins and teacher feedback already produce this — curate, don't rebuild. | Learning Vault |
| **ClassDojo** | The **class story feed**: a lightweight, positive-only stream of moments the teacher chooses to share with the class's parents (activity photos, celebrations) — distinct from the Daily Pulse's academic content, and consistent with the non-competitive Recognition rule (C76). Optional per teacher. | Family App home + Teacher App, P4/P7b era |
| **Toddle** | Teacher-first UX benchmark: gradebook and planner interactions that need one tap per student; the "stream" per class. Copy the interaction quality, not the IB framework. | Teacher App polish |
| **Satchel One** | The closed homework loop with parents visible end-to-end (set → submitted → marked → parent informed). NetCyberAI has all the parts across P2 + 11f — this adoption is to **wire the full loop visibly in the Family App homework screen**, including the late/missed states feeding Homework Recovery. | Family App 11f |
| **Eneza Education** | The low-bandwidth principle as a test: **every family-facing flow must work with WhatsApp alone, no app install** — already the platform's law (C84); keep it as an explicit acceptance test for every new family feature. | Standing test |
| **Chalk** | Micro-efficiency measurement (already: minutes-to-mark, taught-tap coverage) extended to new flows: minutes to check homework, minutes to approve a Pulse. | usage_events |
| **Eklavvya** | Not adopted — cited as the competitive reality-check for Assessment AI (§5 wedge statement). | — |

---

## 8. The Family App — build now (the founder's lifted hold)

Build per the reviewed plan **doc 31**, with the adopted additions. Order and slices:

1. **11a first, alone** (family sign-in by WhatsApp code to the number on record, family
   session type, route guards, `/family` PWA shell with its own service worker and scope,
   home with per-child cards + sibling switcher, account page). `/code-review` (medium) +
   `/security-review` on it before anything else proceeds.
2. **Then 11b, 11c, 11d in parallel** (fees + Pay Now + receipts on the existing rails;
   attendance calendar; reports/notices/events).
3. **Then 11e, 11f, 11g in parallel** (PTM booking; homework hand-in with the Aadhaar
   screen rule; study materials).
4. **11h (new, this plan): Learning Vault foundation** — the per-child timeline that
   aggregates what 11b–11g already produce (receipts and vault stay separate surfaces; the
   vault never shows money). Searchable, month-grouped, exportable dossier behind the
   certificate permissions. This is the family-retention core and should ship with the
   app, not after it.
5. **WhatsApp stays the main channel** (C84): nothing in the app becomes the only way to
   reach the school; every flow also works by WhatsApp reply (Eneza test).
6. Consent, sign-in neutrality, session separation from staff, device rules, and every
   acceptance line in doc 31 §3–4 hold exactly as written there.

---

## 9. Suggested sequencing (Claude Code may reorder with reasons logged)

| Order | Work | Why here |
|---|---|---|
| 1 | **Family App 11a → 11g → 11h** (doc 31 + §8) | Founder's lifted hold; it unblocks family-side value of everything already built |
| 2 | **P4 WhatsApp live** (doc 25 7a–7g) | Nothing family-facing sends until the parent loop is live; Pulse, notices, fee reminders all wait on it |
| 3 | **Automation backbone**: `domain_events` table + migrate existing point-to-point callers + Automation OS v1 engine + first five prebuilt packs (fee ladder, absence alert, homework recovery, complaint SLA, Pulse-ready reminder) | Cheap once P4 is live; multiplies every module after it |
| 4 | **P5/P6 continuation** with the Acadine adoption folded in: Assessment AI in Exams, question-paper profile in Copilot, Learning Genome v2 topic-level, Early Warning v3 | AI adoption rides the phase that already touches these tables |
| 5 | **Groups/trust dashboards + teacher training track + resource library** (LoiLo items) | Distribution and retention, before first-school scaling |
| 6 | **P7 completion + P8 launch hardening** as the roadmap already requires | Nothing here suspends P8 |
| 7 | **Personal layers (§3)** — teacher private layer, family study/personal layer with the Socratic tutor — **only on the founder's explicit go** | Founder's standing decision: core first, D2C after a user base |

---

## 10. Founder inputs this plan needs (always listed first, per the operating model)

1. **A real AI provider + key + monthly spend limit** (C235 recommends Vertex AI in
   asia-south1; a Gemini app subscription is not an API key). Blocks: Copilot live, and
   every profile in §4.3.
2. **Meta Business verification + WABA + approved templates** — blocks P4 and the family
   sign-in code template (doc 31 §6).
3. **The live-site service_role key fix** (Roadmap §5.8) — blocks logins, invites, uploads.
4. Store-listing decision for the Family App (PWA-first default stands).
5. Lawyer review of the family privacy notice and the Focus Hours/health-data consent
   wording (DPDP).
6. Pricing decisions: teacher-free-forever shape, first-year-free pilot terms.
7. Explicit go/no-go on each personal layer (§3) and on Focus Hours (§6.5).

---

## 11. What must NOT be claimed or built (anti-fabrication and scope discipline)

- No performance claims about AI grading speed/accuracy in UI or docs until measured on
  real data; say "teacher-reviewed drafts" not "X% accuracy".
- No fabricated retention/engagement statistics anywhere; the Learning Vault, Focus Hours
  and doubt-solver are described as capabilities, never as results.
- No classroom collaboration tools built on the assumption of one device per student.
- No school access to personal layers — not even "read-only for safety" — the 0% is the
  product promise; if the founder ever changes it, that is a Constitution amendment.
- No Aadhaar anywhere, ever (C232 stands).
- Nothing reaches a parent unread by a human (Amendment 3), including every automation
  pack and AI draft.

---

## 12. Acceptance criteria for this programme

1. A teacher marks attendance offline, reaches home, syncs — unchanged and still true.
2. A fee goes overdue → the automation ladder drafts and queues (or sends, per school
   settings) reminders with the payment link, and the principal's digest shows it — without
   anyone opening a screen.
3. An answer sheet is uploaded → an AI rubric draft exists by morning → the teacher edits
   and approves → marks entry shows its provenance → the report card publishes → the
   family is notified through the gate.
4. A parent signs into `/family` with a code to the number on record, sees exactly their
   children, pays dues on the school's rails, hands in homework, books a PTM, and finds
   every school-sent artifact of the term in one Learning Vault timeline.
5. Every new screen passes the ModulePage check, EN/HI, tours, empty states, 360–1440, and
   the visibility registry (a route rendering data it is not registered for fails CI).
6. Every automation run and every AI draft is audited with ids and counts; every
   parent-facing AI output required a human approval; `ai_usage` shows the spend per school.
7. The Decision Log records every overrule Claude Code made against this document, with
   the reason.
