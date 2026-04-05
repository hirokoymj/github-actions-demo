# Github Action Demo

✅ Step 1 — Environment Variables (env-variables.yml)
✅ Step 2 — Multiple Jobs with needs: (multi-jobs.yml)
✅ Step 3 — Conditional Steps with if: (conditional-steps.yml)
✅ Step 4 — Marketplace Actions (setup-node.yml)

## GitHub Marketplace

- a library of pre-built, reusable actions
- Think of it like an npm registry, but for GitHub Actions workflows.
- with `uses:`
- `owner/action-name@version`
- `with:`
- https://github.com/marketplace/actions/setup-node-js-environment
- https://github.com/marketplace/actions/checkout

## Certification

- https://ghcertified.com/practice_tests/
- https://medium.com/@kittipat_1413/github-actions-certification-exam-complete-review-and-study-tips-208c70ab7a8f

Exam Details
Format: Roughly 75 multiple-choice and multiple-selection questions.
Duration: 120 minutes.
Cost: Approximately $99 USD, though prices vary by region.
Passing Score: Typically 70%.
Delivery: Proctored online via Pearson VUE or at physical testing centers.
Validity: The certification is valid for **3 year**s

## Syntax

- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax

- **on**: Defines events that trigger the workflow (e.g., push, pull_request, workflow_dispatch)
- **jobs**: Groups jobs.
  - `<job_id>`: Unique job name (e.g., build, test).
  - **runs-on**: Specifies the runner (e.g., ubuntu-latest).
  - **steps**: List of tasks in the job:
    - **run**: Executes a command-line script.
    - **uses**: Calls a reusable GitHub Action. (e.g., actions/checkout@v4)

```yml
on: push # Required: What triggers it
jobs: # Required: Container for jobs
  my-job: # Required: Job identifier
    runs-on: ubuntu-latest # Required: Where it runs
    steps: # Required: List of tasks
      - run: echo "Hello World" # One of 'run' or 'uses' is required per step
```

## Add Your Secrets

Repository Secret
https://shadhujan.medium.com/how-to-keep-supabase-free-tier-projects-active-d60fd4a17263

Settings -> Secrets and variables -> Actions -> Repository secrets -> New repository secret

- SUPABASE_URL
- SUPABASE_KEY

```bash
curl -X GET "${{ secrets.SUPABASE_URL }}/rest/v1/your_table_name?select=id&limit=1" \
-H "apikey: ${{ secrets.SUPABASE_KEY }}" \
-H "Authorization: Bearer ${{ secrets.SUPABASE_KEY }}"
```


## Review - YouTube
## Runner Types (4/5)

- GitHub hosted
- 3rd Party hosted
- Self-hosted
- VM image
- https://docs.github.com/en/actions/concepts/runners/github-hosted-runners
- ![](./RunnerTypes.png)
- [03-core-features--02-step-types.yaml](https://github.com/hirokoymj/devops-directive-github-actions-course/blob/main/.github/workflows/03-core-features--02-step-types.yaml)
