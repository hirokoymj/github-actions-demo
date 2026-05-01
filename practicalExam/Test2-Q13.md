- [Question 13](#question-13)
  - [✅ Correct Answers:](#-correct-answers)
  - [Why your answer is wrong](#why-your-answer-is-wrong)
- [Question 17](#question-17)
  - [✅ Correct Answers:](#-correct-answers-1)
  - [Why your answer is wrong](#why-your-answer-is-wrong-1)
- [Question 64](#question-64)
  - [Why your answer is wrong](#why-your-answer-is-wrong-2)
  - [Question 27](#question-27)
  - [Why `echo "::debug::Watch out here!"` is correct](#why-echo-debugwatch-out-here-is-correct)
  - [Why the others are wrong](#why-the-others-are-wrong)
  - [Other workflow commands using the same pattern](#other-workflow-commands-using-the-same-pattern)
  - [Question 35](#question-35)
  - [You got this one right! ✅](#you-got-this-one-right-)
  - [Question 56](#question-56)
  - [You got this one right! ✅](#you-got-this-one-right--1)
  - [Why the others are wrong](#why-the-others-are-wrong-1)
  - [Where to set it in GitHub](#where-to-set-it-in-github)
  - [Question 58](#question-58)
  - [You selected the correct answer! ✅](#you-selected-the-correct-answer-)
  - [Quick billing summary](#quick-billing-summary)
  - [Question 66](#question-66)
  - [You got this one right! ✅](#you-got-this-one-right--2)
  - [Why the others are wrong](#why-the-others-are-wrong-2)
  - [Correct usage in a full workflow](#correct-usage-in-a-full-workflow)
  - [Question 70](#question-70)
  - [Why all 3 are needed — the full flow](#why-all-3-are-needed--the-full-flow)

# Question 13

To access an artifact that was created in another, previously triggered workflow run you can:

- You cannot access artifacts that were created in a different workflow run
- Use the actions/upload-artifact action.
- ❌ Use the actions/download-artifact action and make sure the artifact is not expired
- ✅ Use the actions/download-artifact action with elevated permissions.

## ✅ Correct Answers:

```
- You cannot access artifacts that were created in a different workflow run
- Use the actions/upload-artifact action.
- Use the actions/download-artifact action and make sure the artifact is not expired ← YOUR ANSWER
- ✅ Use the actions/download-artifact action with elevated permissions.
```

## Why your answer is wrong

The correct answer is **"with elevated permissions"** — not just "make sure it is not expired."

To access an artifact from a **different, previously triggered workflow run**, the `actions/download-artifact` action needs elevated permissions because by default `GITHUB_TOKEN` only has access to artifacts from the **current workflow run**.

You need to set `actions: read` permission explicitly:

```yaml
permissions:
  actions: read # ← required to access artifacts from other workflow runs

jobs:
  download:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: my-artifact
          run-id: 1234567890 # ← specify the previous workflow run ID
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

The "not expired" part is a real concern (artifacts expire after 90 days by default), but it is **not** the key requirement — the elevated permission is what makes cross-run access possible.

---

# Question 17

Is this statement true? Workflows can be reused, but a reusable workflow cannot call another reusable workflow.

- ✅ False
- ❌ True

## ✅ Correct Answers:

- ✅ False
- True ← YOUR ANSWER

## Why your answer is wrong

The statement is False — a reusable workflow can call another reusable workflow. Nesting is allowed.

---

Here is the extracted text from the image:

---

# Question 64

What components can be reused within a GitHub Organization?

- Artifacts
  → Artifacts are used to preserve data after a job has completed and/or share that data with another job within the same workflow.

- Environment Variables❌
  → Environment variables can be scoped to a step, job or a workflow. They cannot be shared across workflows/repositories or organizations

- ✅ Configuration Variables
- ✅ Workflow Templates
- ✅ Self Hosted Runners
- Cache❌
  → Cache can be reused across workflows within one repository
- ✅ Secrets

❌ Incorrect

---

## Why your answer is wrong

You selected **Environment Variables** but that is incorrect. The correct answers are **Configuration Variables, Workflow Templates, Self Hosted Runners, and Secrets**.

| Component             | Scope                 | Reusable across org? |
| --------------------- | --------------------- | -------------------- |
| Artifacts             | Same workflow only    | ❌                   |
| Environment Variables | Step / Job / Workflow | ❌                   |
| Cache                 | Same repository only  | ❌                   |

Environment variables are defined inside the workflow YAML file itself — they have no concept of org-level sharing.

Here is the extracted text from the image:

---

## Question 27

Which is a correct way to print a debug message?

- `echo "::debug::message=Watch out here!"`
- `echo "Watch out here!" >> $GITHUB_DEBUG`
- `echo ":debug:Watch out here!"`
- ✅ `echo "::debug::Watch out here!"` ← YOUR ANSWER

---

## Why `echo "::debug::Watch out here!"` is correct

GitHub Actions uses **workflow commands** with the syntax `::command::message`. Debug is one of these built-in commands.

```yaml
steps:
  - name: Print debug message
    run: echo "::debug::Watch out here!"
```

## Why the others are wrong

| Option                                    | Why wrong                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| `echo "::debug::message=Watch out here!"` | `message=` is not part of the syntax — the message comes directly after `::` |
| `echo "Watch out here!" >> $GITHUB_DEBUG` | `$GITHUB_DEBUG` is not a real variable in GitHub Actions                     |
| `echo ":debug:Watch out here!"`           | Single colons `:debug:` is wrong — must be double colons `::debug::`         |

## Other workflow commands using the same pattern

```bash
echo "::debug::This is a debug message"
echo "::notice::This is a notice"
echo "::warning::This is a warning"
echo "::error::This is an error"
```

> **Note:** Debug messages only appear in the logs when **debug logging is enabled** — set the secret `ACTIONS_STEP_DEBUG` to `true` in your repository.

Here is the extracted text from the image:

---

## Question 35

Which of the following is a correct statement about GitHub Workflows and Actions?

- Each action is composed of one or more workflows which is composed of one or more jobs, and each job is composed of one or more steps

- ✅ **Each workflow is composed of one or more jobs which is composed of one or more steps, and each step is an action or a script** ← YOUR ANSWER

- Each action is composed of one or more jobs which is composed of one or more steps, and each step is a workflow

- Each workflow is composed of one or more actions which is composed of one or more jobs, and each job is composed of one or more steps

---

## You got this one right! ✅

The correct hierarchy is:

```
Workflow
└── Job(s)
    └── Step(s)
        └── Action or Script
```

```yaml
# workflow
name: My Workflow
jobs:
  build: # ← Job
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4 # ← Step: an Action
      - run: echo "Hello" # ← Step: a Script
```

**Workflow → Job → Step (action or script)** is the correct order.

---

Here is the extracted text from the image:

---

## Question 56

How can you require manual approvals by a maintainer if the workflow run is targeting the `production` environment?

- Using branch protection rules
- ✅ **Using deployment protection rules** ← YOUR ANSWER
- Setting the required reviewers in the `production` workflow
- Manual approvals are not supported by GitHub Actions

---

## You got this one right! ✅

**Deployment protection rules** are configured in **GitHub → Settings → Environments → production** — not in the workflow file itself.

```yaml
# workflow file — just references the environment
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production # ← triggers the protection rules
    steps:
      - run: echo "Deploying to production..."
```

The manual approval happens **before this job runs**, enforced by the protection rule set up in Settings.

## Why the others are wrong

| Option                  | Why wrong                                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| Branch protection rules | These protect branches from direct pushes/merges — not for deployment approvals |

## Where to set it in GitHub

```
GitHub Repo
└── Settings
    └── Environments
        └── production
            └── ✅ Required reviewers → add maintainer's name
```

---

Here is the extracted text from the image:

---

## Question 58

Are GitHub Actions free for public repositories?

- Yes, but only for the first 2,000 minutes per month
- ✅ **Yes, when using standard GitHub-hosted runners** ← YOUR ANSWER
- No, all GitHub Actions usage is billed
- No, only self-hosted runners are free for public repositories

---

## You selected the correct answer! ✅

GitHub Actions is **completely free** for public repositories when using **standard GitHub-hosted runners** (ubuntu, windows, macos) — with **no minute limits**.

## Quick billing summary

| Repository                  | Standard Runners           | Self-Hosted Runners |
| --------------------------- | -------------------------- | ------------------- |
| **Public**                  | ✅ Free (unlimited)        | ✅ Free             |
| **Private (Free plan)**     | 2,000 min/month free       | ✅ Free             |
| **Private (Pro/Team plan)** | Higher limits, then billed | ✅ Free             |

The key distinction: minute limits only apply to **private repositories**.

---

Here is the extracted text from the image:

---

## Question 66

In a GitHub Actions workflow, how do you specify a specific version of Node.js to use in a job?

- ✅

```yaml
#1 ✅
uses: actions/setup-node@v4✅
with:
  node-version: 20✅
```

```yaml
#2 ❌
uses: setup-node@v4❌
with:
  version: 20❌
```

```yaml
#3❌
uses: actions/node-setup@v4❌
with:
  node-version: 20
```

```yaml
#4
uses: setup-node@v4❌
with:
  node: 20❌
```

---

## You got this one right! ✅

## Why the others are wrong

| Option                        | Why wrong                                               |
| ----------------------------- | ------------------------------------------------------- |
| `uses: actions/node-setup@v4` | Wrong action name — it's `setup-node`, not `node-setup` |

## Correct usage in a full workflow

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20 # ← correct input key

      - run: node --version # prints v20.x.x
      - run: npm install
      - run: npm test
```

The action name is `actions/setup-node` and the input key is always `node-version`.

Here is the extracted text from the image:

---

## Question 70

A reusable workflow named `build` creates zip file artifacts. How do you pass the zip file location to the caller workflow that is calling the `build` workflow?

- All outputs are automatically passed to the caller workflows
- **In the `build` workflow you write the output into `$GITHUB_OUTPUT` in one of the steps** ← ✅
- You define an output on job level in the `build` workflow✅
- You define an output on workflow level in the `build` workflow✅

---

## Why all 3 are needed — the full flow

Passing an output from a reusable workflow requires **3 steps**, each answer maps to one:

```yaml
# reusable workflow: build.yml
on:
  workflow_call:
    outputs:
      zip-location: # ← STEP 3: workflow-level output
        value: ${{ jobs.build.outputs.zip-path }}

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      zip-path: ${{ steps.zip.outputs.location }} # ← STEP 2: job-level output
    steps:
      - name: Create zip
        id: zip
        run: |
          zip myfile.zip app/
          echo "location=myfile.zip" >> $GITHUB_OUTPUT  # ← STEP 1: write to $GITHUB_OUTPUT
```

```yaml
# caller workflow
jobs:
  call-build:
    uses: ./.github/workflows/build.yml

  use-output:
    needs: call-build
    runs-on: ubuntu-latest
    steps:
      - run: echo "${{ needs.call-build.outputs.zip-location }}"
```

The value must flow through all 3 levels: **Step → Job → Workflow**.
