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
- [Artifact](#artifact)
- [Call GET method](#call-get-method)
- [Package and versioning](#package-and-versioning)
- [CI](#ci)
- [Docker commands](#docker-commands)

---

## Test a workflow locally

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

## Hello World

- [hello-world.yml](.github/workflows/hello-world.yml)

## Quick Start

- [quickstart.yml](.github/workflows/quickstart.yml)

## Print Environment variables

- [print-env-vars.yml](.github/workflows/print-env-vars.yml)
- Settings -> Secrets and variables -> Actions -> Environment variables

## Print default variables

- [print-default-vars.yml](.github/workflows/print-default-vars.yml)
- `GITHUB_*`
- `RUNNER_*`
- https://docs.github.com/en/actions/reference/workflows-and-actions/variables

## Setup Node

- [setup-node.yml](.github/workflows/setup-node.yml)

## $GITHUB_OUTPUT

- [setup-node.yml](.github/workflows/github-output-demo.yaml)
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs

## $GITHUB_ENV

- [github-env-demo.yaml](.github/workflows/github-env-demo.yaml)
- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-environment-variable
- `echo "VAR=value" >> $GITHUB_ENV` to pass variables to later steps.
- subsequent steps only, not the current step.

| Method                     | Scope                               |
| -------------------------- | ----------------------------------- |
| `$GITHUB_ENV`              | Current job only (subsequent steps) |
| `$GITHUB_OUTPUT` + `needs` | Across jobs (within same workflow)  |
| Artifacts                  | Across jobs and workflows           |

## $GITHUB_TOKEN

- [create-issue.yml](.github/workflows/create-issue.yml)
- https://docs.github.com/en/actions/tutorials/authenticate-with-github_token

| Token          | Scope                                                          |
| -------------- | -------------------------------------------------------------- |
| `GITHUB_TOKEN` | Current repository **only** (the repo where the workflow runs) |
| PAT            | Other repositories (especially private ones)                   |

- https://docs.github.com/en/actions/tutorials/authenticate-with-github_token
- ✅ none, read, write

## Permission

## Status Check function

- ✅ success(), always(), cancelled() and failure()
- https://docs.github.com/en/enterprise-cloud@latest/actions/reference/workflows-and-actions/expressions#status-check-functions

## Workflow Trigger

- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#issue_comment

## GitHub Actions billing

**For public repositories:**

- GitHub Actions is completely free
- This includes standard GitHub-hosted runners (like ubuntu-latest)
- There is no minutes limit for public repos
- https://docs.github.com/en/billing/concepts/product-billing/github-actions#how-use-of-github-actions-is-measured

## Dependent jobs - `needs`

- [jobs.<job_id>.needs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?versionId=free-pro-team%40latest&productId=actions&restPage=tutorials%2Ccreate-an-example-workflow#jobsjob_idneeds)
  Great question. Here's a simple way to think about it:

## `matrix`

- [matrix-output.yml](.github/workflows/matrix-output.yml)
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations#about-matrix-strategies

## Artifact

- [skills-workflow-artifacts](https://github.com/hirokoymj/skills-workflow-artifacts)
- [Exercise: Work with Workflow Artifacts](https://github.com/hirokoymj/skills-workflow-artifacts/issues/1)
- [test.yml](https://github.com/hirokoymj/skills-workflow-artifacts/blob/main/.github/workflows/tests.yml)

```yml
# package.json
"scripts": {
  "test": "vitest run src",
  "test:coverage": "vitest run --coverage src",
  "test:e2e": "playwright test"
},
# test.yml
- run: npm ci
- run: npm run test:coverage
```

## Call GET method

- [keep_alive.yml](https://github.com/hirokoymj/next-openai-app/blob/main/.github/workflows/keep_alive.yml)

```yaml
- name: Ping Supabase Database
  run: |
    curl -X GET "${{ secrets.SUPABASE_URL }}/rest/v1/users?select=id&limit=1" \
    -H "apikey: ${{ secrets.SUPABASE_KEY }}" \
    -H "Authorization: Bearer ${{ secrets.SUPABASE_KEY }}"
```

## Package and versioning

- [docker-publish.yml](https://github.com/hirokoymj/hirokoymj-vercel/blob/main/.github/workflows/docker-publish.yml)
- login → build (with args) → push

```bash
# Login to a container registry
docker login ghcr.io -u YOUR_GITHUB_USERNAME -p YOUR_TOKEN

# Build an image
docker build -t ghcr.io/your-org/your-repo:latest .

# Build an image with arguments
docker build \
  --build-arg REACT_APP_GOOGLE_MAP_API_KEY=your_key \
  --build-arg FIREBASE_API_KEY=your_key \
  -t ghcr.io/your-org/your-repo:latest .

# Push an image to a registry
docker buildx build \
  --platform linux/amd64 \
  --push \
  -t ghcr.io/your-org/your-repo:latest .
```

## CI

- [Exercise - Create the CI workflow on GitHub](https://learn.microsoft.com/en-us/training/modules/github-actions-ci/3-exercise-ci-workflow-github?ns-enrollment-type=learningpath&ns-enrollment-id=learn.github-actions)

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

## Docker commands

```bash
# List all images on your machine
docker images

# Run a container from an image
docker run -p 3000:3000 ghcr.io/your-org/your-repo:latest

# List running containers
docker ps

# Stop a running container
docker stop CONTAINER_ID

# Pull an image from a registry
docker pull ghcr.io/your-org/your-repo:latest

# Remove an image
docker rmi ghcr.io/your-org/your-repo:latest

# View logs of a running container
docker logs CONTAINER_ID
```
