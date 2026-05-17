# OpenCode Tooling Bootstrap

Task:

Commit:

Context package:

Tool Mode:

Environment mode:

Install scope:

Allowed files:

Forbidden files:

Raw evidence policy:

- Capture raw tool/version/help output for setup failures and audit-relevant limitations.
- Do not commit active local config or generated tool state.

Requirements:

- Check OpenCode native, Browser MCP, Playwright MCP, Chrome DevTools MCP, Serena, RTK, Context Mode and Caveman status.
- Prefer global/user-level setup.
- Do not guess install commands when the playbook does not confirm them.
- Report tooling state before implementation starts.

Validation:

- Run requested version/help commands.
- Run repository hygiene checks after any local config changes.

Repository hygiene:

- Keep local configs ignored or untracked.
- Version only sanitized example files when explicitly requested.

Output format:

- Tools checked.
- Tools installed/configured.
- Tools unavailable/pending.
- Configs touched.
- Validation results.
- Residual risks.

Stop condition:

- Stop after bootstrap. Do not implement product work.
