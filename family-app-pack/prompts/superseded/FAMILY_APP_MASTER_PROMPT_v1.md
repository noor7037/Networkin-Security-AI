CONTEXT: From Noor (founder), prepared with the build lead's own research, to the Claude Code build lead in
netcyberai-core. This programme turns the founder's intent for the Family App into a real, working product, starting
with one signature slice a family can use end to end on a phone. Work by CLAUDE.md, challenge this brief with
evidence where it is wrong, and report in plain words, founder actions first.

## 0. The rule above everything

The weekend prototype (`~/Downloads/WeekEnd Bilder`) is NOT a specification, NOT a design reference and NOT a source
of code or data.
- Do not open it to learn what to build.
- Do not copy, port or imitate its screens, wording or data.
- Its only permitted use is `docs/family-app/prototype-audit/AUDIT.md` §2–§4. Read those sections as a list of
  failures that must never appear in our app, and as measurement methods to automate.

What to build comes from:
- the founder's intent (§1);
- `docs/family-app/00`–`09` and the Decision Log (C230-H to C230-K);
- the evidence in §2.

## 1. The founder's intent: what success feels like

In the founder's own words (spec of 18 Oct 2026): "Your child's school syllabus, explained every day in your
language, with the best videos, quizzes and every government scheme you qualify for — whether or not your school uses
NetCyberAI." From the founder's brief behind `09`: a premium, modern, vivid app that keeps families from the first
minute.

Concretely:
1. **Specific, never generic.** Everything is about this child: board, class, chapter, language and past mistakes. A
   response that would fit any child is a failure.
2. **Real, not a demo.** Real accounts, real saved progress, real AI responses once a provider is connected, and real
   verified facts. Nothing is simulated on a timer; nothing is invented.
3. **Learning that sticks.** The child understands, is checked, practises, and comes back until it holds. Progress
   means checked mastery, never "opened" or "read".
4. **Hindi is a first language, not a translation.** Every screen is complete in Hindi, with the English technical
   term beside the Hindi one so exam vocabulary builds.
5. **Trust.** Every fact carries an official source and the date it was checked. Show nothing rather than something
   unverified.
6. **Premium from the first minute.** Beautiful, calm and fast on a budget Android phone on 4G. Never cluttered.
7. **Kept because it is useful.** Measured by topics mastered and 30-day return, never by minutes in the app, streak
   pressure or fear.
8. **Depth over count.** A few flows done excellently, not many done thinly.

## 2. Evidence that shapes the design (cite it in the Decision Log rows you write)

- **AI tutors help when built as tutors, and harm when they hand out answers.**
  - Bastani et al., PNAS 2025: unrestricted GPT-4 access during practice cut later exam scores by 17%; a
    hint-based tutor removed most of that harm.
  - Kestin et al., Scientific Reports 2025: a purpose-built AI tutor with deliberate pedagogy beat an
    active-learning class, in less time.
  - World Bank, Nigeria 2025: six weeks of teacher-guided AI tutoring gave +0.31 SD.
  - **So:** hint first; no final answer before an attempt; check before moving on; the child does the last step.
- **Testing and spacing work; rereading doesn't** (Dunlosky et al., 2013). Practice testing and distributed practice
  are the highest-utility techniques; rereading and highlighting are low. **So:** every response ends in a check;
  mastered means correct on two days at least 7 days apart; revisits are scheduled.
- **Personalised formats help retention.** Turning the same textbook content into personalised, multi-format
  material raised a 3–5-day retention test from 67% to 78% (Google, Learn Your Way, 2025; a small study). **So:** one
  response assembled from blocks (explanation, visual, check, practice, English moment) for this child.
- **India** (`docs/family-app/01`):
  - weak foundations are hidden behind class numbers (ASER 2024);
  - 81% of class 6–12 students name exams as a cause of anxiety (NCERT);
  - families miss scholarships because they hear too late;
  - trust in paid edtech is damaged by aggressive selling.
- **Law.**
  - The DPDP Rules were notified on 13 Nov 2025. Verifiable parental consent (Rule 10) applies from 13 May 2027.
  - Section 9 bars tracking, behavioural monitoring and targeted advertising directed at children.
  - **So:** build consent and data minimisation now, not later.

## 3. Milestone 1: the signature slice (build this first, end to end)

**The story a family lives, on a phone, in English or Hindi:**
1. **Sign up.** The parent signs up with an email code, consents (purpose `study_core`) and adds a child: first name,
   class (6–10), board (CBSE), language (English or Hindi) and state. Under 60 seconds.
