Q21: What are the possible types of an input variable for a manually triggered workflow? (Select five.)

💡 https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_dispatchinputsinput_idtype

✅ Correct answers (Select five):

👉 boolean
👉 string
👉 choice
👉 environment
👉 number

💡 Why these are correct

For workflow_dispatch (manual trigger), GitHub supports these input types:

```yaml
on:
  workflow_dispatch:
    inputs:
      example:
        type: string # 👈 one of the valid types
```

✔️ Supported types

- string
- boolean
- choice (dropdown selection)
- number
- environment

---

Q22: A workflow that has only workflow_dispatch event trigger can be triggered using GitHub's REST API

💡 https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_dispatchinputs

✅ Correct answer:👉 True

💡 Why this is correct

A workflow with only workflow_dispatch can be triggered in two ways:

1. Manually from the GitHub UI
2. Via GitHub REST API

```js
POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches
{
  "ref": "main",
  "inputs": {
    "example": "value"
  }
}
```

#### 🧠 Key takeaway

workflow_dispatch:

- ✔ Manual trigger (UI)
- ✔ API trigger (REST API)
- !!! If you want, I can show you a curl example you can run locally 👍

---

Q23: To stop a workflow from running temporarily without modifying the source code you should

- Delete environment that is required for this workflow
- Remove secrets that are required for this workflow
- Use the Disable workflow option in GitHub Actions
- Prevent any new commits to main branch

💡 https://docs.github.com/en/actions/using-workflows/disabling-and-enabling-a-workflow

✅ Correct answer: 👉 Use the Disable workflow option in GitHub Actions

#### 🧠 Key takeaway

`Temporary stop → Disable workflow (UI)`

---
