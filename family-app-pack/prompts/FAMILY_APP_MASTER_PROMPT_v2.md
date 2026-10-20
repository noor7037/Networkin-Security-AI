CONTEXT: From Noor (founder), prepared with the build lead's own research and critical review, to the Claude Code
build lead in netcyberai-core. This programme builds the NetCyber AI Family App as a premium, real product. It covers
every feature already in the plan, the founder's four mockup boards, the founder's 10 private features and 3
recommended additions, each judged and mapped. Work by CLAUDE.md, challenge this brief with evidence where it is
wrong, and report in plain words, founder actions first.

## 0. Sources of intent, and one hard rule

| Source | What it gives | How to use it |
|---|---|---|
| The founder's words (§1), `docs/family-app/00`–`09`, Decision Log C230-H to C230-K | Intent, rules, architecture | Binding unless this prompt changes them; log every change |
| The founder's four mockup boards (Parts 1–3 and the overview), attached to this session; the lead commits them to `docs/family-app/mockups/` in the first PR | Look, feel, scope and screen ideas | The reference for the experience. **Not** a source of facts: their sample data is illustrative and some of it is wrong (§7.4) |
| The founder's 10 features and 3 recommendations | Scope the founder wants | Every one is mapped in §4, with its verdict |
| Evidence (§2) | What works and what the law allows | Cite it in Decision Log rows |

**Hard rule:** the weekend prototype (`~/Downloads/WeekEnd Bilder`) is not a specification, design, data source or code
source. Do not open it to learn what to build. Its only use is `docs/family-app/prototype-audit/AUDIT.md` §2–§4: a
list of failures to prevent, and methods to automate.

## 1. The founder's intent

> "Your child's school syllabus, explained every day in your language, with the best videos, quizzes and every
> government scheme you qualify for — whether or not your school uses NetCyberAI."

> "Whichever school the child is in, or if the school changes, this app stays on the phone until class 12."

A premium, modern, vivid app that keeps families from the first minute.

1. **Specific, never generic:** this child's board, class, chapter, language and past mistakes.
2. **Real, never a demo:**
   - real accounts, real saved progress, real AI;
   - verified facts with an official source and a "checked on" date;
   - nothing simulated, nothing invented.
3. **Learning that sticks:** understand → check → practise → revisit until mastered. Progress is checked mastery.
4. **Hindi first-class:**
   - every screen is complete in Hindi;
   - English technical terms sit beside the Hindi ones;
   - Hinglish (Hindi in Roman script) is available as an explanation style.
5. **The child's lifelong companion:**
   - learning help;
   - exam runways;
   - opportunities and careers;
   - a lifetime record that survives any change of school.
6. **The parent's calm superpower:**
   - knowing what to do tonight;
   - never missing a form or deadline;
   - helping in their own language.
7. **Premium, but kind:**
   - beautiful and fast on a budget Android phone on 4G;
   - no fear, no pressure, no ranking of children;
   - families stay because the app is useful.
8. **Depth over count:** fewer flows, each excellent.

## 2. Evidence that shapes the design

- **Tutors, not answer machines:**
  - Unrestricted GPT-4 practice cut later exam scores by 17%; a hint-based tutor removed most of that harm (Bastani et
    al., PNAS 2025).
  - A purpose-built AI tutor beat active learning in less time (Kestin et al., Scientific Reports 2025).
  - Teacher-guided AI tutoring gave +0.31 SD in six weeks (World Bank, Nigeria 2025).
  - **So:** hints come first, the child attempts first, and the child does the last step.
- **Testing and spacing work** (Dunlosky et al., 2013): every response ends in a check, mastery means correct on two
  days at least 7 days apart, and revisits are scheduled.
- **Personalised, multi-format content helps retention:** 78% vs 67% on a test 3–5 days later (Google Learn Your Way,
  2025; small study). **So:** blocks are assembled for this child.
- **Rewards can backfire:** across 128 studies, tangible rewards for doing a task lowered intrinsic motivation (Deci,
  Koestner & Ryan, 1999). **So:** rewards follow mastery, not days logged; they are informational and used sparingly.
