# Repository Hygiene

Use explicit staging only. Do not use `git add .`.

Do not commit:

- `.opencode/`
- `.skills/`
- `opencode.json`
- `opencode.jsonc`
- `.serena/`
- `.mcp/`
- `.mcp.json`
- `RTK.md`
- `.claude/`
- `.cursor/`
- `.windsurf/`
- `prompts.local/`
- `site/`
- `scratch/`
- `_workflow/`
- `_core/`
- `_legacy/`
- `*.local.md`
- `.env` or `.env.*`
- credentials or auth files
- local secrets
- local MCP configs
- personal agent settings
- generated tool state
- logs
- `node_modules`
- `dist`
- `coverage`

Repository hygiene checks should fail on tracked local/generated tool paths but allow docs to mention forbidden names as warnings. Prefer global or user-level tool configuration; project-local tool configs are exception-only and must remain untracked unless explicitly approved and sanitized.
