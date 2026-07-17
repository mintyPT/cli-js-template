# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}

## Setup

Use Node {{ cookiecutter.node_version }} or newer.

```bash
npm install
npm test
npm run build
```

After the package is published:

```bash
npm install {{ cookiecutter.package_name }}
npx {{ cookiecutter.package_name }} greet World
```

## CLI

```bash
npm run dev -- greet World
```

After publishing or linking the package:

```bash
{{ cookiecutter.cli_name }} greet World
```

## Library

```ts
import { createGreeting } from "{{ cookiecutter.package_name }}";

console.log(createGreeting("World"));
```

## Package Release

The npm package is prepared as `{{ cookiecutter.package_name }}` with {{ cookiecutter.license }}
licensing, `{{ cookiecutter.npm_access }}` npm access, provenance-enabled CI publishing, a
`{{ cookiecutter.cli_name }}` binary, ESM library exports, and TypeScript declarations.

Before publishing, run the local release check:

```bash
npm run release:check
```

This runs type-checking, tests, a production build, and a package dry-run verification that checks
the built CLI, library entry points, declaration files, README, and license. To inspect npm's packed
file list without the full check:

```bash
npm run pack:dry
```

Publishing is intentionally manual. See [`RELEASE.md`](./RELEASE.md) for the confirmation checklist,
first-time package creation flow, trusted-publisher setup, and GitHub Actions workflow steps.
