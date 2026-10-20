# NetCyberAI — Bounded External Build Blueprint v3

**Role of this document:** practical scope and integration guide for the Antigravity pre-renewal build cycle. It does not override code evidence, product security requirements, or Claude Code's ownership of shared backend architecture.

## 1. Ruling from the evidence review

Retain the strongest parts of the previous Antigravity package:
- Repository truth audit with file/line/test evidence.
- Separate local clone and non-main branch; no remote push.
- A 10-item handoff contract.
- Actual typecheck/test/build/SEO audit outputs.
- RLS and negative authorization tests.
- Screenshots at 390 px and 1440 px, reduced-motion and EN/HI checks.
- Provider entitlement separated from product runtime credentials.

Adopt these corrections:
- Read the current dated block of `docs/00_START_HERE.md`; treat labelled historical paragraphs as history.
- Correct Family App plan path: `docs/31_P7B_FAMILY_APP_PLAN.md`.
- Resolve `docs/12_CAPABILITY_MATRIX.md` versus `docs/17_MODULE_CATALOG.md` with code, migrations, runtime and tests. Neither document wins by default.
- Inspect `src/lib/whatsapp/` file-by-file; don't call it merely a mock provider or a fully live integration without evidence.
- Attach the exact automation workflow blueprint. Do not reinvent it.
- Add an explicit feasibility gate before every workstream.
- Require a WhatsApp-only/zero-app-open acceptance test for essential family-facing tasks whenever the provider supports it.
- Apply the concrete rules in `docs/19_EASE_AND_COLOUR_STANDARD.md` as testable UI criteria.
- Automation OS and AI router implementation are reserved for Claude Code in this cycle. Antigravity writes integration notes only.
- Avoid full-roadmap scope. Build one safe vertical slice and reserve at least 25% of available model/tool budget for validation and handoff.

## 2. Truth taxonomy

Every claimed module status must use one of:
1. **Verified live** — end-to-end capability observed in local run or an applicable integration test, with authorization and data flow verified.
2. **Partial** — a meaningful workflow exists, but specified paths/roles/errors/dependencies are incomplete.
3. **Schema only** — tables/types/policies exist, but usable workflow is absent or not shown to work.
4. **UI stub/demo** — UI appears, but action is simulated or uses demo data and does not persist through the real path.
5. **Planned/spec only** — present in documentation, not verified in implementation.
6. **Blocked** — implementation cannot proceed safely due to a documented dependency or missing credential/relationship/decision.

Each row needs code path(s), schema/migration paths, test name or local reproduction, observed result and open gap. Source-file existence by itself is not proof of live functionality.

## 3. Priority and cut order for the current cycle

### P0 — Always complete
- Clean separate clone/local branch and record base SHA/status.
- Audit actual route tree, service layer, auth/session model, migrations/RLS and tests.
- Reconcile conflicting status documents.
- Run available baseline scripts and report exact output.
- Produce a dependency map and feasibility gate.

### P1 — One vertical slice only
Preferred: Family App route/session boundary plus authorized linked-child home and safe empty/loading/error/logout states, **only if** current guardian identity, relationship data, server-side authorization and tests support it.

Fallback: choose the smallest real, testable feature that avoids editing Claude-owned contract-heavy files. If no such slice exists, stop after the audit and produce integration notes. Do not build a fake login, mock persisted child data or an unusable dashboard to satisfy a deliverable count.

### P2 — Integration notes only
- Future Learning Vault: reuse existing artifacts; do not create a second file store.
- WhatsApp: actual status of Meta adapter, gate, templates, delivery tracking, replies, costs, permissions and credential gaps.
- Automation OS: map to the provided automation blueprint's trigger/action packs but do not implement event bus/rule engine.
- AI router: note intended task profiles and current AIProvider interface only; do not change shared router contracts.
- Acadine-inspired assessment: future rubric-backed drafts, teacher approval and benchmark requirements.
- LoiLo/Seesaw-inspired portfolio, ClassDojo story feed, Satchel homework loop, Eneza zero-app-open rule, trust/group dashboard.

