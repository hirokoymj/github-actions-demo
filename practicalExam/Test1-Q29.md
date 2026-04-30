# Q29: GITHUB_TOKEN can be used to check out any repository.

- True❌
- False✅

✅ Correct Answers:

- GITHUB_TOKEN's permissions are scoped to the repository that contains the workflow that was triggered. To check out another repository, other methods token must be used, such as a personal access token (PAT) or installation access token

Your understanding is close but not quite right. The real distinction is **current repo vs. other repos**, not public vs. private.

## Correct understanding

| Token          | Scope                                                          |
| -------------- | -------------------------------------------------------------- |
| `GITHUB_TOKEN` | Current repository **only** (the repo where the workflow runs) |
| PAT            | Other repositories (especially private ones)                   |

---

## Why the question answer is False

`GITHUB_TOKEN` cannot check out **any** repository — it is automatically scoped to only the repo that triggered the workflow. It has no access to other repos at all.

```yaml
# ✅ GITHUB_TOKEN works — checking out the CURRENT repo (default behavior)
- uses: actions/checkout@v4
  with:
    token: ${{ secrets.GITHUB_TOKEN }}

# ❌ GITHUB_TOKEN fails — checking out a DIFFERENT repo
- uses: actions/checkout@v4
  with:
    repository: another-org/another-repo
    token: ${{ secrets.GITHUB_TOKEN }} # won't work

# ✅ PAT works — checking out a different private repo
- uses: actions/checkout@v4
  with:
    repository: another-org/another-repo
    token: ${{ secrets.MY_PAT }}
```

---

## Corrected summary

- `GITHUB_TOKEN` → current repo only (public or private doesn't matter)
- `PAT` → other repos, especially **private** ones
- Checking out a **different public repo** — technically no token is needed at all since it's publicly accessible

The key word in Q29 is **"any"** — that's what makes it false. `GITHUB_TOKEN` is locked to one repo.
