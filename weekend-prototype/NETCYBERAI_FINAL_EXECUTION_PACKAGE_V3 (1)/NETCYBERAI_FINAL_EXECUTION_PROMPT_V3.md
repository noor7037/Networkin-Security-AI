# NetCyberAI — Final Antigravity Execution Prompt v3

**Purpose:** Make bounded, verifiable progress on NetCyberAI in a separate local clone while Claude Code is unavailable, producing a mergeable patch and an evidence-based handoff—not a parallel prototype or a speculative rebuild.

**Repository:** https://github.com/noor7037/netcyberai-core  
**Working approach:** fresh clone → local non-main branch → truth audit → feasibility gate → one vertical slice → tests → handoff.  
**Critical scope boundary:** Do **not** implement or refactor Automation OS internals, the AI router/provider orchestration, or overlapping shared contracts in this cycle. These are reserved for Claude Code. Produce integration notes only for those areas.

---

## 1. Your role and outcome

Act as a senior product engineer, systems architect, product designer, QA engineer and security reviewer. Work from the code that actually exists. The objective is to ship **one small, real, testable product slice** that makes NetCyberAI more useful to Indian schools and can be reviewed and integrated by Claude Code with minimal translation.

Do not try to finish the full roadmap during this execution window. A limited, properly tested slice is better than many impressive but disconnected screens. Keep at least 25% of the available execution budget for testing, security review, documentation and handoff. Stop feature work when that review reserve is reached.

The founder's desired product direction is:
- Useful school operations automation with observable status and recoverable failures.
- A secure school-connected Family App / parent-and-student PWA.
- A Learning Vault inspired by the *ideas* of LoiLoNote and Seesaw.
- Selected Acadine-inspired assessment and question-paper workflows.
- Carefully selected patterns from Khanmigo, ClassDojo, Satchel One, Eneza, Toddle and Chalk.
- Modern, colourful, premium interface design that is easy to understand, fast and accessible.
- WhatsApp as an important low-friction family channel; essential family actions should be usable without opening the app when the relevant WhatsApp integration is genuinely available.

These are product intentions, not evidence that features are already built or that the execution window can deliver them all.

## 2. Inputs to read and how to resolve conflicts

First, inspect the actual repository at the current commit. Record its SHA. Then locate and read these inputs if supplied or present:

1. `NetCyberAI_Automation_AI_Adoption_Master_Plan.md` — founder's strategic intent.
2. `NetCyberAI_Automation_Workflow_Blueprint.md` — intended automation node map, automation packs, edge table and simulations. This is a design input, **not permission to build automation internals in this cycle**.
3. `NetCyberAI_External_Build_Package_v2.md` — historical external-build proposal. Compare it against the chosen worktree/patch approach; do not reproduce a disconnected standalone codebase if a mergeable patch is feasible.
4. `NETCYBERAI_BUILD_BLUEPRINT_AND_REPO_AUDIT.md` and prior Antigravity prompt — useful prior analysis, to be corrected where new evidence disagrees.
5. `Pasted markdown(20261017-061400).md` or equivalent review notes — review findings and fixes to apply.

If an input is not attached, inspect the repository and the provided workspace for the exact filename before declaring it missing. If still absent, write `[GAP: Missing Information: <exact filename>]`. Do not pretend to have read it; do not invent its detailed architecture. In particular, if `NetCyberAI_Automation_Workflow_Blueprint.md` is absent, **do not design a replacement automation engine**. Only document where existing modules may integrate with it later.

Read, at minimum, the following repository paths if present:
- `README.md`
- `docs/00_START_HERE.md`
- `docs/01_CONSTITUTION.md`
- `docs/12_CAPABILITY_MATRIX.md`
- `docs/14_BACKEND_BUILD_PLAN.md`
- `docs/16_MASTER_ROADMAP.md`
- `docs/17_MODULE_CATALOG.md`
- `docs/19_EASE_AND_COLOUR_STANDARD.md`
- `docs/20_*` relevant teacher plan(s)
- **The correct Family App plan filename:** `docs/31_P7B_FAMILY_APP_PLAN.md`
- `docs/25_P4_WHATSAPP_PLAN.md`
- `docs/10_DECISION_LOG.md`
- current migrations, RLS policies, service interfaces, tests and CI scripts.

Do not repeat the previous mistake of treating a historical paragraph in `docs/00_START_HERE.md` as current status. Identify the current dated status block and treat explicitly labelled historical paragraphs as history. The critique reports a conflict between `docs/12_CAPABILITY_MATRIX.md` and `docs/17_MODULE_CATALOG.md`; that conflict is real enough to require code-level resolution, not an assumption in favour of either document.

### Source-of-truth order

