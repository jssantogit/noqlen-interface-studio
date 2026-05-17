# OpenCode Block Template

Task:

Commit:

Context package:

Tool Mode:

Environment mode:

Install scope:

Allowed files:

Forbidden files:

Raw evidence policy:

- Preserve raw evidence for serious debugging, validation failures, audits, boundary/security-sensitive changes and release readiness.
- Compressed or summarized output may support exploration but cannot replace audit evidence.

Requirements:

- Work only on the requested block.
- Keep Noqlen Interface Studio visual/mock-only.
- Do not start the next block.

Validation:

- List required commands and browser checks.
- Report failures with residual risk.

Repository hygiene:

- Use explicit staging only.
- Do not commit local agent/tool configs, credentials, generated state or build output.

Output format:

- Files changed.
- Tool Mode used.
- Validation results.
- Repo hygiene result.
- Residual risks.

Stop condition:

- Stop if forbidden files or product scope changes are required.
