# action-vpat-labels

> A GitHub Action which creates issue labels for generating a [VPAT report](https://github.com/dequelabs/action-vpat-report)

## Example workflow

```yaml
name: Create VPAT issue labels

on:
  workflow_dispatch: # Manually trigger.
  schedule:
    - cron: "0 0 * * SUN" # Every Sunday at 00:00.

jobs:
  generate_report:
    runs-on: ubuntu-latest
    steps:
      - uses: dequelabs/action-vpat-labels@main
```

## Inputs

| Name           | Description                                                                                                 | Default                |
| -------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------- |
| `github-token` | Optional [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) | `secrets.GITHUB_TOKEN` |

## Developer notes

- make sure `dist/` is checked in after updating files in `src/` (_the precommit hook should do this for you_)
- generate labels by cloning [`action-vpat-report`](https://github.com/dequelabs/action-vpat-report) in `../action-vpat-report`, then running `yarn generate-labels`

## License

Unlicensed, this likely won't work outside of `dequelabs` repositories anyway.