- **Children's data law:**
  - DPDP Rules were notified on 13 Nov 2025; verifiable parental consent (Rule 10) applies from 13 May 2027.
  - Section 9 bars tracking, behavioural monitoring and targeted ads directed at children.
  - The narrow Fourth Schedule purposes (real-time location for safety, blocking harmful content) do not cover
    "engagement" or "screen control" by an edtech company. The lawyer decides edge cases (gates L1, L2).
- **Phones:**
  - Google Play has restricted Accessibility-API automation since 28 Jan 2026.
  - iOS parental controls need Apple's Family Controls entitlement, granted on review.
  - A PWA cannot control other apps (`02` §13).
- **Content rights:**
  - NCERT books are CC BY-NC-ND: titles and structure only, linked, never copied.
  - Olympiad organisers sell their own papers: never copy them.
  - Use only papers the issuer publishes under terms that allow it.

## 3. Product architecture

**Five tabs** (from the mockups, made calmer and grouped). The "More" grid of 20 items is replaced by grouped sections
inside these tabs.

| Tab | Holds |
|---|---|
| **Home** | Greeting and child switcher; "continue"; today's plan (15–30 min, adaptive); the ask box (type, photo, speak); tonight's talk question; one card of what matters today (a deadline, a school notice) |
| **Learn** | Understand (the Concept Resolver); Homework help (photo, hint ladder); Practice and mastery; My plan and revision; Board 30-day plan; Offline packs |
| **English** | The English moment (also inside every response); the 90-day programme; Parent + child duet; the practice partner (pilot) |
| **Future** | Exam runway (Navodaya, Sainik, Military Schools, Olympiads, NMMS, boards); Scholarships and schemes with readiness; Career compass and pathways |
| **Family** | Child profiles; Lifetime vault (records, certificates, optional health); Admission dossier; My school (linked children: Today, attendance, reports, notices, fees, PTM, homework, material, Daily Pulse); PTM → 14-day plan; Learning-first routine; Family rewards; Books and uniform exchange (later); Plan and billing; Settings and privacy |

**The daily loop:**
1. Open the app.
2. See today's plan.
3. Ask, understand, check and practise.
4. Due revisits.
5. The parent sees one calm line.

The parent sees: what was practised, what is shaky, what to say tonight, and what deadline is coming.

**Class-adaptive:**
- Classes 3–5 get bigger targets, brighter accents and shorter sets.
- Classes 6–8 get the standard register.
- Classes 9–12 get a calmer, exam-focused register.

The first build covers classes 6–10; the registers are in the design from day one.

## 4. The feature map: every feature, judged

**Verdicts:**
- **Adopt:** build as described.
- **Adapt:** build the useful core, changed for law, truth or learning.
- **Later:** after launch, by evidence.
- **Founder:** needs the founder's decision.
- **Reject:** do not build.

**Money:**
- **Free:** always free.
- **1-subject:** free for one subject per child; Plus for all.
- **Plus:** Family Plus.
- **Pack:** a one-time season pack.
- **School:** school information, always free to linked families.

### Learn

