# 49: Select status check functions in GitHub Actions

- completed(), always(), cancelled() and failure()
- success(), always(), cancelled() and failure()

## ✅ Correct Answers:

```
- ❌completed(), always(), cancelled() and failure()
- ✅ success(), always(), cancelled() and failure()
```

# Q33: Which is true about environments?

1. ❌Each workflow can reference a single environment. - ❌(staging + production)
2. ❌Each job in a workflow can reference a maximum of two environments. ❌Each **job** references only **one environment**
3. ✅Each job in a workflow can reference a single environment.
4. ❌Each workflow can reference a maximum of two environments. ❌(staging + production)

## Simple environment example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on: push

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging # ← this job references "staging" environment

    steps:
      - name: Deploy to staging
        run: echo "Deploying to staging..."

  deploy-production:
    runs-on: ubuntu-latest
    environment: production # ← this job references "production" environment
    needs: deploy-staging

    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."
```

---

## Why the answers make sense

- The **workflow** itself references **two environments** here (staging + production) — so options 1 and 4 are both wrong.
- Each **job** references only **one environment** — that's why option 3 is correct and option 2 is wrong.

# Q35: Dave wants to be notified when a comment is created on an issue within a GitHub repository. Which event trigger should be used within the workflow configuration?

- issue_comment✅
- issues.comment
- comment
- issues

https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#issue_comment

```
on:
  issue_comment:
    types: [created, deleted]
```

# Q45: Which configuration is appropriate for triggering a workflow to run on webhook events related to check_run actions?

```yaml
#1
on:
    check_run:
        types: [started]

#2
on:
    check_run:
        filter: [requested]

#3✅
on:
    check_run:
        types: [rerequested, completed]

#4
on:
    check_run:
        type: [closed]
```

- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#check_run

## Activity types

```
- created
- rerequested
- completed
- requested_action
```
