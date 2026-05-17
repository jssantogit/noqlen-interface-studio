# Repository Hygiene Checklist

- Use explicit staging only.
- Confirm local tooling config is not tracked.
- Confirm local agent/tool configs and generated tool state are ignored or untracked.
- Confirm secrets are not tracked.
- Confirm `node_modules`, `dist`, `site`, `scratch` and `coverage` are not tracked.
- Confirm no logs are tracked.
- Run `python3 scripts/check_repo_hygiene.py` when available.
- Confirm origin points to `jssantogit/noqlen-interface-studio` before pushing.
