- [Q30: Which of the following are true regarding calling reusable workflows versus calling composite actions?](#q30-which-of-the-following-are-true-regarding-calling-reusable-workflows-versus-calling-composite-actions)
  - [✅ Correct Answers:](#-correct-answers)
  - [Quick reference table](#quick-reference-table)
  - [Why each answer is correct/wrong](#why-each-answer-is-correctwrong)
  - [One-line memory trick](#one-line-memory-trick)

---

# Q30: Which of the following are true regarding calling reusable workflows versus calling composite actions?

1. Composite actions must be called as a step within a job

2. Secrets can be passed to both reusable workflows and calling composite actions via the uses.secrets block.

3. Reusable workflows are called via referencing the folder that contains their action.yml file.

4. Composite actions are called via referencing the folder that contains their action.yml file.

5. Reusable workflows can use a different runner type than the caller workflow, while composite actions cannot.

6. Reusable workflows must be called on workflow job level (not from step-level).

7. Only reusable workflows can accept inputs.

## ✅ Correct Answers:

```
1. ✅Composite actions must be called as a step within a job
2. ❌Secrets can be passed to both reusable workflows and calling composite actions via the uses.secrets block.
3. ❌Reusable workflows are called via referencing the folder that contains their action.yml file.
4. ✅Composite actions are called via referencing the folder that contains their action.yml file.
5. ✅Reusable workflows can use a different runner type than the caller workflow, while composite actions cannot.
6. ✅Reusable workflows must be called on workflow job level (not from step-level).
7. ❌Only reusable workflows can accept inputs.
```

Here's a side-by-side comparison first, then each explanation:

## Quick reference table

|                 | Reusable Workflow                    | Composite Action                       |
| --------------- | ------------------------------------ | -------------------------------------- |
| Called at       | **Job level** (`uses:` under `jobs`) | **Step level** (`uses:` under `steps`) |
| Referenced by   | `.github/workflows/name.yml`         | folder containing `action.yml`         |
| Own runner      | ✅ Yes                               | ❌ No (inherits caller's runner)       |
| Accepts inputs  | ✅ Yes                               | ✅ Yes                                 |
| Accepts secrets | ✅ Yes (`secrets:` block)            | ❌ No (use env vars instead)           |

---

## Why each answer is correct/wrong

**✅ 1. Composite actions must be called as a step within a job**

```yaml
steps:
  - uses: ./my-action # ← composite action lives here, inside steps
```

Composite actions run inside an existing job's steps — they can't create their own job.

---

**❌ 2. Secrets can be passed to both via `uses.secrets` block**

Only **reusable workflows** accept secrets via `secrets:`. Composite actions cannot — you pass sensitive values through `inputs:` or environment variables instead.

```yaml
# Reusable workflow ✅
jobs:
  call:
    uses: ./.github/workflows/reusable.yml
    secrets:
      MY_SECRET: ${{ secrets.MY_SECRET }}

# Composite action ❌ — no secrets block, use env instead
steps:
  - uses: ./my-action
    env:
      MY_SECRET: ${{ secrets.MY_SECRET }}
```

---

**❌ 3. Reusable workflows are called via referencing the folder containing `action.yml`**

This is backwards. Reusable workflows are `.yml` files inside `.github/workflows/` and are referenced by their **full file path**:

```yaml
uses: ./.github/workflows/reusable.yml # ← full file path, not a folder
```

---

**✅ 4. Composite actions are called via referencing the folder containing `action.yml`**

Composite actions live in a folder with an `action.yml` inside. You reference the **folder**, and GitHub finds the `action.yml` automatically:

```yaml
uses: ./my-action # ← folder name, not the file
```

---

**✅ 5. Reusable workflows can use a different runner than the caller**

Because a reusable workflow defines its **own jobs**, it can specify any runner it wants. Composite actions run inside the caller's existing job, so they're stuck with whatever runner the caller is already using.

```yaml
# Reusable workflow — its own runner ✅
jobs:
  build:
    runs-on: windows-latest # ← totally independent
```

---

**✅ 6. Reusable workflows must be called at job level**

```yaml
jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml # ← job level, not inside steps
```

They create an entire job, so they belong under `jobs:`, not under `steps:`.

---

**❌ 7. Only reusable workflows can accept inputs**

Both accept inputs. Composite actions define inputs in `action.yml` just like reusable workflows do:

```yaml
# Composite action's action.yml ✅
inputs:
  my-input:
    description: 'An input'
    required: true
```

---

## One-line memory trick

> **Reusable workflow = a whole new job** (own runner, own secrets, called at job level)
> **Composite action = just a reusable set of steps** (no own runner, no secrets, called at step level)