### Out of scope now
- Automation OS internals, event bus/domain_events migration, rules engine, worker scheduler, and automation packs.
- Shared AI router/provider orchestration.
- Broad auth/RLS/tenant-model refactor.
- Live Meta messaging, production database/migration, deployment, or push to GitHub.
- Full rollout of the Family App, Learning Vault, Assessment AI or all roadmap modules.

## 4. Feasibility gate template

For each proposed workstream, answer:
- Intended user and problem.
- Value if delivered now.
- Current code/data/service it will reuse.
- Dependencies present and tested.
- Exact files/contracts touched.
- Overlap risk with Claude Code.
- Authorization, data sensitivity and failure modes.
- Tests that prove success and failure.
- Effort versus remaining quota, with 25% reserved for validation/handoff.
- Decision: **GO**, **GO WITH LIMITS**, or **STOP** and why.

Do not proceed on a GO decision based only on documentation.

## 5. Automation and AI integration boundary

The founder's automation master plan and automation workflow blueprint are architecture inputs, not permission to replace them. Reference exact nodes, event edges, ten automation packs and simulation cases from the original blueprint when available. If missing, record a gap and write no replacement design beyond a bounded integration note.

Antigravity must not modify the central event backbone, Automation OS, the AI router/provider shared contracts or the outbound WhatsApp gate during this cycle. Claude Code retains ownership. Antigravity may document required events, inputs, outputs, approval states, expected audit records and integration tests.

## 6. Zero-app-open family acceptance

For each family-facing feature, describe and test whether an essential task can be completed via WhatsApp alone without opening the PWA. The test is only counted as passing if the real, available provider path and consent/template requirements allow it. If the provider is not configured, report `BLOCKED / NOT LIVE`, test the safe disabled/hold path, and don't claim WhatsApp parity.

## 7. Ease, colour and motion criteria

Use `docs/19_EASE_AND_COLOUR_STANDARD.md` and current shared components/tokens. At minimum, verify:
- Clear page purpose and strong visual hierarchy.
- Modern colourful style with purposeful colour; no generic dashboard filler.
- A useful, domain-specific visual instead of decorative chart blocks.
- Mobile at 360/390 px and desktop at 1440 px.
- Keyboard navigation, visible focus, readable contrast and explicit labels.
- Reduced-motion alternative.
- Chart/table or textual alternative; status never communicated by colour alone.
- EN/HI through repository i18n.
- Real data where available, clearly marked `/demo` fixtures otherwise.

## 8. Product-inspired adoption matrix

| Inspiration | Adoptable pattern | Boundary |
|---|---|---|
| Acadine | Rubric-supported review draft; weighted question-paper drafting; topic-level evidence | No automatic final marks; no performance claims without benchmarks |
| LoiLoNote | Visual cards and a connected learning portfolio | Do not clone branded UI or build a duplicate store |
| Seesaw | Student work and feedback portfolio | Consolidate into Learning Vault |
| Khanmigo | Hint-first Socratic study support | Defer until privacy, age, cost and accuracy gates pass |
| ClassDojo | Teacher-approved positive class story | Consent and media retention required |
| Satchel One | Assign → submit → review → parent-visible homework loop | Reuse existing homework records |
| Eneza | Low-bandwidth and WhatsApp-first task completion | Zero-app-open proof required where provider is live |
| Toddle | Low-friction teacher planning UX | Adopt interaction principles only |
| Chalk | Measure routine task duration and errors | Do not claim time saved before real measurement |

## 9. Completion contract

Deliver a single reviewable patch/branch plus:
- `REPOSITORY_TRUTH_AUDIT.md`
- `DEPENDENCY_MAP.md`
- `FEASIBILITY_GATE.md`
- `CLAUDE_CODE_INTEGRATION_NOTES.md`
- `ANTIGRAVITY_HANDOFF.md`
- test commands and actual outputs
- mobile/desktop screenshots if browser tests were performed
- changed-file list, migrations and rollback steps (or explicit none)
- known gaps and exact merge instructions

Success = truthful audit + at most one secure, polished, tested vertical slice + mergeable handoff. Do not count lines, mock pages or planned features as progress.
