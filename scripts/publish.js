import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const packageJsonPath = new URL("../package.json", import.meta.url);

const original = readFileSync(packageJsonPath, "utf-8");
const pkg = JSON.parse(original);

delete pkg.scripts;
delete pkg.devDependencies;

try {
  writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + "\n");
  execSync("npx changeset publish", { stdio: "inherit" });
} finally {
  writeFileSync(packageJsonPath, original);
}
