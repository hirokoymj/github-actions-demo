## Github Actions Study Notes

- [Github Actions Study Notes](#github-actions-study-notes)
  - [Test a workflow locally](#test-a-workflow-locally)
  - [Hello World](#hello-world)
  - [Quick Start](#quick-start)
  - [Print Environment variables](#print-environment-variables)
  - [Print default variables](#print-default-variables)
  - [Setup Node](#setup-node)
  - [$GITHUB_OUTPUT](#github_output)
  - [$GITHUB_ENV](#github_env)
  - [$GITHUB_TOKEN](#github_token)
  - [Permission](#permission)
  - [Status Check function](#status-check-function)
  - [Workflow Trigger](#workflow-trigger)
  - [GitHub Actions billing](#github-actions-billing)
  - [Dependent jobs - `needs`](#dependent-jobs---needs)
  - [`matrix`](#matrix)
  - [CI/CD](#cicd)

### Test a workflow locally

1. Install act command
   - [Installation](https://nektosact.com/installation/homebrew.html)
   - [act User Guide](https://nektosact.com/)
   - https://github.com/nektos/act
2. Run Docker desktop app
3. Use `act` command

```bash
Docker
act push -W .github/workflows/quickstart.yml
```

### Hello World

- [hello-world.yml](.github/workflows/hello-world.yml)

### Quick Start

- [quickstart.yml](.github/workflows/quickstart.yml)

### Print Environment variables

- [print-env-vars.yml](.github/workflows/print-env-vars.yml)
- Settings -> Secrets and variables -> Actions -> Environment variables

### Print default variables

- [print-default-vars.yml](.github/workflows/print-default-vars.yml)
- `GITHUB_*`
- `RUNNER_*`
- https://docs.github.com/en/actions/reference/workflows-and-actions/variables

### Setup Node

- [setup-node.yml](.github/workflows/setup-node.yml)

### $GITHUB_OUTPUT

- [setup-node.yml](.github/workflows/github-output-demo.yaml)
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs

### $GITHUB_ENV

- [github-env-demo.yaml](.github/workflows/github-env-demo.yaml)
- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-environment-variable
- `echo "VAR=value" >> $GITHUB_ENV` to pass variables to later steps.
- subsequent steps only, not the current step.

| Method                     | Scope                               |
| -------------------------- | ----------------------------------- |
| `$GITHUB_ENV`              | Current job only (subsequent steps) |
| `$GITHUB_OUTPUT` + `needs` | Across jobs (within same workflow)  |
| Artifacts                  | Across jobs and workflows           |

### $GITHUB_TOKEN

- [create-issue.yml](.github/workflows/create-issue.yml)
- https://docs.github.com/en/actions/tutorials/authenticate-with-github_token

| Token          | Scope                                                          |
| -------------- | -------------------------------------------------------------- |
| `GITHUB_TOKEN` | Current repository **only** (the repo where the workflow runs) |
| PAT            | Other repositories (especially private ones)                   |

- https://docs.github.com/en/actions/tutorials/authenticate-with-github_token
- ✅ none, read, write

### Permission

### Status Check function

- ✅ success(), always(), cancelled() and failure()
- https://docs.github.com/en/enterprise-cloud@latest/actions/reference/workflows-and-actions/expressions#status-check-functions

### Workflow Trigger

- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#issue_comment

### GitHub Actions billing

**For public repositories:**

- GitHub Actions is completely free
- This includes standard GitHub-hosted runners (like ubuntu-latest)
- There is no minutes limit for public repos
- https://docs.github.com/en/billing/concepts/product-billing/github-actions#how-use-of-github-actions-is-measured

### Dependent jobs - `needs`

- [jobs.<job_id>.needs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?versionId=free-pro-team%40latest&productId=actions&restPage=tutorials%2Ccreate-an-example-workflow#jobsjob_idneeds)
  Great question. Here's a simple way to think about it:

### `matrix`

- [matrix-output.yml](.github/workflows/matrix-output.yml)
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations#about-matrix-strategies

### CI/CD

**CI — Continuous Integration**

- Every time you push code, an automated process runs to verify the code is good — things like installing dependencies, running tests, and building the app. The goal is to catch problems early before they reach production.

In your case, the CI part is:

```
npm ci ← install dependencies
npm run build ← build the app, catch any compile errors
```

**CD — Continuous Delivery/Deployment**

- After CI passes, automatically deliver the artifact (your built app) somewhere. In your case that's pushing the Docker image to GitHub Container Registry.

| Step                   | CI or CD | What it does                      |
| ---------------------- | -------- | --------------------------------- |
| npm ci                 | CI       | Install dependencies              |
| npm run build          | CI       | Build & verify the app compiles   |
| docker build           | CI       | Package the app into a container  |
| docker push to ghcr.io | CD       | Deliver the image to the registry |

- The short version: **CI = verify the code works**, **CD = ship it somewhere**. They're usually combined in one pipeline like yours.

---

**Certification**

- https://ghcertified.com/practice_tests/
- https://medium.com/@kittipat_1413/github-actions-certification-exam-complete-review-and-study-tips-208c70ab7a8f

**Exam Details**

- Format: Roughly 75 multiple-choice and multiple-selection questions.
- Duration: 120 minutes.
- Cost: Approximately $99 USD, though prices vary by region.
- Passing Score: Typically 70%.
- Delivery: Proctored online via Pearson VUE or at physical testing centers.
- Validity: The certification is valid for **3 year**s
