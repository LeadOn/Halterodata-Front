// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    rules: {
      // Interdiction stricte du `any` (règle CLAUDE.md §2).
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {argsIgnorePattern: "^_", varsIgnorePattern: "^_"},
      ],
      // Les console.* résiduels du POC doivent disparaître au profit d'une
      // vraie gestion d'erreur (createError / états d'erreur UI).
      "no-console": ["warn", {allow: ["warn", "error"]}],
      // Interdiction des blocs <style> dans les .vue (règle CLAUDE.md §3) :
      // tout le styling passe par Tailwind.
      "vue/no-restricted-block": [
        "error",
        {
          element: "style",
          message:
            "Les blocs <style> sont interdits (CLAUDE.md §3) : utiliser Tailwind.",
        },
      ],
      "vue/multi-word-component-names": "off",
      // Prettier est seul propriétaire du formatage : on neutralise les règles
      // ESLint qui entrent en conflit avec lui.
      "vue/html-self-closing": "off",
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    rules: {
      // Outillage CLI : la sortie console est le canal de restitution.
      "no-console": "off",
    },
  },
);