When claims conflict, resolve them in this order:
1. Reproducible local runtime behaviour and tests.
2. Current application code, route handlers, authorization checks, migrations, RLS policies and provider implementations.
3. Current dated status sections in project docs and the decision log.
4. Older planning documents and historical status paragraphs.
5. This prompt and founder strategy documents as intent—not as implementation proof.

Documents are valuable context. They are not stronger evidence than code and tests. Equally, one source file or a passing typecheck does not prove an end-to-end feature works.

## 3. Non-negotiable operating rules

1. **Do not modify the public GitHub repository.** Never push, merge, release or deploy. Work only in a separately cloned local copy on a local non-main feature branch.
2. Do not open or edit Claude Code's active checkout. Do not touch its uncommitted work, reset, clean, stash or overwrite any other agent's files.
3. Record `git remote -v`, `git rev-parse HEAD`, `git status --short`, current branch and whether the clone is clean. Record this base in every handoff.
4. Never use production credentials, production databases or real parent communications. Verify `.env*` ignores. Do not place secrets in the prompt, logs, screenshots, commits or handoff.
5. Do not fabricate feature status, customer records, performance data, model accuracy, cost savings, time saved, integrations, delivery receipts or successful test results. Only label synthetic records as demo and use the repo's approved demo boundary.
6. Tenant and role isolation must be enforced server-side/database-side, not by hidden UI elements. Test denied access as well as permitted access, including a guardian attempting to access an unrelated child and a user from another school attempting to access records.
7. No Aadhaar collection, storage, display or use. Do not send real child or guardian PII to an AI service; prove that any provider-bound payload is minimised/masked.
8. Fee data must not be displayed alongside a child's academic standing. Do not rank a child against named classmates in parent-facing surfaces.
9. AI outputs that affect a mark, a child recommendation, a parent communication or a record remain drafts until the responsible human reviews and approves them. Approved, deterministic templates may only run through configured consent, budget, template, quiet-hour, deduplication and audit gates.
10. The existing authorised messaging gate is the only outbound path. Do not create a second sender or bypass existing `src/lib/whatsapp` controls. Never claim WhatsApp is live solely because an adapter file exists.
11. Do not copy proprietary code, branded visual layouts, media or wording from Acadine, LoiLoNote or other competitors. Adopt high-level product patterns and create original NetCyberAI UX.
12. If a prerequisite, provider credential, data relationship, legal decision or test environment is missing, mark the exact gap and stop that part of work rather than faking success.

## 4. Stage 0 — repository truth audit (mandatory gate)

Before feature edits, create `docs/agent-handoff/REPOSITORY_TRUTH_AUDIT.md`.

Classify each relevant module using these labels:
- `verified live`
- `partial`
- `schema only`
- `UI stub/demo`
- `planned/spec only`
- `blocked`

Every status must cite evidence paths and, where practical, a reproducible test or runtime result. Explicitly inspect:
- Route groups `(admin)`, `(dev)`, `(family)` and `(school)`.
- Family route(s) and whether they have real session checks, linked-child authorization and usable data.
- Teacher surfaces in `(school)/app` versus any standalone PWA route. Do not conflate a teacher surface with a complete Teacher PWA.
- Homework, timetable, marks/exams/report cards, Learning Genome, payment/fee ledger, file uploads and background jobs.
- `src/lib/whatsapp/` including `meta.ts`, `gate.ts`, `delivery.ts`, `templates.ts`, `replies.ts`, `cost.ts` and their actual tests. Distinguish provider code, stub, configured integration and real end-to-end delivery.
- The existing AI provider/SPI, per-school usage metering and what is only a stand-in.
- All applicable migrations, RLS policies, route handlers/server actions, test fixtures and tests.

For the known document conflict, report both the statement and code evidence. Do not repeat the false claim that a missing standalone teacher PWA means no teacher surfaces exist. Do not repeat the opposite false claim that teacher surfaces prove a complete teacher app is implemented.

Run the existing baseline scripts that can be run safely. Inspect `package.json` first and use only scripts that actually exist. The repository has been reported to include `typecheck`, `test`, `build` and `audit:seo`; verify this in the current checkout. Record exact outputs and any environmental blockers. No failures described as passes.

### Audit gate

After the first audit, stop and present a concise decision report:
- what is evidenced live;
- what is partial/stub/schema-only/planned;
- the actual blocker(s);
- which workstream is safe to implement in this cycle;
- touched file/contract areas that could overlap with Claude Code.

Do not proceed into any contract-heavy shared module unless the audit establishes the data/API/authorization contract and the workstream passes the feasibility gate in §5.

## 5. Feasibility gate and bounded build scope

