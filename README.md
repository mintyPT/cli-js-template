# CLI JS Template

Cookiecutter template for creating TypeScript CLI packages with a small library API.

## Use

```bash
cookiecutter gh:mintyPT/cli-js-template
cd my-cli
npm install
npm test
npm run build
```

Generated projects include:

- TypeScript configured for ESM
- Commander-based CLI entry point
- tsup build output with declarations
- Vitest tests
- npm package dry-run verification
- GitHub Actions for CI and npm publish

## Template Variables

- `project_name`: Human-readable project name.
- `project_slug`: Folder and default repository name.
- `package_name`: npm package name, scoped or unscoped.
- `cli_name`: executable command exposed by npm.
- `source_dir`: source folder, defaults to `src`.
- `description`: package description.
- `author_name`: package author.
- `github_owner`: GitHub owner or organization.
- `github_repo`: repository name.
- `license`: package license.
- `node_version`: minimum Node.js major version.
- `npm_access`: npm publish access mode.
