#!/usr/bin/env python3
"""Check tracked files for local tooling and generated artifact contamination."""

from pathlib import Path
import re
import subprocess
import sys


FORBIDDEN_PATH_PATTERNS = [
    re.compile(r"(^|/)opencode\.jsonc?$"),
    re.compile(r"(^|/)\.opencode(/|$)"),
    re.compile(r"(^|/)\.skills(/|$)"),
    re.compile(r"(^|/)\.serena(/|$)"),
    re.compile(r"(^|/)\.mcp(/|$)"),
    re.compile(r"(^|/)\.mcp\.json$"),
    re.compile(r"(^|/)RTK\.md$"),
    re.compile(r"(^|/)\.claude(/|$)"),
    re.compile(r"(^|/)\.cursor(/|$)"),
    re.compile(r"(^|/)\.windsurf(/|$)"),
    re.compile(r"(^|/)site(/|$)"),
    re.compile(r"(^|/)dist(/|$)"),
    re.compile(r"(^|/)node_modules(/|$)"),
    re.compile(r"(^|/)coverage(/|$)"),
    re.compile(r"(^|/)scratch(/|$)"),
    re.compile(r"(^|/)_workflow(/|$)"),
    re.compile(r"(^|/)_core(/|$)"),
    re.compile(r"(^|/)_legacy(/|$)"),
    re.compile(r"(^|/)\.env(\..*)?$"),
    re.compile(r"(^|/)credentials(\..*)?$", re.IGNORECASE),
    re.compile(r"(^|/)credentials\.json$", re.IGNORECASE),
    re.compile(r"(^|/)\.secrets(/|$)?"),
    re.compile(r"(^|/).*(auth|token|secret).*\.(json|yaml|yml|toml|env)$", re.IGNORECASE),
]

SUSPICIOUS_CONTENT_PATTERNS = [
    re.compile(r"-----BEGIN (RSA |OPENSSH |EC |DSA |)?PRIVATE KEY-----"),
    re.compile(r"(?i)(api[_-]?key|access[_-]?token|secret[_-]?key|client[_-]?secret)\s*[:=]\s*['\"][^'\"]{12,}['\"]"),
    re.compile(r"(?i)bearer\s+[A-Za-z0-9._~+/=-]{20,}"),
]

CONTENT_ALLOWLIST = {
    "scripts/check_repo_hygiene.py",
}


def tracked_files() -> list[str]:
    result = subprocess.run(
        ["git", "ls-files"],
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return [line for line in result.stdout.splitlines() if line]


def check_paths(paths: list[str]) -> list[str]:
    failures = []
    for path in paths:
        for pattern in FORBIDDEN_PATH_PATTERNS:
            if pattern.search(path):
                failures.append(f"{path} matches {pattern.pattern}")
    return failures


def check_content(paths: list[str]) -> list[str]:
    failures = []
    for path in paths:
        if path in CONTENT_ALLOWLIST:
            continue
        file_path = Path(path)
        if not file_path.is_file():
            continue
        try:
            text = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for line_no, line in enumerate(text.splitlines(), start=1):
            for pattern in SUSPICIOUS_CONTENT_PATTERNS:
                if pattern.search(line):
                    failures.append(f"{path}:{line_no} matches {pattern.pattern}")
    return failures


def main() -> int:
    try:
        paths = tracked_files()
    except subprocess.CalledProcessError as exc:
        print("FAIL: could not inspect tracked files with git ls-files.")
        print(exc.stderr.strip())
        return 1

    path_failures = check_paths(paths)
    content_failures = check_content(paths)

    if path_failures:
        print("Forbidden tracked paths:")
        for failure in path_failures:
            print(f"- {failure}")

    if content_failures:
        print("Suspicious tracked content:")
        for failure in content_failures:
            print(f"- {failure}")

    if path_failures or content_failures:
        print("FAIL: repository hygiene check failed.")
        return 1

    print("PASS: no tracked local tooling or generated artifact contamination detected.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
