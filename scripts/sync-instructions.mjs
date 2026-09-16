#!/usr/bin/env node
/**
 * Génère les trois fichiers d'instruction depuis une source unique.
 *
 *   node scripts/sync-instructions.mjs          # écrit les fichiers
 *   node scripts/sync-instructions.mjs --check  # échoue s'ils ont divergé
 *
 * Applique mécaniquement la règle §8 des instructions : les trois fichiers
 * doivent rester identiques (au nom des deux autres fichiers près).
 */
import {readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const template = readFileSync(
  resolve(root, "docs/instructions.template.md"),
  "utf8",
);

const targets = ["CLAUDE.md", "CURSOR.md", ".github/copilot-instructions.md"];

function render(target) {
  const others = targets
    .filter((other) => other !== target)
    .map((other) => `\`${other}\``)
    .join(" et ");
  return template.replaceAll("{{OTHER_FILES}}", others);
}

const check = process.argv.includes("--check");
const drifted = [];

for (const target of targets) {
  const path = resolve(root, target);
  const expected = render(target);

  if (check) {
    let actual;
    try {
      actual = readFileSync(path, "utf8");
    } catch {
      drifted.push(`${target} (absent)`);
      continue;
    }
    if (actual !== expected) drifted.push(target);
  } else {
    writeFileSync(path, expected);
    console.log(`✔ ${target}`);
  }
}

if (check) {
  if (drifted.length > 0) {
    console.error(
      `✖ Fichiers d'instruction désynchronisés : ${drifted.join(", ")}\n` +
        `  Lancer \`npm run docs:sync\` après avoir modifié ` +
        `docs/instructions.template.md.`,
    );
    process.exit(1);
  }
  console.log("✔ Fichiers d'instruction synchronisés.");
}
