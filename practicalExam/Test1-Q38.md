Q38: What are the scopes defined for custom variables in a workflow?

1. The entire workflow, by using custom.env at the top level of the workflow file

2. The contents of a job within a workflow, by using `jobs.<job_id>.env`

3. The entire workflow, by using env at the top level of the workflow file

4. All the jobs within a workflow, by using jobs.env

5. A specific step within a job, by using `jobs.<job_id>.steps[*].env`

6. A specific environment in the repository, by using `environment.<environment_id>.env` at the top level of the workflow file

## ✅ Correct Answers:

```
1. ❌The entire workflow, by using custom.env at the top level of the workflow file

2. ✅ The contents of a job within a workflow, by using `jobs.<job_id>.env`

3. ✅ The entire workflow, by using env at the top level of the workflow file

4. ❌All the jobs within a workflow, by using jobs.env

5. ✅ A specific step within a job, by using `jobs.<job_id>.steps[*].env`

6. ❌A specific environment in the repository, by using `environment.<environment_id>.env` at the top level of the workflow file
//I pick this and it is wrong.
```

## Option 5 — Step-level `env` example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Print greeting
        env:
          MY_NAME: 'Hiroko' # ← only available in THIS step
        run: echo "Hello, $MY_NAME"

      - name: Next step
        run: echo "$MY_NAME" # ← empty! MY_NAME is gone here
```

`env:` under a step is only alive for that one step. The next step can't see it.

---

## Option 6 — Why it's wrong

Option 6 says you can set variables using `environment.<environment_id>.env` **inside the workflow file**. This doesn't exist.

GitHub **Environments** (like `production`, `staging`) are configured in **repository Settings**, not in the workflow file itself.

```yaml
# ❌ This syntax does not exist
environment.production.env:
  MY_VAR: 'hello'

# ✅ You reference an environment like this — but you can't SET env vars for it here
jobs:
  deploy:
    environment: production # ← just a reference, not a place to define variables
    runs-on: ubuntu-latest
```

Environment variables for a specific environment are set in **GitHub → Settings → Environments → your environment → Environment variables**, not in the workflow YAML.

---

## All three valid scopes side by side

```yaml
env:
  SCOPE: 'whole workflow' # ← option 3: top-level, all jobs see this

jobs:
  build:
    env:
      SCOPE: 'this job only' # ← option 2: job-level
    runs-on: ubuntu-latest
    steps:
      - name: My step
        env:
          SCOPE: 'this step only' # ← option 5: step-level
        run: echo $SCOPE
```