2. **Home.** Home shows "continue", any revisits due, an ask box, and the child's subjects (Maths, Science). The
   subjects come from the 2026-27 CBSE catalog: titles and structure only, imported from the official curriculum and
   the current NCERT books, and confirmed by a reviewer before families see them.
3. **Understand.** The child picks chapter → topic, or types a question about it. "Understand" streams a response
   built from typed blocks (`02` §4, `03` §6):
   - **Explanation:** simple words, an everyday Indian example, then steps; the English term beside the Hindi.
   - **Worked example:** every number recomputed by a calculator; a mismatch drops the block.
   - **Diagram:** drawn by our own renderer from a structured description.
   - **Understanding check:** 2–3 questions; a hint comes before any answer is revealed.
   - **Practice:** 3–5 items whose wrong options are tagged with the misconception they reveal.
   - **English moment:** 3–5 lines.
   - **Sources:** allowlisted official links only.
   - **Follow-ups:** "simpler", "another example", "explain differently", "practise more". This is not an open chat.
4. **Progress.** Answers are saved, and topic progress moves only on checked answers.
   - A wrong answer brings a different explanation of that exact gap, then revisits after 3 and 10 days.
   - A topic is mastered when answered correctly on two days at least 7 days apart.
5. **Parent card.** The parent sees a calm card: what was practised, what is shaky, what comes next. No ranks, and no
   comparison with other children.
6. **Return.** The next visit opens on "continue", with due revisits first.

**Scope:**
- CBSE, classes 6–10, Maths and Science, in English and Hindi.
- One free subject per child; the other subject asks for Plus, which is not on sale yet.
- Behind a Control flag, switched on only for test accounts until the gates in §5 pass.

