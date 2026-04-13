**Q2. When pulling an image to your local environment, which credentials are needed?**

- Your GitHub username and a Personal Access Token 💪
- The name of the organization and an API Key
- The name of the package and a package key

**Answer:**

- GitHub Packages uses your GitHub username + PAT to authenticate when pulling images.
- `docker login ghcr.io -u USERNAME -p YOUR_PAT`

---

**Q3. How can you authenticate to GitHub Packages from your local development environment?**

- With an API Key
- With my GitHub Credentials (username and password)
- With a Personal Access Token 💪

**Answer:**

- GitHub no longer accepts plain passwords for package authentication. You must use a **PAT** with the appropriate packages scope

---

**memory tip: **

- Both Q2 and Q3 are really the same concept
- GitHub Packages always uses a PAT, never a plain password or API key.

## Create and publish custom GitHub actions

Q3. Which workflow command would set the debug message to This is an error message?

- echo::error::This is an error message💪
- echo error=This is an error message
- echo::error::message=This is an error message
- echo::error::This is an error message::

**Answer**

- GitHub Actions workflow commands use the syntax ::keyword::message. For a debug/error message, the format is:
  echo "::error::This is an error message"
- ::error:: — is the command telling GitHub Actions this is an error-level message
  This is an error message — is the message content
