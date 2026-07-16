# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}

## Setup

Use Node {{ cookiecutter.node_version }} or newer.

```bash
npm install
npm test
npm run build
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
