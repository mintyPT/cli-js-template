import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["{{ cookiecutter.source_dir }}/index.ts", "{{ cookiecutter.source_dir }}/cli/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  target: "node{{ cookiecutter.node_version }}",
  banner: {
    js: "#!/usr/bin/env node",
  },
});
