import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {describe, expect, it} from "vitest";

const root = resolve(__dirname, "../..");

function read(file: string): string {
  return readFileSync(resolve(root, file), "utf8");
}

/**
 * Les trois fichiers d'instruction sont générés depuis
 * `docs/instructions.template.md` par `npm run docs:sync`. Ils ont déjà
 * divergé par le passé, d'où ce test : une édition manuelle d'un fichier
 * généré, ou un `docs:sync` oublié, devient bloquant.
 */
describe("fichiers d'instruction", () => {
  it("sont strictement identiques", () => {
    const claude = read("CLAUDE.md");
    const cursor = read("CURSOR.md");
    const copilot = read(".github/copilot-instructions.md");

    // Seul le paragraphe listant « les deux autres fichiers » diffère.
    const normalize = (content: string) =>
      content.replace(/rester strictement identique à[\s\S]*?\n\n/u, "");

    expect(normalize(cursor)).toBe(normalize(claude));
    expect(normalize(copilot)).toBe(normalize(claude));
  });

  it("sont à jour vis-à-vis du gabarit", () => {
    const template = read("docs/instructions.template.md");
    const claude = read("CLAUDE.md");

    // Le gabarit ne contient qu'un marqueur à substituer.
    expect(template).toContain("{{OTHER_FILES}}");
    expect(claude).not.toContain("{{OTHER_FILES}}");
    expect(claude.split("\n").length).toBe(template.split("\n").length);
  });
});
