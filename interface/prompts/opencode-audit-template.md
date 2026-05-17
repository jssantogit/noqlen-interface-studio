# OpenCode Audit Template

Task:

Commit:

Context package:

Tool Mode:

Environment mode:

Install scope:

Allowed files:

Forbidden files:

Raw evidence policy:

- Use raw validation output for failures, security-sensitive findings, boundary changes and release readiness.
- Do not treat compressed output as audit proof.

Requirements:

- Review scope, product boundary, validation evidence, repo hygiene and stop condition.
- Identify bugs, regressions, missing tests and workflow gaps first.

Validation:

- Re-run or inspect required validation commands when appropriate.
- Record commands and outcomes.

Repository hygiene:

- Confirm no local configs, generated tool state, secrets, build output or personal paths are tracked.

Output format:

- Findings ordered by severity with file/line references.
- Open questions.
- Validation evidence.
- Repo hygiene evidence.
- Recommendation.

Stop condition:

- Stop if audit requires product implementation beyond the requested block.
