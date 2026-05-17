# Validation Checklist

- `npm run lint`
- `npm run build`
- `GITHUB_PAGES=true npm run build`
- `npm run test -- --run`
- `python3 scripts/check_repo_hygiene.py`
- `git diff --check`
- Confirm Tool Mode is declared in the block prompt/report.
- Confirm raw evidence is captured for validation failures, audits, boundary changes and security-sensitive changes.
- Confirm all four tabs exist.
- Confirm Anchor is selected by default.
- Confirm UI is mock-only.
- Confirm docs exist.
