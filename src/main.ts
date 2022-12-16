import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import labels from "./labels";

async function run() {
  const token = core.getInput("github-token", { required: true });
  const { owner, repo } = context.repo;

  core.setSecret(token);

  const github = getOctokit(token);

  core.debug("Fetching existing labels...");
  const existingLabels = await github.paginate(
    github.rest.issues.listLabelsForRepo,
    { owner, repo }
  );

  core.info(`Found ${existingLabels.length} existing labels`);

  const labelsToAdd = labels.filter(
    (label) => !existingLabels.find((l) => l.name === label.name)
  );

  core.debug(`Adding ${labelsToAdd.length} labels`);

  for (const label of labelsToAdd) {
    core.info(`Adding label ${label.name}`);
    await github.rest.issues.createLabel({
      owner,
      repo,
      ...label,
    });
  }
}

run().catch((error: Error) => core.setFailed(error.message));
