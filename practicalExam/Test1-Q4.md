- [Q4: Which of the following are true regarding workflow-level vs. job-level outputs blocks?](#q4-which-of-the-following-are-true-regarding-workflow-level-vs-job-level-outputs-blocks)
  - [Job-level output (regular workflow)](#job-level-output-regular-workflow)
  - [Workflow-level output (reusable workflow)](#workflow-level-output-reusable-workflow)
  - [How the value flows](#how-the-value-flows)
  - [❌ Wrong Answers:](#-wrong-answers)
  - [Job-level output → un-nested (flat key=value) ✅](#job-level-output--un-nested-flat-keyvalue-)
  - [Workflow-call output → nested structure ✅](#workflow-call-output--nested-structure-)
  - [Summary](#summary)

---

# Q4: Which of the following are true regarding workflow-level vs. job-level outputs blocks?

- A workflow-level outputs block should only be used in reusable workflows, not caller workflows.` ✅
- A reusable workflow can have both workflow-level and job-level outputs blocks.` ✅
- A job-level outputs block must have the following structure:❌

```yaml
outputs:
    <output-name>
        value: ${{ steps.<step-name>.outputs.<output-name> }}
```

- A workflow-level outputs block must have the following structure:` ✅

```yaml
outputs:
    <output-name>
        value: ${{ jobs.<job-name>.outputs.<output-name> }}
```

- Job-level outputs blocks should only be used in caller workflows, not reusable workflows.❌

✅ Correct Answers:

- A workflow-level outputs block should only be used in reusable workflows, not caller workflows.` ✅

✅ A "workflow-level" outputs block refers to an outputs block that is a direct child of workflow_call in reusable workflows. In non-reusable workflows, outputs blocks should only be present at job-level.

## Job-level output (regular workflow)

Outputs are defined on the **job**, then read by another job using `needs`.

```yaml
# .github/workflows/main.yml
name: Job-level output demo

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      my-color: ${{ steps.set-color.outputs.color }} # ← expose step output as job output

    steps:
      - name: Set a color
        id: set-color
        run: echo "color=blue" >> $GITHUB_OUTPUT # ← step sets the value

  use-output:
    runs-on: ubuntu-latest
    needs: build # ← must depend on the first job
    steps:
      - name: Print the color
        run: echo "Color is ${{ needs.build.outputs.my-color }}"
```

---

## Workflow-level output (reusable workflow)

A **reusable workflow** exposes outputs under `on.workflow_call.outputs`. A **caller workflow** reads them via `needs`.

```yaml
# .github/workflows/reusable.yml  ← reusable workflow
name: Reusable workflow

on:
  workflow_call:
    outputs:
      my-color: # ← workflow-level output
        description: 'A color value'
        value: ${{ jobs.build.outputs.my-color }} # ← maps from job output

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      my-color: ${{ steps.set-color.outputs.color }} # ← job-level output

    steps:
      - name: Set a color
        id: set-color
        run: echo "color=blue" >> $GITHUB_OUTPUT
```

```yaml
# .github/workflows/caller.yml  ← caller workflow
name: Caller workflow

on: push

jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml # ← call the reusable workflow

  use-output:
    runs-on: ubuntu-latest
    needs: call-reusable
    steps:
      - name: Print the color
        run: echo "Color is ${{ needs.call-reusable.outputs.my-color }}"
```

---

## How the value flows

```
# Job-level only:
Step (GITHUB_OUTPUT) → Job outputs → needs.<job>.outputs

# Reusable workflow:
Step (GITHUB_OUTPUT) → Job outputs → workflow_call outputs → needs.<job>.outputs
```

The key rule from your notes: the `outputs:` block under `workflow_call:` only exists in **reusable workflows**. Regular workflows only have job-level `outputs:`.

## ❌ Wrong Answers:

- A job-level outputs block must have the following structure:❌

```yaml
outputs:
    <output-name>
        value: ${{ steps.<step-name>.outputs.<output-name> }}
```

- A job-level outputs block uses an un-nested structure of key=value pairs.

## Job-level output → un-nested (flat key=value) ✅

```yaml
jobs:
  build:
    outputs:
      my-color: ${{ steps.set-color.outputs.color }} # ← flat: key=value
```

No `value:` sub-key. Just `output-name: expression` directly.

---

## Workflow-call output → nested structure ✅

```yaml
on:
  workflow_call:
    outputs:
      my-color: # ← output name
        description: '...'
        value: ${{ jobs.build.outputs.my-color }} # ← nested value:
```

This one uses the nested `value:` sub-key — but this is `workflow_call`, not a job.
This is wrong for a **job-level** output because it's using the `workflow_call` nested style in the wrong place.

---

## Summary

| Location                   | Structure                                    |
| -------------------------- | -------------------------------------------- |
| `jobs.<job>.outputs`       | Flat: `name: ${{ expression }}`              |
| `on.workflow_call.outputs` | Nested: `name: { value: ${{ expression }} }` |

Your "fixed" version (`outputs: value: ${{ ... }}`) is still wrong because it removes the output name entirely. The correct job-level structure needs the output name as the key with the expression as the direct value.
