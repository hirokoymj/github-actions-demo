# Github Actions Study Note

Great question. Here's a simple way to think about it:

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

## Certification

- https://ghcertified.com/practice_tests/
- https://medium.com/@kittipat_1413/github-actions-certification-exam-complete-review-and-study-tips-208c70ab7a8f

**Exam Details**

- Format: Roughly 75 multiple-choice and multiple-selection questions.
- Duration: 120 minutes.
- Cost: Approximately $99 USD, though prices vary by region.
- Passing Score: Typically 70%.
- Delivery: Proctored online via Pearson VUE or at physical testing centers.
- Validity: The certification is valid for **3 year**s
