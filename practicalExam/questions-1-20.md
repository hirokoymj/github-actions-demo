# Practice Test - GH-200

https://ghcertified.com/questions/actions/

---

Q1: Which statement is correct regarding passing permissions to reusable workflows?

✅ Correct answer:

👉 The GITHUB_TOKEN permissions passed from the caller workflow can be only downgraded by the called workflow.

- https://docs.github.com/en/actions/using-workflows/reusing-workflows#access-and-permissions

```yaml
# .github/workflows/caller.yml
name: Caller Workflow

on: workflow_dispatch

permissions:
  contents: write # 👈 MAX permission allowed

jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml
```

---

Q2: What are the different permission levels you can assign to GITHUB_TOKEN in the permissions block?

✅ Correct answer:

👉 none, read, write

💡 Why this is correct

In GitHub Actions, each permission for GITHUB_TOKEN can be set to:

- read → read-only access
- write → read + write access
- none → completely disabled

```yaml
permissions:
  contents: read # Can read repository contents
  issues: write # Can create/update issues
  actions: none # Has no access to Actions API
```

- https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs

---

Q3: You can use permissions to modify the GITHUB_TOKEN permissions on: (Select two.)

- Step level
- Workflow level
- Job level

✅ Correct answers:

👉 Workflow level
👉 Job level

- https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token

- Workflow level

```yaml
permissions:
  contents: read
```

- Job level

```yaml
jobs:
  build:
    permissions:
      contents: write
```

---

Q4: Are GitHub Actions free for public repositories?

Yes, when using standard GitHub-hosted runners

- https://docs.github.com/en/billing/concepts/product-billing/github-actions#how-use-of-github-actions-is-measured

- ✅ Correct answer:

👉 Yes, when using standard GitHub-hosted runners

**For public repositories:**

- GitHub Actions is completely free
- This includes standard GitHub-hosted runners (like ubuntu-latest)
- There is no minutes limit for public repos

---

Q5: Which of these is not a valid event that could trigger a workflow?

- A branch is created
- Adding a label to a pull request
- Cloning the repository
- Committing a file to master branch

💡 https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#about-events-that-trigger-workflows

💡 Why this is correct

GitHub Actions workflows are triggered by GitHub events (things that happen on GitHub), such as:

- push → committing code
- pull_request → PR actions (like adding labels)
- create → creating a branch or tag

👉 Cloning a repository is a local action, not a GitHub event
→ So it cannot trigger a workflow

---

Q6: Which is true about workflows? (Select three.)

💡 https://docs.github.com/en/actions/using-workflows/about-workflows

✅ Correct answers (Select three):

- 👉 Workflows can run one or multiple jobs at a time
- 👉 Workflows can be triggered manually, by an event or run on a schedule
- 👉 Workflows have to be defined in the .github/workflows directory

🧠 Quick summary

- ✔ Multiple jobs
- ✔ Multiple triggers (event / manual / schedule)
- ✔ Must be in .github/workflows
- ❌ Not shared in Marketplace

---

Q7: Which components are required for a workflow? (Select two.)

- Defined branches on which the workflow will run
- One or more events that will trigger the workflow
- One or more jobs
- Workflow name

💡 https://docs.github.com/en/actions/using-workflows/about-workflows#workflow-basics

✅ Correct answers (Select two):

👉 One or more events that will trigger the workflow
👉 One or more jobs

💡 Why these are required

#### ✔️ **Events (on)**

Every workflow needs a trigger:

```yaml
on: push
```

#### ✔️ Jobs (jobs)

A workflow must define at least one job:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

#### 🧠 Minimum valid workflow

```yaml
on: push

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hello"
```

---

Q8: Which event is triggered by a webhook action from outside of the repository?

- webhook_dispatch
- api_dispatch
- workflow_dispatch
- remote_dispatch
- repository_dispatch

💡 https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

✅ Correct answer:

👉 repository_dispatch

```yaml
on:
  repository_dispatch:
    types: [my-event]

curl -X POST \
  -H "Authorization: token <TOKEN>" \
  https://api.github.com/repos/OWNER/REPO/dispatches \
  -d '{"event_type":"my-event"}'
```

#### 🧠 Key takeaway

- External trigger → repository_dispatch
- Manual trigger → workflow_dispatch
- If you want, I can show you a real-world integration example (e.g., trigger from your Next.js app) 👍

---

Q9: Workflows are defined in which format

- yaml

---

Q10: Where should you store sensitive data such as passwords or certificates that will be used in workflows

- secrets

---

Q11: In a workflow with multiple jobs the default behavior is:

- Only the first job runs, others require manual approval
- All jobs run in parallel
- Jobs run based on the order they are defined in the workflow file
- Jobs run in sequence

💡 https://docs.github.com/en/actions/using-workflows/about-workflows#creating-dependent-jobs

✅ Correct answer:

👉 All jobs run in parallel

