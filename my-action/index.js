const core = require('@actions/core');

try {
  const name = core.getInput('who-to-greet');

  console.log(`Hello, ${name}!`);

  const time = new Date().toTimeString();
  core.setOutput('greeting-time', time);
} catch (error) {
  core.setFailed(error.message);
}
