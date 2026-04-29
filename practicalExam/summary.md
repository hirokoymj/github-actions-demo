- [Default variables (== default environment variables)](#default-variables--default-environment-variables)
- [GITHUB_TOKEN](#github_token)
- [Repository variables ( = Repository secrets)](#repository-variables---repository-secrets)
- [Environment variables](#environment-variables)
- [Custom variable](#custom-variable) - [`env`](#env) - [`jobs.<job_id>.env`](#jobsjob_idenv) - [`jobs.<job_id>.steps[*].env`](#jobsjob_idstepsenv)
- [Q84: Which keyword allows you to define environment variables in a GitHub Actions workflow?](#q84-which-keyword-allows-you-to-define-environment-variables-in-a-github-actions-workflow)
- [Q61: Which of the following are default environment variables in GitHub Actions? (Select three.)](#q61-which-of-the-following-are-default-environment-variables-in-github-actions-select-three)
- [$GITHUB_OUTPUT](#github_output)
- [Summary](#summary)

## Default variables (== default environment variables)

- Provided by GitHub
- https://docs.github.com/en/actions/reference/workflows-and-actions/variables
- `GITHUB_*`
- `RUNNER_*`
- username: ${{ github.actor }}
- images: ghcr.io/${{ github.repository }}
- the value of the `GITHUB_REF` variable can be read during workflow processing using the `${{ github.ref }}` context property.

## GITHUB_TOKEN

- An auto-generated, short-lived secret GitHub creates at the start of every workflow run.
- https://docs.github.com/en/actions/tutorials/authenticate-with-github_token

```yaml
name: Open new issue
on: workflow_dispatch

jobs:
  open-issue:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - run: |
          gh issue --repo ${{ github.repository }} \
            create --title "Issue title" --body "Issue body"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Repository variables ( = Repository secrets)

- Settings -> Secrets and variables -> Actions -> Repository secrets
- FIREBASE_API_KEY
- FIREBASE_APP_ID
- FIREBASE_AUTH_DOMAIN
- FIREBASE_API_KEY=${{ secrets.FIREBASE_API_KEY }}
- FIREBASE_AUTH_DOMAIN=${{ secrets.FIREBASE_AUTH_DOMAIN }}

## Environment variables

- Settings -> Secrets and variables -> Actions -> Environment variables
- API_URL - api.stating.com - stating
- API_URL - api.prod.com - production
- API_URL inside production
- API_URL inside staging
- `environment: production` | `run: echo ${{ vars.API_URL }}`
- `environment: staging` | `run: echo ${{ vars.API_URL }}`

```yaml
name: Test Environment Variables
on: push

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment: production # GitHub Environment (UI: Settings ->Environments )
    steps:
      - name: Print production API URL
        run: echo ${{ vars.API_URL }} # Custom variable

  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Print staging API URL
        run: echo ${{ vars.API_URL }} # prints https:
```

## Custom variable

Q104: What is the recommended practice for treating environment variables in GitHub Actions, regardless of the operating system and shell used?

- ignore case sensitivity as GitHub Actions handles it automatically
- treat environment variables as case-sensitive ✅
- depend on the behavior of the operating system in use
- use only uppercase letters for environment variable names

```yaml
env:
  MY_VAR: hello

## Bash
echo $my_var   # ❌ may fail on Linux/macOS
echo $MY_VAR   # ✅ correct
```

#### `env`

https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#env

#### `jobs.<job_id>.env`

https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idenv

#### `jobs.<job_id>.steps[*].env`

https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsenv

## Q84: Which keyword allows you to define environment variables in a GitHub Actions workflow?

- env✅
- config
- secrets
- vars

✅ Workflow/Job/Step level

```yaml
# WF level
env:
  NODE_ENV: production
  API_URL: https://api.example.com

jobs:
  build: ..

# Job Level
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      BUILD_MODE: release
    steps: ...

# Step level
steps:
  - name: Run tests
    env:
      TEST_TIMEOUT: 30
    run: npm test
```

## Q61: Which of the following are default environment variables in GitHub Actions? (Select three.)

- GITHUB_ORGANIZATION
- GITHUB_REPOSITORY
- GITHUB_USER
- GITHUB_TOKEN
- GITHUB_WORKFLOW
- GITHUB_ACTOR

💡 https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables

✅ Correct Answer:

```
- GITHUB_ORGANIZATION ❌ does not exist
- GITHUB_REPOSITORY✅ - org/repo-name; hirokoymj/myapp
- GITHUB_USER ❌ does not exist
- GITHUB_TOKEN✅ - short-lived GitHub Action generated when a workflow started.
- GITHUB_WORKFLOW✅ - ##exists but wasn't a correct answer here
- GITHUB_ACTOR✅ - hirokoymj
```

- Default environment variables

```yaml
## Example 1
jobs:
  show-variables:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo $GITHUB_ACTOR        # ✅ "hiroko" - who triggered the run
          echo $GITHUB_REPOSITORY   # ✅ "hiroko/my-app" - owner/repo
          echo $GITHUB_TOKEN        # ✅ auto-generated auth token
          echo $GITHUB_WORKFLOW     # ✅ exists but wasn't a correct answer here
          echo $GITHUB_USER         # ❌ does not exist
          echo $GITHUB_ORGANIZATION # ❌ does not exist
```

- the value of the GITHUB_REF variable can be read during workflow processing using the ${{ github.ref }} context property.

## $GITHUB_OUTPUT

- Passing information between jobs
  https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs?versionId=free-pro-team%40latest&productId=actions&restPage=reference%2Cworkflows-and-actions%2Cvariables

## Summary

| Term                              | Example                 | Where Defined                    | Syntax                               |
| --------------------------------- | ----------------------- | -------------------------------- | ------------------------------------ |
| **GitHub Environment**            | `production`, `staging` | Settings UI → Environments       | `environment: production`            |
| **Custom variable** (`vars`)      | `API_URL`               | Settings UI → Environments       | `${{ vars.API_URL }}`                |
| **Environment variable** (`env:`) | `NODE_ENV`              | Workflow YAML (`env:`)           | `${{ env.NODE_ENV }}` or `$NODE_ENV` |
| **Default variable**              | `GITHUB_SHA`            | Auto-set by GitHub               | `$GITHUB_SHA` or `${{ github.sha }}` |
| **GITHUB_TOKEN**                  | `GITHUB_TOKEN`          | Auto-generated per workflow run  | `${{ secrets.GITHUB_TOKEN }}`        |
| **Repository secret** (`secrets`) | `FIREBASE_API_KEY`      | Settings UI → Repository secrets | `${{ secrets.FIREBASE_API_KEY }}`    |
