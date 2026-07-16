#!/usr/bin/env node
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const templateRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDir = mkdtempSync(join(tmpdir(), "cli-js-template-"));
const projectDir = join(outputDir, "smoke-cli");
const cookiecutterCommand = (process.env.COOKIECUTTER_COMMAND ?? "cookiecutter").split(" ");

try {
  run(cookiecutterCommand[0], [
    ...cookiecutterCommand.slice(1),
    templateRoot,
    "--no-input",
    "-o",
    outputDir,
    "project_name=Smoke CLI",
    "project_slug=smoke-cli",
    "package_name=smoke-cli",
    "cli_name=smoke-cli",
    "description=Smoke test CLI package.",
    "author_name=Template CI",
    "github_owner=mintyPT",
    "github_repo=smoke-cli",
    "license=MIT",
    "node_version=20",
    "npm_access=public",
  ]);

  assertExists(join(projectDir, "package-lock.json"));

  run("npm", ["ci"], { cwd: projectDir });
  run("npm", ["run", "check"], { cwd: projectDir });
  run("npm", ["run", "build"], { cwd: projectDir });
  run("npm", ["test"], { cwd: projectDir });
  run("npm", ["run", "pack:verify"], { cwd: projectDir });
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? templateRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

function assertExists(path) {
  if (!existsSync(path)) {
    throw new Error(`Expected generated file to exist: ${path}`);
  }
}