For each proposed workstream, prepare a short gate note containing: user/problem, value, existing implementation reused, dependency files, backend/API readiness, security sensitivity, likely file overlap with Claude Code, test method, and a clear go/no-go recommendation.

### Scope boundaries for this cycle

**Must do:** repository truth audit, baseline validation, dependency map, and clear handoff documentation.

**Do one vertical slice only:** prefer the Family App foundation if the existing guardian identity, guardian-child relationship, family session and tenant/RLS boundaries can be verified. Target a small real flow such as route/session guard → authorized linked-child home → loading/empty/error states → safe logout, with route and negative authorization tests.

If those prerequisites do not pass, do not manufacture a mock sign-in or a fake child dashboard. Select the smallest other useful slice that can be built safely without touching Claude-owned core contracts, or stop after the audit and produce a precise blocker report plus design-only integration note. A complete, honest blocker report is an acceptable outcome when code changes would be unsafe.

**Out of scope for implementation in this cycle — Claude Code owns these:**
- Automation OS internals, rule engine, event bus/domain-events migration and automation scheduler.
- AI router/provider orchestration shared contracts.
- Major WhatsApp gate/provider rewrites or enabling live Meta traffic.
- Broad database/tenant model redesign.
- Full Learning Vault, full Family App backlog, full Assessment AI, full trust dashboard or all roadmap modules.

For these areas, write integration notes only: expected events/data, exact current interfaces to reuse, dependencies, tests required later, and open decisions. Do not create a parallel implementation.

### Cut order if time/model quota tightens

1. Preserve truth audit and current Git state.
2. Preserve one well-scoped vertical slice if it passes all gates.
3. Preserve security, test results, visual evidence and handoff.
4. Defer polish and secondary features.
5. Never sacrifice security review or test reporting to claim more modules delivered.

Reserve at least 25% of available tool/model budget for final testing, defect fixes, review and handoff. Do not continue expanding scope as the quota runs low.

## 6. Family App slice and WhatsApp-only acceptance rule

Use `docs/31_P7B_FAMILY_APP_PLAN.md` if present. Do not create a replacement plan if the exact file exists. If it is genuinely unavailable after checking the tree, report the exact missing-file gap instead of pretending it was read.

For a Family App first slice:
- Use the existing route conventions and session infrastructure after inspection; do not make a new route scheme by assumption.
- Enforce guardian-child linkage on the server and/or database. A client-provided `student_id` is never authorization.
- A parent sees only their own linked child/children. Test a forbidden unrelated-child query.
- Keep family session permissions separate from staff permissions.
- Show only real, authorized data. For empty test data, show an honest empty state rather than synthetic records.
- Do not cache sensitive child data on a shared device without a deliberate, tested design.
- Add loading, error, no-access, expired-session and logout states.

**Eneza-inspired WhatsApp-only rule:** for every family-facing workflow, record whether its essential task can be completed with zero app opens, using WhatsApp alone, without requiring a parent to launch the PWA. This is an acceptance test for design and integration readiness. It does not authorise building a new messaging engine or claiming WhatsApp parity before Meta integration, templates, credentials and consent are real. If the provider is not live, label the flow `not yet available` and test its safe interface/hold state only.

## 7. Product adoption — use competitors as patterns, not clones

Only propose changes that solve a specific user problem and fit the present architecture:
- **LoiLoNote / Seesaw:** portfolio and connected learning artifacts → future Learning Vault, not a duplicate file store.
- **Acadine:** rubric-supported answer-sheet review, paper generation and topic evidence → later Exams/Copilot extension; no automated final grading in this cycle.
- **Khanmigo:** later hint-first Socratic support, only after family privacy, age appropriateness, provider cost and evaluation gates.
- **ClassDojo:** optional teacher-approved positive class story; media permission and retention controls required.
- **Satchel One:** closed homework loop: assign → submit → review → parent visibility, reusing existing records.
- **Eneza:** low-bandwidth, WhatsApp-first/zero-app-open task access where supported.
- **Toddle:** low-friction teacher interactions, not a branded clone.
- **Chalk:** instrument actual task completion time and errors; do not publish estimated savings as achievements.

Record adopt/defer/reject reasoning and any upstream dependency. No competitor feature becomes priority merely because it looks impressive.

## 8. Visual and interaction quality bar

Read `docs/19_EASE_AND_COLOUR_STANDARD.md` and apply its actual rules; do not just cite its name. If the standard conflicts with an accessibility requirement, preserve accessibility and record the conflict.

