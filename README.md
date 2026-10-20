# NetCyberAI Family App: reference pack

Reference material for the Claude Code session that builds the NetCyberAI platform and its Family App. Put here by the
founder (Noor) on 2026-10-20. **This repository holds references, not the product.** The product is built in
`noor7037/netcyberai-core`, by its `CLAUDE.md` and `docs/family-app/00`–`09`.

## Read in this order

1. `family-app-pack/prompts/FAMILY_APP_MASTER_PROMPT_v2.md`: the build prompt. It maps every planned feature, the
   four mockups, the founder's 10 features and 3 recommendations (§4), sets milestones M1–M7 (§5), and starts with M1.
2. `family-app-pack/mockups/`: the founder's four mockup boards. They are the reference for look, feel and scope, not
   for facts: their sample data is illustrative and some of it is wrong (prompt §7.4).
3. `family-app-pack/founder-input/FOUNDER_10_FEATURES_AND_3_RECOMMENDATIONS.md`: the founder's own list, word for
   word.
4. `family-app-pack/audit/AUDIT.md` and `audit/pictures/`: the measured audit of the weekend prototype (also in
   netcyberai-core PR #197).
5. `family-app-pack/blueprint/family-app-blueprint.html`: the blueprint page, every feature with its verdict (open it
   in a browser).

## Folders

| Folder | What it holds |
|---|---|
| `family-app-pack/` | The planning pack: prompts (v2 current, v1 superseded), mockups, founder input, blueprint, audit |
| `weekend-prototype/` | The weekend prototype's source code as the founder had it, without `node_modules`, `.next` and test output. It also holds the founder's earlier planning notes (`NetCyberAI_Consumer_Learning_App_Spec_v2.md` and `NETCYBERAI_FINAL_EXECUTION_PACKAGE_V3 (1)/`) |

## Rules for using the weekend prototype

- **It is not a specification, a design or a data source** (the founder's ruling of 2026-10-20). Do not copy its code
  or data into the product.
- Use it only as a list of failures to prevent; `AUDIT.md` §2–§4 describes them.
- Its sample data is fictional, and several "facts" in it are wrong (AUDIT.md §3). Among them is the name of a real
  school brand, used only as sample data.
- **One change from the original:** the hard-coded fallback signing key in
  `weekend-prototype/src/lib/auth/index.ts` was replaced with a placeholder before this push, so no secret is
  published. The original key must never be reused.

## Visibility

This repository is public: anyone can read it.
