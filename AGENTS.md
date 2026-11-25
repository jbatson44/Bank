# Local Agent Rules

## File Editing Rules
- NEVER pass large multi-function blocks to `edit`. Keep `oldString` small (3–10 lines) around the exact change.
- If replacing most of a small file (under ~150 lines), use `write` to rewrite the whole file cleanly after reading it first.
- Always `read` the file immediately after editing to verify there are no duplicate functions or syntax errors.

## Workflow
- Work on ONE file per step. Finish and verify one file before moving to the next.
- Keep responses concise; do not paste entire files into chat when using tools.