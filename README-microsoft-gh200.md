# GH-200

- [GH-200](#gh-200)
  - [1. MS module (GH-500) Part 1 of 2](#1-ms-module-gh-500-part-1-of-2)
    - [Publish to GitHub Packages and GitHub Container Registry](#publish-to-github-packages-and-github-container-registry)
  - [2. MS module (GH-500) Part 2 of 2](#2-ms-module-gh-500-part-2-of-2)
  - [3. MS Practice for the exam](#3-ms-practice-for-the-exam)
  - [4. Past Exam Questions (Q1-Q127)](#4-past-exam-questions-q1-q127)

## 1. MS module (GH-500) Part 1 of 2

- https://learn.microsoft.com/en-us/training/paths/github-actions/

### Publish to GitHub Packages and GitHub Container Registry

- .github/workflows/release-package.yml
- A job named build runs npm ci
- Once the build job succeeds, the job named publish-gpr publishes the package.
- registry-url: https://npm.pkg.github.com/



## 2. MS module (GH-500) Part 2 of 2

- https://learn.microsoft.com/en-us/training/paths/github-actions-2/

## 3. MS Practice for the exam

https://learn.microsoft.com/en-us/credentials/certifications/github-actions/practice/assessment?assessment-type=practice&assessmentId=1001&practice-assessment-type=certification

## 4. Past Exam Questions (Q1-Q127)

https://ghcertified.com/questions/actions/question-001/

✅ MS Learning Path Part 1 (4 modules)

- Automate development tasks with GitHub Actions
- Build CI workflows
- Build & deploy to Azure ← you can skim this one
- Automate GitHub using GitHub Script

✅ MS Learning Path Part 2 (3 modules)

- GitHub Packages
- Create & publish custom GitHub Actions ← high exam weight
- Manage GitHub Actions in the enterprise ← high exam weight

✅ Practice Assessment

- Very important — do this multiple times until you score consistently high.

✅ ghcertified.com (Q1-Q127)

- Excellent resource — these are crowd-sourced past exam questions.

My Recommended Study Order

1. Start with ghcertified.com Q1-Q127 — identify your weak areas first
2. Go back to MS modules to fill in gaps
3. Take the MS practice assessment to gauge readiness
4. Repeat ghcertified.com questions until comfortable

Top Topics to Focus On

- Workflow syntax (on:, jobs:, steps:, env:, secrets:)
- Reusable workflows (workflow_call)
- Custom actions (composite, Docker, JavaScript)
- Environments & protection rules
- Enterprise policy management
- GitHub Packages
