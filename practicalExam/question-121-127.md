Q121: What’s true about default variables? (choose three)

✅ Correct answers (Choose three):

- 👉 Most of the default environment variables have a corresponding context property
- 👉 Currently, the value of the default CI environment variable can be overwritten, but it's not guaranteed this will always be possible
- 👉 Default environment variables are set by GitHub and not defined in a workflow

💡[doc](https://docs.github.com/en/actions/reference/workflows-and-actions/variables)

#### 💡 Why these are correct

#### ✔️ Corresponding context

- Many default env vars map to contexts:
- `GITHUB_REF → ${{ github.ref }}`
- `GITHUB_SHA → ${{ github.sha }}`

#### ✔️ CI variable note

- CI=true is set by default
- You can override it, but GitHub warns:
  > This behavior may not be guaranteed in the future

#### ✔️ Set by GitHub

- These variables are automatically provided
- You don’t define them yourself

---

Q122: What are the scopes defined for custom variables in a workflow? (choose three)

💡 [doc](https://docs.github.com/en/actions/learn-github-actions/variables#defining-environment-variables-for-a-single-workflow)

✅ Correct answers (Choose three):

- 👉 A specific step within a job, by using jobs.<job_id>.steps[*].env
- 👉 The contents of a job within a workflow, by using jobs.<job_id>.env
- 👉 The entire workflow, by using env at the top level of the workflow file

---

Q123: What must be added to actions/checkout if my-org/my-private-repo is a private repository differing from the one containing the current workflow?

```yaml
name: deploy-workflow
on: [push]
jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout GitHub Action'
        uses: actions/checkout@v4
        with:
          repository: my-org/my-private-repo
          path: ./.github/actions/my-org/my-private-repo
```

✅ Correct answer:

👉 4. Create a GitHub secret MY_ACCESS_TOKEN

```yaml
with:
  repository: my-org/my-private-repo
  path: ./.github/actions/my-org/my-private-repo
  token: ${{ secrets.MY_ACCESS_TOKEN }}
```

💡 https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#example-using-an-action-inside-a-different-private-repository-than-the-workflow

#### 💡 Why this is correct

- The default GITHUB_TOKEN:
  - ❌ Cannot access other private repositories
- To access a different private repo, you must:
  - ✅ Use a Personal Access Token (PAT)
  - ✅ Store it as a GitHub secret

---

Q124: Given the following configuration, how many jobs will GitHub Actions run when this matrix is evaluated?

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [14, 16]
    include:
      - os: macos-latest
        node: 18
      - os: ubuntu-latest
        node: 14
```

💡 [doc](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow#expanding-or-adding-matrix-configurations)

✅ Correct answer: 👉 5 jobs

#### 1️⃣ Base matrix combinations

```yaml
os: [ubuntu-latest, windows-latest] # 2
node: [14, 16]
```

1. ubuntu + 14
2. ubuntu + 16
3. windows + 14
4. windows + 16

#### 2️⃣ Include section

```yaml
include:
  - os: macos-latest
    node: 18 # ➕ new combination

  - os: ubuntu-latest
    node: 14 # ⚠ already exists
```

- ✅ macos + 18 → adds 1 new job
- ⚠ ubuntu + 14 → duplicate → NOT added again

---

Q125: At what levels can environment variables be defined ? (Choose three)

💡 [doc](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables)

✅ Correct answers (Choose three):

👉 Workflow level
👉 Job level
👉 Step level

#### ✔️ Workflow level

```
env:
  GLOBAL_VAR: value
```

👉 Available to all jobs and steps

#### ✔️ Job level

```yaml
jobs:
  build:
    env:
      JOB_VAR: value
```

👉 Available to all steps in that job

#### ✔️ Step level

```yaml
steps:
  - name: Example
    env:
      STEP_VAR: value
```

👉 Available only in that step

---

Q126: How should a dependent job reference the output1 value produced by a job named job1 earlier in the same workflow?

💡 [doc](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/passing-information-between-jobs)

✅ Correct answer: 👉 ${{ needs.job1.outputs.output1 }}

#### 💡 Why this is correct

- To access outputs from another job, you must:

1. Declare a dependency using **needs**
2. Reference outputs via the **needs** context

#### 🧩 Example

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    outputs:
      output1: ${{ steps.step1.outputs.result }}
    steps:
      - id: step1
        run: echo "result=hello" >> "$GITHUB_OUTPUT"

  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      - run: echo "${{ needs.job1.outputs.output1 }}"
```

- 👉 job2 can access job1 output via:
- ${{ needs.job1.outputs.output1 }}

---

Q127: Which workflow command syntax correctly sets an environment variable named 'API_VERSION' with the value '2.1' for subsequent steps in a GitHub Actions job?

- echo "API_VERSION=2.1" >> "$GITHUB_OUTPUT"
- set-env name=API_VERSION value=2.1
- export API_VERSION=2.1 >> "$GITHUB_ENV"
- echo "API_VERSION=2.1" >> "$GITHUB_ENV" 👉

💡 https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-environment-variable

✅ Correct answer:

👉 echo "API_VERSION=2.1" >> "$GITHUB_ENV"

#### 💡 Why this is correct

- `$GITHUB_ENV` is the official way to set environment variables for subsequent steps in a job

#### 🧩 Example

```yaml
steps:
  - name: Set env
    run: echo "API_VERSION=2.1" >> "$GITHUB_ENV"

  - name: Use env
    run: echo $API_VERSION
```

👉 Output:2.1
