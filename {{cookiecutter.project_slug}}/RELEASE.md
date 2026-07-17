# Release Checklist

{{ cookiecutter.project_name }} is prepared for npm publication under `{{ cookiecutter.package_name }}`,
with the {{ cookiecutter.license }} license and `{{ cookiecutter.npm_access }}` npm access. Treat the
commands in this file as intentional release steps, not as part of ordinary development.

## Before Publishing

- Confirm the public GitHub repository is `https://github.com/{{ cookiecutter.github_owner }}/{{ cookiecutter.github_repo }}`.
- Confirm the npm package is `{{ cookiecutter.package_name }}` and the npm account or organization
  can publish that package name or scope.
- For unscoped packages, confirm the package name is not already taken on npm.
- Confirm the version in `package.json` is the version to publish.
- Confirm `LICENSE`, `README.md`, package metadata, and repository links are current.
- Confirm npm provenance is desired for the GitHub Actions publish workflow.

## Local Verification

Run the full local release check:

```bash
npm run release:check
```

This type-checks, runs tests, builds `dist`, and verifies the package dry-run includes the library
entry points, declaration files, README, license, and executable `{{ cookiecutter.cli_name }}` binary.

To inspect the package contents manually:

```bash
npm run pack:dry
```

## First-Time npm Publishing

npm trusted publishing can require the package to exist before a trusted-publisher relationship can
be created. For a brand-new package, create the first version manually, then authorize GitHub Actions
for future releases.

1. Log in to npm with browser-based 2FA:

   ```bash
   npm login --auth-type=web --registry=https://registry.npmjs.org
   ```

2. Publish the first version from the local checkout:

   ```bash
   npm publish --access {{ cookiecutter.npm_access }} --provenance=false
   ```

   Local npm publish cannot generate GitHub Actions provenance. CI releases use provenance after the
   trusted publisher is configured.

3. Verify npm can see and install the package:

   ```bash
   npm view {{ cookiecutter.package_name }} name version dist-tags.latest
   tmpdir="$(mktemp -d)"
   cd "$tmpdir"
   npm init -y
   npm install {{ cookiecutter.package_name }}@latest
   ```

4. Authorize this repository as an npm trusted publisher:

   ```bash
   npm install -g npm@latest
   npm trust github {{ cookiecutter.package_name }} \
     --repo {{ cookiecutter.github_owner }}/{{ cookiecutter.github_repo }} \
     --file publish.yml \
     --allow-publish \
     --yes
   ```

   If npm asks for browser authentication, open the printed URL and complete 2FA. If an agent is
   driving the terminal, ask the user to complete the browser step before continuing.

## Publishing from GitHub Actions

Do not publish from routine CI. The GitHub Actions publish workflow is manual-only and requires the
operator to type the package name before it can publish.

To publish through GitHub Actions, run the "Publish to npm" workflow on `main` and enter:

```text
{{ cookiecutter.package_name }}
```

The workflow bumps `package.json` and `package-lock.json` to the next unused patch version when the
committed version already exists on npm or already has a git tag, runs `npm run release:check`,
commits and tags that release version, publishes with `--access {{ cookiecutter.npm_access }}` and
provenance, and pushes the release commit and tag.

The trusted publisher configuration must match:

- Package: `{{ cookiecutter.package_name }}`
- Repository: `{{ cookiecutter.github_owner }}/{{ cookiecutter.github_repo }}`
- Workflow filename: `publish.yml`
- Allowed action: `npm publish`
