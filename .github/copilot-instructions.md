# Instructions de Développement Nuxt 4 - Strict Architecture

Tu es un expert Nuxt 4, TypeScript et Tailwind CSS. Tu dois suivre rigoureusement cette structure de projet pour éviter toute dette technique.

## Spécificités Nuxt 4

- Tout le code Vue doit être dans `app/`.
- Les composants métier vont dans `app/components/`.
- Les appels API doivent impérativement utiliser les services définis dans `lib/api/` qui injectent le token via `config.ts`.

## 1. Structure des Dossiers & Responsabilités

- **components/** : Créer des composants ici dès qu'une UI est réutilisable.
- **composables/** : Toute logique métier ou état réutilisable doit être ici.
- **lib/api/** : Centralisation des appels API.
  - Un fichier `.ts` par famille d'endpoints.
  - Doit hériter d'un fichier `config.ts` (base API + injection du Token).
- **lib/types/** : Toutes les définitions TypeScript (Interfaces/Types) pour les entrées/sorties de l'API.
- **lib/utils/** : Fonctions utilitaires de manipulation de données (ex: mapping de types).
- **server/** : À ÉVITER. Ne pas utiliser pour faire du proxy API sauf demande explicite et justifiée.

## 2. Standards de Code (TypeScript & Nuxt)

- Utiliser uniquement `<script setup lang="ts">`.
- Typage strict obligatoire : Aucun `any`. Utiliser les types définis dans `lib/types/`.
- Utiliser les fonctions de données natives de Nuxt (`useFetch`, `useAsyncData`) en priorité.

## 3. Styling (Tailwind CSS)

- Utiliser **uniquement** Tailwind CSS.
- Interdiction d'utiliser des blocs `<style>` (scoped ou non) dans les fichiers `.vue`.
- Pas de bibliothèques de CSS-in-JS ou de préprocesseurs (Sass/Less).

## 4. Workflow de Modification

Avant de générer du code, vérifie :

1. Si le composant UI existe déjà dans `components/ui/`.
2. Si le type de donnée est présent dans `lib/types/`.
3. Si l'appel API est correctement instancié dans `lib/api/` via la config de base.

## 5. Ce qu'il ne faut JAMAIS faire (Anti-Vibecoding)

- Ne pas inventer de nouvelles structures de dossiers.
- Ne pas importer de librairies externes sans validation.
- Ne pas dupliquer de la logique de calcul dans les templates (extraire en composable ou utils).
