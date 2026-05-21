# Visual Alignment Workflow

This repository uses visual references as contracts, not loose inspiration.

The goal is to prevent vague implementation loops such as:

```txt
reference image -> general vibe -> approximate UI -> repeated subjective fixes
```

Use this workflow instead:

```txt
reference image -> visual audit -> scoped patch -> screenshot validation -> focused correction
```

## When to use this workflow

Use this process for any task that asks to align a screen with a reference image, mockup, generated concept, visual target or screenshot.

This workflow is required for Aria visual work and recommended for all future app visual alignment blocks.

## Required block checklist

Every visual block starts with a checklist:

```txt
[ ] Define target screen
[ ] Identify approved reference
[ ] Declare files allowed
[ ] Declare files forbidden
[ ] Inspect current implementation
[ ] List concrete visual gaps before editing
[ ] Patch only active block scope
[ ] Validate with screenshot when available
[ ] Report remaining differences
```

## Visual audit rules

Before editing, describe differences in concrete terms.

Good gap examples:

```txt
[ ] Mini player sits too close to bottom nav
[ ] Main hero card is too short and does not dominate the screen
[ ] Card borders are too visible compared with the reference
[ ] Header typography is too small
[ ] Vertical spacing before Recent Additions is too tight
[ ] Explore cards look generic and do not feel like library categories
```

Bad gap examples:

```txt
[ ] Make it more beautiful
[ ] Improve the vibe
[ ] Looks off
[ ] More premium
[ ] Make it like the image
```

## Reference interpretation

A reference image should be translated into implementation constraints:

- screen purpose;
- dominant element;
- vertical structure;
- spacing rhythm;
- fixed layers such as bottom nav and mini player;
- typography hierarchy;
- border and blur strength;
- artwork scale;
- scroll behavior;
- empty space usage;
- what the screen must not become.

## Patch rules

A visual alignment patch must:

- stay inside the declared app/block scope;
- preserve mock-only behavior;
- preserve visible interactions unless the block explicitly changes them;
- avoid unrelated cleanup;
- avoid changing the Studio shell during app-specific work;
- avoid changing `PhoneFrame`, `PhoneStage` or `AppViewport` during app-specific work;
- avoid adding real backend, playback, filesystem, server or network behavior.

## Screenshot validation

When browser tooling is available, validate with screenshots.

Minimum screenshot audit:

```txt
[ ] Current screen before patch
[ ] Screen after patch
[ ] Remaining differences listed
```

A screenshot does not need to be pixel-perfect, but the report must say what still differs.

## Commit behavior

Use small commits that match the active block.

Do not use `git add .`.

Do not commit:

- generated build output;
- local agent/tool config;
- secrets;
- credentials;
- scratch files;
- Playwright or MCP local state;
- unrelated app changes.

## Escalation to OpenCode

Use OpenCode instead of direct chat/GitHub edits when the block includes:

- broad component refactors;
- many app files;
- visual work that needs repeated browser screenshots;
- risky state changes;
- tests across multiple apps;
- build/lint/debug loops;
- any change where local validation is required before commit.

Direct chat/GitHub edits are acceptable for simple docs, contracts, handoff updates and small isolated text changes.
