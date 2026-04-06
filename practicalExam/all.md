GitHub Actions
Which statement is correct regarding passing permissions to reusable workflows?
What are the different permission levels you can assign to `GITHUB_TOKEN` in the `permissions` block?
You can use `permissions` to modify the `GITHUB_TOKEN` permissions on: (Select two.)
Are GitHub Actions free for public repositories?
Which of these is not a valid event that could trigger a workflow?
Which is true about workflows? (Select three.)
Which components are required for a workflow? (Select two.)
Which event is triggered by a webhook action from outside of the repository?
Workflows are defined in which format
Where should you store sensitive data such as passwords or certificates that will be used in workflows
In a workflow with multiple jobs the default behavior is:
If job B requires job A to be finished you have to:
In a workflow with multiple jobs, if job A fails then:
This code will launch 6 different jobs in parallel using the matrix strategy. Can you use the matrix strategy to parallelize entire workflows?
Which matrix job definition is syntactically correct?
How do you access matrix variables in a matrix strategy job?
When using the `pull_request` and `pull_request_target` events, how do you configure the workflow to run only when targeting the `prod` branch?
This workflow will run on all pull requests where:
Fill in the blank: When using `push` event trigger filters you can use <____> patterns to target multiple branches
Which event allows you to manually trigger a workflow from the GitHub UI?
What are the possible types of an input variable for a manually triggered workflow? (Select five.)
A workflow that has only `workflow_dispatch` event trigger can be triggered using GitHub's REST API
To stop a workflow from running temporarily without modifying the source code you should
What are `activity types` of an event used for ?
You want to create a reusable workflow `CI` that runs some quality checks, linting and tests on code changes. What event trigger should the `CI` workflow define to allow reusing it in other workflows?
A reusable workflow named `build` creates zip file artifacts. How do you pass the zip file location to the caller workflow that is calling the `build` workflow? (Select three.)
What are the valid use cases for using **defaults**? (Select two.)
How can you ensure that a workflow called `Deploy Prod` is always running at most one at a time?
Your Pull Request analysis workflow uses multiple code analysis tools and takes about 20minutes to fully complete. It is triggered on `pull_request` event with `branches` filter set to `master`. Therefore if a developer pushes multiple commits within few minutes multiple workflows are running in parallel. How can you stop all previous workflow runs and only run the one with latest changes?
When will job3 run?
What `jobs.job_id.if` conditional will make sure that job `production-deploy` is triggered only on `my-org/my-repo` repository? (Select two.)
What GitHub-hosted runner types are available to use? (Select three.)
Is this statement true? `Not all steps run actions, but all actions run as a step`
For any action published in GitHub Marketplace, you can often use it in multiple versions, which approach is the most stable and secure?
To prevent a job from failure when one of the steps fails you can include:
You defined a matrix job `example_matrix`. How can limit the matrix to run a maximum of 2 jobs at a time?
Which of these is a proper way of setting an output parameter `PET` with a value of `DOG` in a `step`.
Which of these is a way of using `action_state` in `step_two`?
Is this statement true? `Workflows can be reused, but a reusable workflow cannot call another reusable workflow.`
In the following example, `workflow A` passes all of its secrets to `workflow B`, by using the inherit keyword. Then `workflow B` calls `workflow C`. Which statement regarding `secrets` is true for that example?
When should you use `caching`?
When should you use `artifacts`? (Select two.)
If a workflow runs on a `feature-a` branch, can it restore `caches` created in the default `main` branch?
To access an `artifact` that was created in another, previously triggered workflow run you can:
What should you use to store coverage reports or screenshots generated during a workflow that runs automated testing for a repository?
You can only upload a single file at a time when using `actions/upload-artifact` action
In job `deploy`, if you want to access binaries (containing your application) that were created in job `build` you should
A job called `job2` is using artifacts created in `job1`. Therefore it's important to make sure `job1` finishes before `job2` starts looking for the artifacts. How should you create that dependency?
Which is true about `Starter Workflows` ? (Select three.)
Secrets and configuration variables can be scoped to: (Select three.)
What are the three types of Actions?
Is this statement true? `Docker container actions are usually slower than JavaScript actions`
When creating a custom GitHub Action you have to store the source code in `.github/workflows` directory
When creating custom GitHub Actions - in what file does all the action `metadata` have to be defined?
A workflow was initially run on `commit A` and failed. You fixed the workflow with the subsequent `commit B`. When you re-run that workflow it will run with code from which commit?
How can you require manual approvals by a maintainer if the workflow run is targeting the `production` environment?
Which is true about environments?
When using GitHub Actions to access resources in one of the cloud providers (such as AWS, Azure or GCP) the safest and recommended way to authenticate is
Your open-source publicly available repository contains a workflow with a `pull_request` event trigger. How can you require approvals for workflow runs triggered from forks of your repository?
Which of the following default environment variables contains the name of the person or app that initiated the workflow run?
Which of the following are default environment variables in GitHub Actions? (Select three.)
Your organization defines a secret `SomeSecret`, however when you reference that secret in a workflow using `${{ secrets.SomeSecret }}` it provides a different value than expected. What may be the reason for that?
Which is a correct way to print a debug message?
How can organizations which are using GitHub Enterprise Server enable automatic syncing of third party GitHub Actions hosted on GitHub.com to their GitHub Enterprise Server instance?
Where can you find network connectivity logs for a GitHub self-hosted-runner?
How can you validate that your GitHub self-hosted-runner can access all required GitHub services?
Which is the correct way of triggering a job only if configuration variable `MY_VAR` has the value of `MY_VALUE`?
To run a `step` only if the secret `MY_SECRET` has been set, you can:
How can you use the GitHub API to download workflow run logs?
How can you use the GitHub API to create or update a repository secret?
How can you override an organization-level GitHub Secret `API_KEY` with a different value when working within a repository? (Select two.)
What components can be reused within a GitHub Organization? (Select four.)
How many jobs will be executed in the following workflow?
Which of the following default environment variables contains the full name (e.g `octocat/hello-world`) of the repository where the workflow is running?
In a workflow that has multiple jobs, all running on GitHub-hosted runners, is it true that all jobs are guaranteed to run on the same runner machine?
What's the maximum amount of reusable workflows that can be called from a single workflow file?
What is a self-hosted runner?
Which of the following is a correct statement about GitHub Workflows and Actions?
On which commit and branch do scheduled workflows run in GitHub Actions?
What is the correct syntax for setting the directory for all `run` commands in a workflow?
How can you reuse a defined workflow in multiple repositories? (Choose two.)
How can you ensure a job runs only on a specific branch?
What does the `needs` keyword do in a GitHub Actions workflow?
Which keyword allows you to define environment variables in a GitHub Actions workflow?
What is the purpose of the `with` keyword in a GitHub Actions workflow?
Which of the following GitHub Actions syntax is used to run multiple commands in a single step?
How can you cache dependencies to speed up workflow execution?
What does the `matrix` keyword do in a GitHub Actions workflow?
Which of the following can be used to limit the number of concurrent jobs running in a GitHub Actions workflow?
What is the default timeout for a GitHub Actions job?
How can you specify the operating system for a job in GitHub Actions?
In a GitHub Actions workflow, how do you specify a specific version of Node.js to use in a job?
How do you reference a secret stored in GitHub Secrets in a workflow?
What is the default shell used by GitHub Actions on Windows runners?
Which of the following statements are true about adding a self-hosted runner in GitHub Actions? (Choose three.)
Select the default environment variable that contains the operating system of the runner executing the job
How does the `actions/cache` action in GitHub Actions handle a cache miss?
How can you specify the schedule of a GitHub actions workflow to run on weekdays only?
What is the recommended approach for storing secrets larger than 48 KB?
Select status check functions in GitHub Actions
How do you ensure that `Upload Failure test report` step is executed only if `Run Tests` step fails?
Which context holds information about the event that triggered a workflow run?
In GitHub Actions, if you define both branches and paths filter, what is the effect on the workflow execution?
What is the recommended practice for treating environment variables in GitHub Actions, regardless of the operating system and shell used?
Which of the following statements accurately describes the behavior of workflow jobs referencing an environment's protection rules?
What is the purpose of the `restore-keys` parameter in `actions/cache` in GitHub Actions?
Which variable would you set to `true` in order to enable step debug logging?
Which configuration is appropriate for triggering a workflow to run on webhook events related to check_run actions?
What is the purpose of the `timeout-minutes` keyword in a step?
Dave is creating a templated workflow for his organization. Where must Dave store the workflow files and associated metadata files for the templated workflow?
Dave wants to be notified when a comment is created on an issue within a GitHub repository. Which event trigger should be used within the workflow configuration?
What level of access is required on a GitHub repository in order to delete log files from workflow runs?
What is true about the following workflow configuration if triggered against the `octo/my-dev-repo` repository?
How can you access the current values of variables in a matrix within a job in the example below:
What level of permission is required to re-run the workflows
When can you delete workflow runs? (select two)
Who can bypass configured deployment protection rules to force deployment (by default)
How can you skip the following workflow run when you commit or create a PR?
How can you determine if an action is a container action by looking at its action.yml file?
What is the correct syntax for specifying a cleanup script in a container action?
What’s true about default variables? (choose three)
What are the scopes defined for custom variables in a workflow? (choose three)
What must be added to `actions/checkout` if `my-org/my-private-repo` is a private repository differing from the one containing the current workflow?
Given the following configuration, how many jobs will GitHub Actions run when this matrix is evaluated?
At what levels can environment variables be defined ? (Choose three)
How should a dependent job reference the `output1` value produced by a job named `job1` earlier in the same workflow?
Which workflow command syntax correctly sets an environment variable named 'API_VERSION' with the value '2.1' for subsequent steps in a GitHub Actions job?