Every implemented visible surface must:
- Feel like a modern, polished, colourful, purposeful education product—not a generic admin template or a wall of text.
- Use the repository's existing design tokens, icon system, spacing, typography and components where they work. Do not create an unrelated second design system.
- Have strong hierarchy: one clear page purpose, actionable primary control, contextual secondary actions, meaningful visual grouping and helpful empty states.
- Use a use-case-specific visual only when it explains the work; avoid decorative generic charts and fake dashboards.
- Support 360/390 px mobile and desktop around 1440 px; also inspect tablet where relevant.
- Provide accessible contrast, keyboard operation, visible focus, labels and error messaging.
- Respect `prefers-reduced-motion`; motion must clarify state or progress, not distract.
- Ensure charts have a text/table equivalent and never rely on colour alone to communicate status.
- Use real product data where available, or a clearly labelled demo fixture inside the approved demo surface. No invented customer metrics.
- Support English/Hindi through the real i18n mechanism for touched user-facing text; do not hard-code a parallel translation path.

Required evidence: screenshots at 390 px and 1440 px for the completed slice, plus a short note describing actual browser interactions verified. Do not claim visual testing if no browser tool/runtime was used.

## 9. Testing, security and reliability

Use the repository's actual toolchain and tests. Where relevant, cover:
- Unit tests for business logic and input validation.
- Integration tests for server/session/data access.
- RLS and route authorization allow/deny tests, including cross-tenant and unrelated-child negative tests.
- End-to-end browser flow for the vertical slice if the browser environment is available.
- Error, empty, loading, retries, offline/slow network and expiry states as applicable.
- Idempotent replay and duplicate handling if touching queued/outbox operations—otherwise leave those contracts untouched.
- Secret scanning or a repository-approved equivalent; no secrets in committed changes.
- `npm run typecheck`, `npm run test`, `npm run build`, `npm run audit:seo` where those scripts exist. Record the real command, exit status and concise output. If a command cannot run, identify the exact reason; don't skip silently.

Do not redesign or implement the Automation OS / AI router as part of testing. Do not alter shared event contracts, `AIProvider` or the WhatsApp gate merely to make the feature easier to build.

## 10. Integration notes for Claude Code — no implementation of reserved systems

Create `docs/agent-handoff/CLAUDE_CODE_INTEGRATION_NOTES.md` describing:
- which current modules the slice consumes;
- which APIs and permissions it relies on;
- any additive interface required later;
- how the future automation workflow can subscribe without changing core event contracts today;
- how the future AI router could supply a reviewed draft without being implemented now;
- how family features will satisfy the zero-app-open WhatsApp acceptance rule once the existing provider path is live;
- any overlap/conflict risk for Claude Code;
- proposed merge order and rollback strategy.

If the automation workflow blueprint is attached or available in the repository, reference its exact node IDs, packs, edges and simulations. Do not paraphrase or replace that design with a new architecture. If it is missing, explicitly flag the gap and keep the notes high-level.

## 11. Required final handoff: `docs/agent-handoff/ANTIGRAVITY_HANDOFF.md`

The handoff must include all 10 items:
1. Base SHA and feature branch name; confirmation no remote push/deployment occurred.
2. Summary of repository truth findings and unresolved document contradictions.
3. Exact files created/changed and why.
4. User/problem and acceptance criteria for the vertical slice.
5. Tests run, commands, actual results and any blocked tests.
6. Security and privacy review, including negative RLS/authorization test results.
7. Screenshots at 390 px and 1440 px (or explicit statement that they were not captured and why).
8. Database migrations/API changes and how to apply/revert **locally only**; if none, say none.
9. Known gaps, vendor/credential dependencies, feature flags and rollback instructions.
10. Ordered instructions for Claude Code to review, cherry-pick/apply the patch, rerun tests and resolve any overlap.

Also deliver:
- `docs/agent-handoff/REPOSITORY_TRUTH_AUDIT.md`
- `docs/agent-handoff/DEPENDENCY_MAP.md`
- `docs/agent-handoff/FEASIBILITY_GATE.md`
- `docs/agent-handoff/CLAUDE_CODE_INTEGRATION_NOTES.md`

Do not claim files were created if they were not. Keep unimplemented proposals clearly labelled as proposals.

## 12. First response required before edits

Before making any code change, respond with:
1. Current commit SHA, branch and dirty/clean status.
2. The exact documents and code areas inspected.
3. The confirmed discrepancies and their evidence.
4. The proposed single vertical slice and feasibility result.
5. The files/contracts you will not touch because they are reserved for Claude Code.
6. Any specific missing attachment, credential, test environment or data relationship.

Then proceed only if the workstream passes the gate. If not, stop and return the blocker report and an integration-ready plan rather than building a fake success.

## Definition of success

Success is **one truthful, polished, testable and mergeable slice plus a reliable audit/handoff**. It is not a large diff, a big feature list, or a claim that NetCyberAI is fully automated. No GitHub push, no production deployment, no production data changes and no real parent messaging.