💡 Why this is correct
By default, jobs in a workflow run in parallel
This helps speed up execution

👉 Example:

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
  job2:
    runs-on: ubuntu-latest
```

➡️ job1 and job2 start at the same time

🔄 When do jobs run in sequence?

Only when you explicitly define dependencies using needs:

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest

  job2:
    runs-on: ubuntu-latest
    needs: job1 # 👈 runs AFTER job1
```

---

Q12: If job B requires job A to be finished you have to:

- use the needs keyword in job B to create this dependency

💡 https://docs.github.com/en/actions/using-workflows/about-workflows#creating-dependent-jobs

👉 use the needs keyword in job B to create this dependency
💡 Why this is correct
The needs keyword defines job dependencies

#### 🧩 Example

```yaml
jobs:
  jobA:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Job A"

  jobB:
    runs-on: ubuntu-latest
    needs: jobA # 👈 waits for jobA
    steps:
      - run: echo "Job B"
```

---

Q12: In a workflow with multiple jobs, if job A fails then:

- the jobs that are dependent on job A are skipped\*\*
- the jobs that are dependent on job A fail

💡 https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-jobs#defining-prerequisite-jobs

✅ Correct answer:

👉 the jobs that are dependent on job A are skipped

#### 🧩 Example

```yaml
jobs:
  jobA:
    runs-on: ubuntu-latest
    steps:
      - run: exit 1 # ❌ fails

  jobB:
    runs-on: ubuntu-latest
    needs: jobA # depends on jobA
    steps:
      - run: echo "Job B"
```

👉 Result:

- jobA → ❌ failed
- jobB → ⏭️ skipped

---

Q14: This code will launch 6 different jobs in parallel using the matrix strategy. Can you use the matrix strategy to parallelize entire workflows?

```yaml
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12, 14]
        os: [ubuntu-latest, windows-latest]
```

- No
- https://docs.github.com/en/actions/using-workflows/reusing-workflows#using-a-matrix-strategy-with-a-reusable-workflow

✅ Correct answer:

👉 No

💡 Why this is correct

- The matrix strategy works at the job level, not the workflow level
- It creates multiple job runs within a single workflow

#### 🧠 Key takeaway

**Matrix strategy:**

- ✔ Parallel jobs
- ❌ Parallel workflows

---

Q15: Which matrix job definition is syntactically correct?

```yaml
//CORRECT
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12, 14]
        os: [ubuntu-latest, windows-latest]
```

```yaml
//WRONG
jobs:
  example_matrix:
    matrix:
      strategy:
        version: [10, 12, 14]
        os: [ubuntu-latest, windows-latest]
```

💡 https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy

💡 Why this is correct
In GitHub Actions, matrix must be defined under strategy
Correct structure:

- `jobs → job_id → strategy → matrix`

---

Q16: How do you access matrix variables in a matrix strategy job?

💡 https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy

✅ Correct answer:

👉 Using the matrix context

#### 💡 Why this is correct

Matrix variables are accessed via the matrix context
Syntax:

```yaml
${{ matrix.<variable_name> }}
```

#### 🧩 Example

```yaml
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12]
        os: [ubuntu-latest]

    runs-on: ${{ matrix.os }}

    steps:
      - run: echo "Node version is ${{ matrix.version }}"
```

👉 This will output:

- Node version is 10
- Node version is 12

---

Q17: When using the pull_request and pull_request_target events, how do you configure the workflow to run only when targeting the prod branch?

💡 https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#using-filters-to-target-specific-branches-for-pull-request-events

✅ Correct answer:

👉 Using branches filter

#### 💡 Why this is correct

To run a workflow only when a PR targets a specific branch (e.g., prod), you use the branches filter:

```yaml
on:
  pull_request:
    branches:
      - prod
```

---

Q18: This workflow will run on all pull requests where:

```yaml
on:
  pull_request:
    branches:
      - 'release/**'
      - '!release/**-alpha'
```

💡 https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#example-including-and-excluding-branches

✅ Correct answer:

👉 the target branch name starts with release but does not end with -alpha

#### 💡 Why this is correct

For pull_request:

- The branches filter applies to the target (base) branch, not the source branch
- !!! If you want, I can show you a visual diagram (source vs target branch in PR)—this is a very common confusion 👍

---

Q19: Fill in the blank: When using push event trigger filters you can use <\_\_\_\_> patterns to target multiple branches

💡 https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#using-filters-to-target-specific-branches-or-tags-for-push-events

✅ Correct answer: 👉 glob

💡 Why this is correct

GitHub Actions uses **glob patterns** to match branches or tags in filters.

```yaml
on:
  push:
    branches:
      - 'feature/*'
      - 'release/**'
```

🔍 What is a glob pattern?

- `*` → matches any characters (except /)
- `**` → matches across directories (/)
- `!` → excludes patterns

---

Q20: Which event allows you to manually trigger a workflow from the GitHub UI?

workflow_dispatch

💡 https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow

---