| # | Feature (source) | Verdict | What we build | Milestone | Money |
|---|---|---|---|---|---|
| L1 | Understand / Concept Resolver (plan, mockups) | Adopt | Topic, search, typed or photo question → streamed typed blocks: explanation, worked example, key points, diagram, check, practice, English moment, sources; follow-ups "simpler / another example / explain differently / practise more"; EN, HI, Hinglish | M1 (text), M2 (photo) | 1-subject |
| L2 | Visual learning: mind map, diagram, interactive diagram (change values, animate), simulation, 3D model (plan, mockups) | Adopt within `09` §3 | Our own renderers from structured data. Interactive maths diagrams. In-house simulations with verified physics. True 3D only on tap, lazy, with a 2D fallback | M1 diagram, M2 interactive and simulations, later 3D | 1-subject |
| L3 | Socratic homework helper (founder #3, mockups) | Adopt | Photo of a question → the topic is detected → a hint ladder (hint 1 of 3 → the child's attempt, with feedback → next hint → "I'm stuck" → step-by-step), and the child writes the final answer. Never the answer first. Aadhaar and face screen on photos; photos deleted in 24 h | M2 | Free: 3 photo questions a day; Plus: higher fair-use cap (the founder's ₹99/month becomes part of Plus) |
| L4 | Checks, practice, misconception-to-mastery, spaced revision (plan, mockups) | Adopt | Distractors tagged with the misconception they reveal; a wrong answer brings a different explanation plus 2–3 targeted items; revisits at 3 and 10 days; mastered = correct on 2 days ≥ 7 days apart | M1 core, M2 full | 1-subject |
| L5 | Adaptive study plan (recommendation 1, plan, mockups) | Adopt | Each day: due revisits, then weak topics, then the next syllabus topic (and today's school topic for linked children), within a 15–30 min capacity; reflows from today; never a backlog wall | M2 | 1-subject |
| L6 | Board exam 30-day plan (founder #10, mockups) | Adapt | "Board 30-day plan": high-priority practice sets drawn from the board's official unit weightage, its sample papers and marking schemes, and the past papers the board publishes. Reviewed. Labelled "practice priorities, not predictions". Explanations from our blocks and the video finder. Called a plan, never a "panic button" | M4 | Pack per subject (the founder's ₹99 test band) or Plus |
| L7 | Practice worksheets with explanations (mockups) | Adopt | Practice sets as screens, plus a printable PDF for families who prefer paper | M2 | 1-subject |
| L8 | Video in the response (plan, mockups) | Adopt, corrected | Video finder; tap to load; never autoplay. The copy says the provider may show ads and suggestions, **never "no distractions"** (`01` E13) | M2 | 1-subject |
| L9 | Offline and low-data packs (recommendation 3, plan, mockups) | Adopt | Download a chapter pack (reviewed responses, practice sets, notes) with its size shown; answers sync later; live AI, voice and video say "needs internet"; data-saver loads text first | M2 | Free for the free subject; Plus for all |
| L10 | Tonight's practice (plan, linked) | Adopt | Practice on what the class covered today | M3 | 1-subject |
| L11 | Exam-day kit and past papers (plan) | Adopt | Countdown, paper pattern, checklist and official links; past papers mapped to topics | M4 | 1-subject |
| L12 | Board answer-writing feedback (plan) | Later | Answers checked against the marking-scheme style | After launch | Plus |

### English

| # | Feature (source) | Verdict | What we build | Milestone | Money |
|---|---|---|---|---|---|
| E1 | English moment, 3–5 lines (plan, mockups) | Adopt | Key words with their Hindi meaning, a model sentence, a pattern, and "read aloud" (device speech, labelled) | M1 | Free |
| E2 | 90-day English programme (plan, mockups) | Adopt | Phases: Foundation, Confidence, Expand, and Mastery/Workplace for older learners; a daily 15-minute lesson (story, vocabulary, grammar, listen, speak, read, write); assessments on days 0, 45 and 90. **No fluency promise**: measured progress only | M6 | Plus |
| E3 | Parent + child English duet (founder #7, mockups) | Adapt | 5 minutes a day: 3 everyday sentences, parent and child together, with sound-level feedback. It says "try again" when unsure, never "wrong". **No percentage score** until accuracy on Indian accents is measured. Consent purpose `voice_practice`; a provider that permits minors and supports Indian English (gate) | M6 | Plus (the founder's ₹69/month or ₹499/year test band) |
| E4 | AI conversation partner, 15 min a day (plan pilot, mockups) | Later (costed pilot) | Topic roleplays by voice or text, with a daily limit set in Control. An illustrated character, never a photo-real human | Pilot after launch | Plus or add-on, on measured cost (`05` §5) |
| E5 | Domain English packs (plan) | Later | Interviews, office, IT, finance and others | After launch | Plus |

### Future

| # | Feature (source) | Verdict | What we build | Milestone | Money |
|---|---|---|---|---|---|
| F1 | Competitive exam runway: Navodaya (class 6, class 9 lateral), Sainik (AISSEE), Military Schools, NMMS, Olympiads (founder #1, mockups) | Adopt | Per exam: verified dates and official links, the pattern and syllabus from the official notice, form-open alerts, a weekly plan to the exam date (the L5 engine), **our own original mock tests** (reviewed, answers re-solved), and only the past papers the issuer publishes | M4 | Information and alerts free; mock series as Pack (the founder's ₹199 test band) or Plus (₹499/year test band) |
| F2 | Scholarships, schemes and readiness (recommendation 2, plan, mockups) | Adopt | Structured eligibility → "likely eligible: check these conditions" or "not eligible because…". Document checklist, deadlines, an application tracker, reminders. The National Scholarship Portal and official pages are the sources. **Unverified items are never shown**, and there is **no "% match"** | M4 | Free |
| F3 | Career compass, class 8–10 stream selector (founder #9, mockups) | Adapt | Game-based activities on an established interest framework (RIASEC-type) plus aptitude puzzles on recognised dimensions (as in NCERT and CBSE's TAMANNA). Results read as "strengths to explore" with reasons, **never a % match or a diagnosis**, plus a parent conversation guide. Routes come only from the vetted pathway graph. Piloted with a counsellor's review before launch | M4 | Summary free; in-depth roadmap Plus (or a one-time report in the founder's ₹249 test band) |
| F4 | Career pathways explorer (plan, mockups) | Adopt | A vetted graph with a source on every step, a roadmap timeline, skills, exams, and plain uncertainty | M4 | Free; saved plans Plus |

### Family and records

| # | Feature (source) | Verdict | What we build | Milestone | Money |
|---|---|---|---|---|---|
| R1 | Lifetime academic record (founder #2, plan, mockups) | Adopt | A timeline of report cards, certificates, TC and sports. "Verified by school" **only** with a `/verify` link; everything else is marked "added by family". Survives any change of school | M5 | Free up to a storage limit (the founder's 50 MB); more in Plus |
| R2 | Health record: vaccination, blood group (founder #2, master plan) | Adapt | Optional; its own consent purpose `health_records`; family-entered; encrypted; never sent to AI; never seen by a school unless the family exports it | M5 | Free |
| R3 | Admission dossier and one-tap share to a new school (founder #2, plan, mockups) | Adopt | Choose records → preview → a PDF and an expiring, view-only, revocable link. Called "certified" only if every item carries a verification link | M5 | One-time (the founder's ₹149 test band) or Plus |
| R4 | DigiLocker / APAAR link (research) | Later | Pull official documents only through official partner APIs, if approved. We never handle Aadhaar (C232) | After launch | Free |
| R5 | PTM → 14-day home action plan (founder #6, mockups) | Adapt | Input is the parent's own notes (typed or spoken) or, for linked schools, the teacher's notes through School Link. Recording the meeting is allowed **only with the teacher's agreement**: the audio is transcribed, then deleted. Output is a 14-day plan of 15 minutes a night, mapped to syllabus topics and the mastery loop, with parent guidance. "Request teacher follow-up" goes to the existing follow-up queue | M3 | Plus (the founder's ₹79 folds into Plus) |
| R6 | Learn-to-unlock screen time (founder #4, mockups) | Adapt in two steps, then Founder | **Step 1 (M2):** a learning-first routine. The child agrees a daily goal; the parent sees "today's learning done" from our own data only; a guided hand-off to Google Family Link or iOS Screen Time, where the parent grants time. **Step 2 (later):** a native Android companion that locks apps, only after the lawyer rules on DPDP behavioural monitoring, a Play policy review and, for iOS, the Family Controls entitlement | M2; Step 2 Founder | Step 1 free; Step 2 add-on (the founder's ₹49 test band) |
| R7 | Streaks, rewards and micro-scholarships (founder #5, mockups) | Adapt, part Founder | A forgiving weekly goal (for example 5 of 7 days), never "you broke your streak", **no leaderboard**. Badges for **mastered topics**, not days. A family reward jar: the parent sets a reward, pays it themselves, and the app tracks the goal. Sponsor-funded micro-scholarships come only later, as a CSR-style pool: no brand messages to children, no child data to sponsors, a payouts partner and the lawyer first | Jar M2; sponsor pool Founder | Free |
| R8 | Books and uniform exchange (founder #8, mockups) | Adapt, Later | Parents only (18+). The child's school community first, then the locality. Area only, never an exact location. Sell or donate, with no in-app payments. Photo screening (no children's faces), report and block, a moderation queue, a grievance officer. Advertising only by founder exception to `05` rule 4 | Pilot after launch | Free |
| R9 | Weekly parent summary and tonight's talk question (plan, mockups) | Adopt | Three lines a week. A talk question each evening from what the child learned; for linked schools it is the school's Daily Pulse | M2 (summary, question), M3 (Pulse) | Free |
| R10 | Multi-child, child switcher, class-adaptive homes (plan, mockups) | Adopt | One account and several children; everything is keyed to the child | M1 | Free |

### School-connected (linked children only; always free)

| # | Feature (source) | Verdict | What we build | Milestone | Money |
|---|---|---|---|---|---|
| S1 | School Link (plan) | Adopt | A school-issued, single-use connect code. Unlinking ends access in the same request | M3 | School |
| S2 | Today at school, attendance calendar, report cards, notices, events, fees and receipts (their own section), PTM booking, homework hand-in, study material, how to help at home, Daily Pulse with in-app replies (plan, mockups) | Adopt | Per `02` §9, through `SchoolLink` only | M3 | School |
| S3 | Exam transparency: rubric, answer sheet, re-evaluation (plan, mockups) | Later | Needs a pilot school and the ERP P6 extension first | After launch | School |
| S4 | Class story in the Pulse (mockups) | Reject for now | Teacher workload and media consent (`02` §13); revisit with pilot schools | — | — |

### Platform

| # | Feature (source) | Verdict | What we build | Milestone | Money |
|---|---|---|---|---|---|
| P1 | Plan and subscription screen: one free subject; Family Plus for all children (plan, mockups) | Adopt | Designed now, prices hidden until pilot retention (`05` §4); cancel in two taps | M7 | — |
| P2 | Settings and privacy | Adopt | Language (EN, HI, Hinglish), consents per purpose, see and delete answers, delete the account | M1 | Free |
| P3 | Control → Family and Control → AI | Adopt | Flags, review queues, caps, providers and health; never a child's data | M1 thin, then each milestone | — |

### Rejected from the mockups

- A leaderboard tab.
- "% match" figures on careers and scholarships.
- "No distractions" on videos.
- A photo-real AI person.
- "Predicted" exam questions.
- Sample facts shown as real (§7.4).
- A 20-item "More" grid.

## 5. Milestones (each its own wave and PR stack, with the §9 gates)

**M1 — the signature slice** (thin FA-1, P-AI and FA-3):
- A parent signs up with an email code, consents, and adds a child (first name, class 6–10, CBSE, EN, HI or Hinglish,
  state) in under 60 seconds.
- The child picks a chapter and topic or types a question and gets a streamed block response for that exact chapter.
- The child answers a check (hint first) and practises.
- Progress moves only on checked answers.
- The parent sees a calm card.
- Scope: Maths and Science, with the 2026-27 catalog confirmed by a reviewer.
- Settings, privacy and child switcher (P2, R10) are included.
- Done when: the founder, on their own phone and in Hindi, runs this story, answers wrongly, gets a different
  explanation, and sees progress the next day.

**M2 — the daily habit** (FA-4):
- L1 photo input, L2 interactive and simulations, L3 homework helper;
- L4 full, L5 adaptive plan;
- L7, L8, L9;
- voice input through the `speech_to_text` adapter with consent;
- R6 step 1, R7 jar, R9 summary and talk question.

**M3 — the school connected** (FA-2 and School Link):
- S1, S2, L10;
- R5 PTM → 14-day plan, with teacher follow-up.
- This is also the zero-cost distribution channel: schools install the app.

**M4 — the future** (FA-5): F1 exam runway, F2 opportunities and readiness, F3 career compass, F4 pathways, L6 board
30-day plan, L11 exam-day kit and past papers.

**M5 — the lifetime record:** R1, R2, R3.

**M6 — English** (FA-6): E2 programme, E3 duet (after its accuracy gate).

**M7 — Plus and launch** (FA-6, FA-7):
- Subscriptions (UPI AutoPay), season packs and school-sponsored Plus;
- the launch audit;
- gates L1–L7 closed.

**After launch, by evidence:** E4, E5, L12, S3, R4, R6 step 2, the R7 sponsor pool, R8, more boards, states and
languages.

**Order note:** this moves the learning loop (M1, M2) ahead of school information (`07` had FA-2 first), because it
is the founder's core intent. M3 stays early because schools are the distribution channel. Log the reason in the
Decision Log.

## 6. Money (rules from `05` stand)

- **Free core that stays useful:**
  - one subject per child, with the full loop;
  - 3 photo questions a day;
  - English moments;
  - opportunities and readiness;
  - exam information and alerts;
  - the career summary;
  - the vault (up to the storage limit);
  - the weekly summary;
  - all school information for linked children.
- **Family Plus** (one price for all the family's children; school-sponsored Plus for a school's families):
  - every subject and higher caps;
  - the full homework helper;
  - the 90-day English programme and the duet;
  - PTM plans;
  - the in-depth career roadmap;
  - saved career plans;
  - vault storage and the dossier;
  - mock test series.
- **Season packs** for families who do not subscribe: an exam-runway pack, and a Board 30-day pack per subject.
- **Add-ons only when they exist:** practice-partner minutes; the native screen routine.
- **Prices:**
  - The founder's numbers (₹49–₹499 points, and the mockups' ₹299 a month for Plus) are **test bands for the
    pilot**, not prices.
  - No price appears in the product before free-family 30-day retention is measured (`05` §4).
  - Never one subscription per feature: parents get one clear choice.
- **No advertising** (`05` rule 4), **no data sales, no fear selling, no loans, no sales calls.** Any exception
  (R7 sponsors, R8 local listings) is a founder decision after the lawyer.

## 7. Design: the mockups, raised to premium

### 7.1 Keep from the mockups

- Deep navy and electric-blue headers with white cards. This matches the v5 tokens: `sapphire`, `midnight`, `royal`,
  `electric`, with `cyan`, `grape`, `tangerine` and `sunshine` as accents.
- Colourful module tiles.
- A friendly greeting.
- A clear "Today's plan".
- The ask box with camera and mic.
- Progress rings and subject bars.
- Chips for filters.
- Official-link buttons.
- The hint ladder.
- "Your attempt" feedback.
- The Hindi meaning under English lines.
- The four-phase English path.
- Career roadmap timelines.
- The vault timeline with "verified by school".
- Offline packs with their sizes.

### 7.2 Raise them

- **One clear purpose per screen:**
  - at most 4 tiles on Home, plus "Today";
  - grouped sections instead of a 20-item grid;
  - one primary action per screen.
- **Type:**
  - a modern Latin sans plus Noto Sans Devanagari, self-hosted and subset;
  - body 16–18 px, Devanagari line height ≥ 1.6;
  - large display numbers for progress and countdowns;
  - nothing below 12 px, unlike the mockups' 10 px labels.
- **Colour:**
  - v5 tokens only;
  - one hue per subject everywhere that subject appears;
  - gradients only on headers, progress and celebrations, with AA text on them;
  - status never carried by colour alone.
- **Depth:**
  - 16–24 px radii;
  - layered soft shadows;
  - press, lift and tilt-on-focus through `transform` only;
  - parallax on one layer at most.
- **Motion:**
  - entrances under 400 ms;
  - blocks reveal as they stream;
  - diagrams draw themselves;
  - a short celebration only for mastery checked twice;
  - everything becomes a fade under reduced motion, and confetti is off.
- **Imagery:**
  - one consistent icon family;
  - our own commissioned illustrations: never copied, never generic stock, never photo-real AI people.
  - A character (the mockups show a robot) only if the founder chooses one, with five states: idle, thinking,
    correct, try again, celebrate.
- **States:** every async area has a skeleton; designed empty, error, offline, cap-reached and "not switched on yet"
  states.

### 7.3 Never (in addition to `09` §6)

- Leaderboards.
- "% match".
- Loss-framed streaks.
- Fear copy.
- Numbers without a source.
- English-only lines on Hindi screens.
- Sideways scrolling.

### 7.4 Mockup sample data that must not reach the product

These are examples of what is wrong in the mockups; verify everything.

- "INSPIRE Scholarship (class 9–12)": INSPIRE-SHE is for B.Sc. and M.Sc. students.
- Every exam date and "last date".
- "80% match" and "92% match".
- "High growth" and "stable career" tags without a source.
- "No distractions" on videos.
- "Good pronunciation 85%".
- The sample school, child and fee data.

## 8. Non-negotiables

- **Truth:**
  - no invented number, name, date, claim or source in the product (`check_claims.py`);
  - a fact without a source and a "checked on" date is not shown;
  - mock tests and practice items are our own, reviewed, with answers re-solved.
- **AI:**
  - the model fills JSON for known blocks; our components render them; never model HTML or code;
  - numbers recomputed; links from the allowlist;
  - "AI-made" shown until reviewed;
  - prompt text versioned in the repository;
  - hint-first enforced in the prompt and in the UI.
- **Privacy and safety:**
  - a child is a first name, class, board, medium and state;
  - no child identifier reaches a provider (a pre-processor, plus a test on the real outgoing request);
  - separate consent purposes: `study_core`, `photo_input`, `voice_practice`, `health_records`,
    `opportunity_matching`, `school_link`;
  - no trackers, and no third-party images or fonts at runtime;
  - photos deleted in 24 h, meeting audio deleted after transcription;
  - the exchange is for adults only;
  - the parent can see and delete everything.
- **Language:**
  - `fam.` keys in `en.ts` and `hi.ts`;
  - content data carries Hindi fields;
  - Hinglish is a content style, not a UI language;
  - `<html lang>` follows the chosen language.
- **Accessibility and layout:** AA contrast, 44 px targets, labels on every control, no sideways scrolling at 360, 390
  or 1440 px.
- **Performance** (`09` §4): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, ≤ 200 KB of JavaScript transferred (counting
  prefetch), no 3D library in the first load.
- **Security:**
  - the family session and guard (`03` §3);
  - forced RLS on `family.*` and `content.*` with no foreign key into `public.*`;
  - one guarded route per action;
  - no raw errors on screen.

## 9. Proof gates (automated; a PR that misses one fails)

1. **Typecheck and tests.** `tsc` and the slice's tests, including:
   - RLS with two accounts;
   - a family session refused by staff APIs, and the reverse;
   - block safety;
   - the pre-processor test on the outgoing request;
   - the minors check;
   - numeric recomputation;
   - the cap message;
   - consent: no processing without the purpose's consent.
2. **Harness pictures** of every family screen at 360, 390 and 1440 px, in English and Hindi, with reduced motion on
   and off. Compare them against the mockup intent in the PR.
3. **Scripts that fail the run:**
   - axe: zero serious or critical issues;
   - no horizontal overflow;
   - Hindi completeness;
   - nothing moves under `reduce`;
   - Lighthouse mobile budgets per family screen.
4. **Quality evaluations before a milestone is called done:**
   - AI responses: 40 topics in each language, on a reviewer rubric (correct, class level, hint-first, apt example,
     natural Hindi, numbers check);
   - mock tests: every item reviewed and answer-checked;
   - the duet: speech feedback measured on Indian-accented samples before any score is shown;
   - the career compass: a counsellor's review of the results on a pilot group.
   Record each pass rate, and claim nothing beyond it.

## 10. When something is missing

- **No AI provider key:** use a recorded-response adapter in tests only. The app shows "Explanations are not switched
  on yet". Never present canned text as AI.
- **Doubt over a fact or a catalog line:** it is not shown.
- **A law or policy question** (rewards, the screen lock, health data, recordings, the exchange): build the safe step
  only, and list the question under founder actions with the gate it waits on.
- **A conflict with the docs:** state the evidence, propose, and log it.

## 11. Founder decisions this programme needs (ask once, in founder actions)

1. The AI provider (terms that permit children, zero retention where required), its key and monthly caps.
2. Reviewers for subjects, mock tests, opportunities, careers and English.
3. A character or mascot: yes or no (the mockups suggest one).
4. Hinglish as a third explanation style (recommended: yes).
5. With the lawyer:
   - health records' consent wording;
   - meeting recordings;
   - the native screen lock (R6 step 2);
   - sponsor rewards (R7);
   - local listings on the exchange (R8);
   - whether the mastery loop is "behavioural monitoring" (L2).
6. Pricing test bands for the pilot, and the payment gateway (M7).

## 12. Working rules and report

- **CLAUDE.md in full:**
  - one coherent slice per PR, on base `main`;
  - reviews scaled to risk (auth, RLS, personal data, money and messaging get `/code-review` medium plus
    `/security-review`);
  - no Co-Authored-By and no model name anywhere;
  - never merge or push to `main`;
  - no secrets in code, logs, chat or PR text.
- **Models:** per `08` §1 W, the strongest model for auth, RLS, migrations, personal data and security.
- **Report:** in the Transparent Output Template, founder actions first, short. Include a phone demo script the founder
  can follow in Hindi, harness pictures, and every gate's real output.
- **Start with M1.** Stop after M1's PR stack and report before starting M2.
