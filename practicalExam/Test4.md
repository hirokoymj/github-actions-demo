# Test 4

- [Test 4](#test-4)
  - [Summary](#summary)
  - [Question 33: Why use a commit SHA versus a tag to pin an action?](#question-33-why-use-a-commit-sha-versus-a-tag-to-pin-an-action)
    - [What went wrong](#what-went-wrong)
  - [Question 47: Which of these is a way of using `action_state` in `step_two`?](#question-47-which-of-these-is-a-way-of-using-action_state-in-step_two)
    - [The critical difference](#the-critical-difference)
    - [Why `$action_state` is correct](#why-action_state-is-correct)
    - [Why your answer was wrong](#why-your-answer-was-wrong)
  - [Question 69: Who can bypass configured deployment protection rules to force deployment (by default)?](#question-69-who-can-bypass-configured-deployment-protection-rules-to-force-deployment-by-default)
    - [Permission levels in GitHub](#permission-levels-in-github)
  - [Question 25](#question-25)
  - [You got this one right! ✅](#you-got-this-one-right-)
  - [Why this matters](#why-this-matters)

## Summary

```
# commit SHA vs a tag
- uses: actions/checkout@v4 ===> tag can be moved to a different commit
- uses: actions/checkout@b4111111 ===> always points to exact same commit, easy to audit

# $GITHUB_ENV
- becomes a **real environment variable**
- ✅run: echo "${{ env.action_state }}"
- ✅run: echo "$action_state"
- ❌❌run: echo "${{ action_state }}"

# deployment protection rules
- Repo admin
```

## Question 33: Why use a commit SHA versus a tag to pin an action?

- Commit SHAs are immutable, whereas tags have the potential to be changed
- Commit SHAs are more secure
- Commit SHAs are more convenient to use as opposed to tags
- Commit SHAs are more difficult to trace in an audit, making it difficult for bad actors to determine how an action's code factors in overall processes.
- Commit SHAs are guaranteed to point to the exact same code every time, tags are not

✅ Correct Answers:

```
- ✅ Commit SHAs are immutable, whereas tags have the potential to be changed
- ✅ Commit SHAs are more secure
- ❌Commit SHAs are more convenient to use as opposed to tags
- ❌Commit SHAs are more difficult to trace in an audit, making it difficult for bad actors to determine how an action's code factors in overall processes.
- ✅ Commit SHAs are guaranteed to point to the exact same code every time, tags are not
```

### What went wrong

You selected "more **difficult** to trace in an audit" — but it's the **opposite**. Commit SHAs make auditing **easier**, not harder.

| Option                               | Correct? | Reason                                           |
| ------------------------------------ | -------- | ------------------------------------------------ |
| SHAs are more secure                 | ✅       | Only way to guarantee immutable action reference |
| SHAs are **harder** to audit         | ❌       | **Wrong** — SHAs make auditing **easier**        |
| SHAs guaranteed same code every time | ✅       | Core reason to use SHA pinning                   |

```yaml
# Tag pinning ❌ — tag can be silently moved to a different commit
- uses: actions/checkout@v4

# SHA pinning ✅ — always points to exact same commit, easy to audit
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
```

With a SHA, anyone can look up exactly what code ran. With a tag, the code could have changed without anyone noticing — making **tags** harder to audit, not SHAs.

---

## Question 47: Which of these is a way of using `action_state` in `step_two`?

```yaml
steps:
  - name: Set the value
    id: step_one
    run: |
      echo "action_state=yellow" >> "$GITHUB_ENV"
  - name: Use the value
    id: step_two
    run: ?
```

- `run: echo "$steps.step_one.outputs.action_state"`
- `run: echo "${{ action_state }}"`
- `run: echo "$action_state"`
- `run: echo "${{ steps.step_one.outputs.action_state }}"` → That would be the case if `action_state` was written to `$GITHUB_OUTPUT`

✅ Correct Answers:

```
- `run: echo "$steps.step_one.outputs.action_state"`
- ❌❌`run: echo "${{ action_state }}"`
- ✅ `run: echo "$action_state"`
- `run: echo "${{ steps.step_one.outputs.action_state }}"`
```

### The critical difference

| Written to       | How to read it                               |
| ---------------- | -------------------------------------------- |
| `$GITHUB_ENV`    | `$action_state` (shell variable directly)    |
| `$GITHUB_OUTPUT` | `${{ steps.step_one.outputs.action_state }}` |

### Why `$action_state` is correct

- When you write to `$GITHUB_ENV`, the variable becomes a **real environment variable** available to all subsequent steps in the job — just like any shell variable:

```yaml
steps:
  - name: Set the value
    id: step_one
    run: echo "action_state=yellow" >> "$GITHUB_ENV"

  - name: Use the value
    id: step_two
    run: echo "$action_state" # ← reads as plain shell variable ✅
```

### Why your answer was wrong

- `${{ action_state }}` is not valid syntax — there is no `action_state` context in GitHub Actions expressions.
- Expression syntax `${{ }}` is for contexts like `env.`, `steps.`, `secrets.`, `github.` etc.

```yaml
run: echo "${{ env.action_state }}"   # ← this would also work ✅
run: echo "$action_state"             # ← this is the simplest correct form ✅
run: echo "${{ action_state }}"       # ← invalid, no such context ❌❌❌❌
```

---

## Question 69: Who can bypass configured deployment protection rules to force deployment (by default)?

- Anyone with repository read permission
- **Anyone with repository write permission**
- **Repository administrators**

✅ Correct Answers:

```
- Anyone with repository read permission
- ❌**Anyone with repository write permission**
- ✅ **Repository administrators**
```

- Write permission is not enough — only **repository administrators** can bypass deployment protection rules by default.

### Permission levels in GitHub

```
Read → Write → Maintain → Admin
                              ↑
                    only this level can bypass
                    deployment protection rules
```

Here is the extracted text from the image:

---

## Question 25

In a workflow that has multiple jobs, all running on GitHub-hosted runners, is it true that all jobs are guaranteed to run on the same runner machine?

- Only if they run in parallel
- Only if they use the same `runs-on` label
- Yes
- ✅ No

---

## You got this one right! ✅

- Each job gets its own **fresh, isolated runner machine** — even if they use the same `runs-on` label.

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest # ← gets Machine A (fresh)
    steps:
      - run: echo "I am job1"

  job2:
    runs-on: ubuntu-latest # ← gets Machine B (different fresh machine)
    steps:
      - run: echo "I am job2"
```

## Why this matters

Because each job runs on a **different machine**, files created in one job are **not available** in the next job. This is why you need `actions/upload-artifact` and `actions/download-artifact` to share files between jobs.

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - run: echo "hello" > file.txt
      - uses: actions/upload-artifact@v4 # ← must upload to share
        with:
          name: my-file
          path: file.txt

  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      - uses: actions/download-artifact@v4 # ← must download on new machine
        with:
          name: my-file
      - run: cat file.txt
```

Each GitHub-hosted runner is a **clean VM provisioned fresh** for each job, then discarded when the job finishes.
