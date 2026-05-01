- [Summary](#summary)
- [Question 1](#question-1)
	- [What went wrong](#what-went-wrong)
	- [The 3 valid scopes](#the-3-valid-scopes)
- [Question 5: What's true about default variables?](#question-5-whats-true-about-default-variables)
	- [The key distinction — which context to use](#the-key-distinction--which-context-to-use)
	- [1. Defined in the workflow file](#1-defined-in-the-workflow-file)
	- [2. Defined in GitHub UI (Settings → Secrets and variables → Actions → Variables)](#2-defined-in-github-ui-settings--secrets-and-variables--actions--variables)
	- [Important distinction — `env` vs `vars` context](#important-distinction--env-vs-vars-context)
- [Question 8: **You can use `permissions` to modify the `GITHUB_TOKEN` permissions on:**](#question-8-you-can-use-permissions-to-modify-the-github_token-permissions-on)
	- [Simple code example](#simple-code-example)
	- [Why step level doesn't exist](#why-step-level-doesnt-exist)
- [Question 9](#question-9)
	- [Why `needs.job1.outputs.output1` is correct](#why-needsjob1outputsoutput1-is-correct)
	- [Why the others are wrong](#why-the-others-are-wrong)

# Summary

```
# Custom variables Scope - WF/job/step
- env
- jobs.<job_id>.env
- jobs.<job_id>.steps[*].env
- env is inside WF.`${{ env.MY_VAR }}`
- env == CUSTOM variables only

# env vs vars
- GitHub UI → Settings → Variables - `${{ vars.MY_VAR }}`
- GitHub UI → Settings → Secrets - `${{ secrets.MY_SECRET }}`

# permissions
- scope = WF/Job

# a dependent job reference = to reference another job's output.
- needs `needs.<job-id>.outputs.<output-name>`
```

# Question 1

What are the scopes defined for custom variables in a workflow?

- **All the jobs within a workflow, by using `jobs.env`**
- **The entire workflow, by using `env` at the top level of the workflow file**
- A specific environment in the repository, by using `environment.<environment_id>.env` at the top level of the workflow file
- **A specific step within a job, by using `jobs.<job_id>.steps[*].env`**
- **The contents of a job within a workflow, by using `jobs.<job_id>.env`**
- The entire workflow, by using `custom.env` at the top level of the workflow file

✅ Correct Answers:

```
- ❌**All the jobs within a workflow, by using `jobs.env`**
- ✅ **The entire workflow, by using `env` at the top level of the workflow file**
- A specific environment in the repository, by using `environment.<environment_id>.env` at the top level of the workflow file
- ✅ **A specific step within a job, by using `jobs.<job_id>.steps[*].env`**
- ✅ **The contents of a job within a workflow, by using `jobs.<job_id>.env`**
- The entire workflow, by using `custom.env` at the top level of the workflow file
```

## What went wrong

- `jobs.env` (without a specific job ID) simply doesn't exist — that's the trap in this question.
- You selected `jobs.env` (wrong) but missed `jobs.<job_id>.steps[*].env` (correct).

| Option                       | Correct? | Reason                                           |
| ---------------------------- | -------- | ------------------------------------------------ |
| `jobs.env`                   | ❌       | This syntax **does not exist** in GitHub Actions |
| `jobs.<job_id>.env`          | ✅       | Scopes to a specific job                         |
| `jobs.<job_id>.steps[*].env` | ✅       | Scopes to a specific step — you missed this one  |
| `env` at top level           | ✅       | Scopes to entire workflow                        |
| `environment.<id>.env`       | ❌       | Does not exist in workflow YAML                  |
| `custom.env`                 | ❌       | Does not exist at all                            |

## The 3 valid scopes

```yaml
env:
  VAR: 'whole workflow' # ← top-level env ✅

jobs:
  build:
    env:
      VAR: 'this job only' # ← jobs.<job_id>.env ✅
    runs-on: ubuntu-latest
    steps:
      - name: My step
        env:
          VAR: 'this step only' # ← jobs.<job_id>.steps[*].env ✅
        run: echo $VAR
```

---

# Question 5: What's true about default variables?

- Currently, the value of the default CI environment variable can be overwritten, but it's not guaranteed this will always be possible
- Default environment variables always have the prefix "GITHUB\_"
- You can add a new default environment variable adding the prefix "GITHUB\_" to it
- **Most of the default environment variables have a corresponding context property**
- **Default environment variables are set by GitHub and not defined in a workflow**
- **Default environment variables can be accessed using the env context** - "env" context is for CUSTOM variables only

✅ Correct Answers:

```
- ✅ Currently, the value of the default CI environment variable can be overwritten, but it's not guaranteed this will always be possible
- Default environment variables always have the prefix "GITHUB\_"
- You can add a new default environment variable adding the prefix "GITHUB\_" to it
- ✅ **Most of the default environment variables have a corresponding context property**
- ✅ **Default environment variables are set by GitHub and not defined in a workflow**
- ❌**Default environment variables can be accessed using the env context** - "env" context is for CUSTOM variables only
```

- You selected "accessed using the **env context**" — but this is **wrong**. You also missed the first correct answer.

| Option                                   | Correct? | Reason                    |
| ---------------------------------------- | -------- | ------------------------- |
| `CI` can be overwritten (not guaranteed) | ✅       | Missed this one           |
| Accessed using the `env` context         | ❌       | Wrong context — see below |

## The key distinction — which context to use

```yaml
steps:
  - run: echo $GITHUB_SHA # ← default var: accessed directly in shell
  - run: echo ${{ github.sha }} # ← accessed via "github" context ✅
  - run: echo ${{ env.MY_CUSTOM_VAR }} # ← "env" context is for CUSTOM variables only
```

- **Default environment variables** → use the `github` context (e.g. `github.sha`, `github.ref`)
- **Custom environment variables** → use the `env` context (e.g. `env.MY_VAR`)
- The `env` context is **not** for default variables — that's the trap here.
- Great question! `env` context variables can be defined in **both places**. Here's the breakdown:

## 1. Defined in the workflow file

```yaml
env:
  MY_CUSTOM_VAR: 'hello' # ← defined right here in the YAML

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${{ env.MY_CUSTOM_VAR }} # prints "hello"
```

## 2. Defined in GitHub UI (Settings → Secrets and variables → Actions → Variables)

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${{ env.MY_CUSTOM_VAR }} # reads from Settings
        env:
          MY_CUSTOM_VAR: ${{ vars.MY_CUSTOM_VAR }} # ← pull from vars context first
```

---

## Important distinction — `env` vs `vars` context

| Defined in                       | Access with                |
| -------------------------------- | -------------------------- |
| Workflow YAML (`env:` block)     | `${{ env.MY_VAR }}`        |
| GitHub UI → Settings → Variables | `${{ vars.MY_VAR }}`       |
| GitHub UI → Settings → Secrets   | `${{ secrets.MY_SECRET }}` |

So if your variable is set in **GitHub Settings UI**, you actually use the `vars` context, not `env`. The `env` context is specifically for variables defined **inside the workflow YAML file itself**.

```yaml
# Variables from GitHub Settings UI
- run: echo ${{ vars.MY_CUSTOM_VAR }} # ✅ correct for UI-defined variables
- run: echo ${{ secrets.MY_SECRET }} # ✅ correct for UI-defined secrets
```

---

# Question 8: **You can use `permissions` to modify the `GITHUB_TOKEN` permissions on:**

- **Job level**
- **Step level**
- **Workflow level**

✅ Correct Answers:

```
- ✅ **Job level**
- ❌❌**Step level**
- ✅ **Workflow level**
```

- `permissions` can only be set at **workflow level** and **job level** — **not step level**.

## Simple code example

```yaml
# Workflow level permissions
permissions:
  contents: read
  issues: write

jobs:
  build:
    runs-on: ubuntu-latest
    # Job level permissions (overrides workflow level)
    permissions:
      contents: read # ← narrowed down for this job only
    steps:
      - run: echo "hello"
      # ❌ No permissions block at step level — does not exist
```

---

## Why step level doesn't exist

`permissions` controls the **token scope** for the entire job's runner environment. Since all steps in a job share the same runner and the same `GITHUB_TOKEN`, it's not possible to change permissions mid-job at the step level.

| Level          | Supported | Purpose                     |
| -------------- | --------- | --------------------------- |
| Workflow level | ✅        | Default for all jobs        |
| Job level      | ✅        | Override for a specific job |
| Step level     | ❌        | Does not exist              |

---

# Question 9

How should a dependent job reference the `output1` value produced by a job named `job1` earlier in the same workflow?

- `${{depends.job1.output1}}`
- `${{needs.job1.output1}}`
- `${{needs.job1.outputs.output1}}`
- `${{job1.outputs.output1}}`

✅ Correct Answers:

```
- `${{depends.job1.output1}}`
- `${{needs.job1.output1}}`
- ✅ `${{needs.job1.outputs.output1}}`
- ❌❌`${{job1.outputs.output1}}`
```

## Why `needs.job1.outputs.output1` is correct

You must always start with `needs.` to reference another job's output. This is because `needs` declares the dependency relationship between jobs.

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    outputs:
      output1: ${{ steps.my-step.outputs.value }} # ← define output on job
    steps:
      - id: my-step
        run: echo "value=hello" >> $GITHUB_OUTPUT # ← set value in step

  job2:
    runs-on: ubuntu-latest
    needs: job1 # ← declare dependency
    steps:
      - run: echo "${{ needs.job1.outputs.output1 }}" # ← correct reference ✅
```

## Why the others are wrong

| Option                 | Why wrong                                                       |
| ---------------------- | --------------------------------------------------------------- |
| `depends.job1.output1` | `depends` is not a valid context — doesn't exist                |
| `needs.job1.output1`   | Missing `outputs.` — must be `needs.job1.outputs.output1`       |
| `job1.outputs.output1` | Missing `needs.` prefix — job name alone is not a valid context |

The full correct syntax is always: **`needs.<job-id>.outputs.<output-name>`**