**Not in Milestone 1:**
- Photos, voice input, video, opportunities, careers, the English programme, School Link and payments.
- Voice input is wanted early (founder's spec). It waits only for its consent purpose and a provider that permits
  minors.

**Waves it touches:**
- Thin FA-1: accounts, consent, child profiles, the family session and guard, the registry, the shell.
- Thin P-AI: a text adapter, the `family.resolve.*` profiles, the minors check, caps, and Control → AI for the
  provider and its sealed key.
- Thin FA-3: catalog, resolver, blocks, verification, progress.

Use `03` and `06` for every path, schema and rule. This puts the learning loop ahead of FA-2 (school information),
because it is the founder's core intent. Record that in a Decision Log row with the reason.

## 4. Non-negotiables

**Truth**
- No invented number, name, date, claim or source anywhere in product UI (`check_claims.py`).
- A fact without a source and a "checked on" date is not shown.
- Never copy NCERT text: titles and structure only, and link to the official chapter.

**AI**
- The model fills JSON for known block types; our components render them. The model never produces HTML or code.
- Numbers are recomputed, answer keys are re-solved independently, and links come only from the allowlist.
- Every response is marked "AI-made" until a reviewer approves it.
- Prompt text lives in the repository (`08` §7).
- Hint-first behaviour is written into the prompt and also enforced by the UI.

**Privacy and safety**
- A child is a first name, class, board, medium and state. Nothing more.
- No child name, contact or identifier ever reaches a provider: a pre-processor removes them, and a test inspects the
  real outgoing request.
- No analytics or third-party trackers on family screens. No third-party images or fonts loaded at runtime.
- The minors check refuses any provider not marked as permitted for children.
- The parent can see and delete every answer.

**Experience** (`09`, made concrete)
- **Home:** fits one phone screen: greeting, "continue", the ask box, today's revisits. At most 5 bottom-bar
  destinations, read from the registry.
- **Type:** a Latin sans plus Noto Sans Devanagari, self-hosted and subset. Body 16–18 px; Devanagari line height
  ≥ 1.6. Large display numbers for progress.
- **Colour and depth:**
  - v5 tokens only, with one hue per subject everywhere that subject appears;
  - gradients only on headers, progress and celebrations, with AA text on them;
  - cards with 16–24 px radius and layered soft shadows;
  - press and lift through `transform` only.
- **Motion:**
  - screen entrances under 400 ms;
  - blocks reveal as they stream;
  - the diagram draws itself;
  - a short celebration only for mastery checked twice;
  - everything becomes a simple fade under reduced motion, and confetti is off.
- **States:**
  - every async area has a skeleton;
  - the first block streams within about 3 s on 4G (a target to measure, not a claim);
  - every empty, error, cap-reached and "not connected" state is designed;
  - none of the `09` §6 banned items appears.
- **Class-adaptive:** classes 6–7 get larger targets and shorter sets; classes 9–10 get a calmer, exam-focused
  register.

**Hindi:** every string goes through `fam.` keys in `en.ts` and `hi.ts`, and content data carries Hindi fields.
`<html lang>` follows the chosen language.

**Accessibility and layout:**
- AA contrast and 44 px targets.
- Every control has a label.
- No sideways scrolling at 360, 390 or 1440 px.

**Security:**
- Family session and guard as in `03` §3.
- Forced RLS on `family.*` and `content.*`, with no foreign key into `public.*`.
- One guarded route per action; no raw error text reaches the screen.

## 5. Proof gates (automate them; a PR that misses one fails)

1. **Typecheck and tests.** `tsc` and the slice's tests, including:
   - RLS with two accounts;
   - a family session refused by staff APIs, and the reverse;
   - block safety (script in every field renders as text);
   - the pre-processor test on the real outgoing request;
   - the minors check;
   - numeric recomputation;
   - the cap-reached message.
2. **Harness pictures** of every family screen at 360, 390 and 1440 px, in English and Hindi, with reduced motion on
   and off.
3. **New automated checks** (the audit's methods, turned into scripts that fail the run):
   - axe: zero serious or critical issues;
   - no horizontal overflow at 360, 390 or 1440;
   - Hindi completeness: no English-only visible line on a Hindi screen, except allowlisted English-learning content;
   - reduced motion: nothing moves under `reduce`;
   - Lighthouse mobile per family screen: LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms, and ≤ 200 KB of JavaScript
     transferred, counting prefetch.
4. **A golden-set evaluation of AI output** before Milestone 1 is called done:
   - 40 topics, in both languages, scored by a reviewer on a rubric: correct, pitched at the right class, hint-first,
     an apt example, natural Hindi, and numbers that check;
   - record the pass rate, and claim nothing beyond it.

## 6. When something is missing

- **No AI provider key yet:** use a recorded-response adapter in tests only. In the app, show an honest "Explanations
  are not switched on yet" state. Never present canned text as AI. Ask the founder for the provider and key once, in
  founder actions, and say exactly what is blocked without it.
- **Catalog doubt:** a chapter title not confirmed against the official document is not shown.
- **Conflict between this prompt and the docs:** say so with evidence, propose a resolution, and log it in the
  Decision Log.

## 7. After Milestone 1 (each its own wave, with the same gates)

- **M2, learning depth (FA-4):**
  - photo or screenshot input (vision, OCR fallback, Aadhaar screen, 24-hour storage);
  - voice input through the platform's `speech_to_text` adapter, with its consent purpose;
  - the full misconception-to-mastery loop;
  - the revision plan that reflows from today;
  - the weekly summary;
  - data-saver mode with offline practice;
  - in-house simulation blocks with verified physics;
  - the video finder with the honest player.
- **M3, trusted information (FA-5):**
  - opportunities from `content.*`: verified, dated, "likely eligible" with conditions, stale items hidden;
  - the career pathway graph with a source on every step;
  - the Learning Vault;
  - the exam-day kit and past papers.
- **M4, English (FA-6):** the 90-day programme with day 0, 45 and 90 assessments. No fluency promise.
- **M5, the school (FA-2 and School Link):** connected children get their school's information. Unlinking ends access
  in the same request.

## 8. Working rules

- **CLAUDE.md in full:**
  - one coherent slice per PR, on base `main`;
  - reviews scaled to risk (auth, RLS and personal data get `/code-review` medium plus `/security-review`);
  - no Co-Authored-By and no model name anywhere;
  - never merge or push to `main`;
  - no secrets in code, logs, chat or PR text.
- **Models:** per `08` §1 W, the strongest model for auth, RLS, migrations, personal data and security.

## 9. Report and definition of done

Report in the Transparent Output Template, founder actions first, short. Include:
- a phone demo script the founder can follow in Hindi;
- harness pictures;
- every gate's actual output.

**Milestone 1 is done when:**
- the founder, on their own phone and in Hindi:
  - signs up and adds a class 8 child;
  - asks about a Science topic and gets a response for that exact chapter;
  - answers a check wrongly and gets a different explanation, then practises;
  - sees progress on the parent card the next day;
- every gate in §5 is green;
- nothing in the app is invented, simulated or copied from the weekend prototype.
