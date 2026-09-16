# Instructions de Développement Nuxt 4 - Strict Architecture

> ⚠️ Fichier généré. Ne pas éditer directement : modifier
> `docs/instructions.template.md` puis lancer `npm run docs:sync`.
> Les trois fichiers d'instruction (`CLAUDE.md`, `CURSOR.md`,
> `.github/copilot-instructions.md`) doivent rester strictement identiques.

Tu es un expert Nuxt 4, TypeScript et Tailwind CSS. Tu dois suivre
rigoureusement cette structure de projet pour éviter toute dette technique.

## 0. État des lieux du projet

**Halterodata** est le front-end de consultation des résultats d'haltérophilie
française. Les données proviennent de l'API Halterodata, qui expose les
compétitions issues de Scoresheet (Fédération Française d'haltérophilie).

**Fonctionnalités**

- **Accueil** : athlètes mis en avant, recherche et liste paginée des
  compétitions (~10 000 entrées).
- **Fiche athlète** : meilleures performances et dernières performances
  (arraché, épaulé-jeté, total, IWF), club, catégorie, et historique paginé de
  ses compétitions.
- **Fiche compétition** : résultats détaillés par catégorie et série — les
  trois essais d'arraché et d'épaulé-jeté, réussis ou manqués, avec filtre par
  athlète ou club.

**Pile technique**

Nuxt 4 en rendu serveur (SSR), TypeScript strict, Tailwind CSS v4. Aucune
librairie d'UI ni de validation : les composants et les parseurs sont écrits
dans le projet.

**Architecture en une phrase.** Les pages ne parlent jamais au réseau
directement : elles passent par un composable ou par `lib/api/`, qui valide
toute réponse avant de la rendre disponible.

**Contraintes connues de l'API**

- Le contrat OpenAPI publié est inexact : il déclare `GET /Competition` comme
  renvoyant un objet unique alors qu'il renvoie une enveloppe paginée
  `{page, resultsPerPage, total, results}`. **Les parseurs de
  `lib/utils/apiParsers.ts` font foi côté front**, pas le swagger.
- L'API n'expose aucun paramètre de tri : les listes suivent l'ordre imposé par
  le serveur. Ne pas réintroduire de tri côté client, qui ne porterait que sur
  la page courante et donnerait un résultat faux.
- Certaines dates sont à la sentinelle .NET `0001-01-01` (« inconnue ») ;
  `optionalApiDate` les neutralise à la frontière.
- `lastStats` / `bestStats` d'un athlète peuvent être `null`.

**Invariant non négociable.** `main` reste verte. Avant de considérer une tâche
terminée :
`npm run lint && npm run typecheck && npm test && npm run build`.

## 1. Spécificités Nuxt 4

- Tout le code Vue doit être dans `app/`.
- Les composants métier vont dans `app/components/`.
- Les appels API doivent impérativement utiliser les services définis dans
  `lib/api/` qui injectent le token via `config.ts`.

## 2. Structure des Dossiers & Responsabilités

```
app/
├─ app.config.ts              contenu éditorial (athlètes épinglés)
├─ app.vue · error.vue        racine et page d'erreur (404 / 5xx)
├─ layouts/default.vue        en-tête, pied de page, fond
├─ pages/
│  ├─ index.vue               accueil : vedettes + liste des compétitions
│  ├─ athlete/[id].vue        fiche athlète
│  └─ competition/[id].vue    fiche compétition
├─ components/
│  ├─ ui/                     primitives sans logique métier
│  ├─ Athlete/                Card, CardSkeleton
│  └─ Competition/            Header, Table (liste), ResultsTable (détail)
├─ composables/
│  └─ useCompetitionSearch.ts pagination + recherche d'une liste
├─ lib/
│  ├─ api/                    config.ts (client), athleteApi, competitionApi
│  ├─ types/                  interfaces des entrées/sorties API
│  └─ utils/                  parse, apiParsers, competition, pagination
└─ assets/css/main.css        thème Tailwind, police, reset

tests/
├─ unit/                      parseurs, utils, composable
└─ components/                montage de composants
```

- **components/** : Créer un composant dès qu'une UI est réutilisable.
  - **components/ui/** : primitives sans logique métier. Existantes :
    `UiBadge`, `UiPagination`, `UiSearchInput`, `UiPageSizeSelect`,
    `UiLoadingState`, `UiEmptyState`, `UiErrorState`. **Les réutiliser plutôt
    que de recopier des classes Tailwind.**
- **app.config.ts** : contenu éditorial (athlètes épinglés, etc.). Aucune
  donnée métier codée en dur dans un composant.
- **composables/** : Toute logique métier ou état réutilisable doit être ici.
  Deux pages qui partagent un comportement partagent un composable.
- **lib/api/** : Centralisation des appels API.
  - Un fichier `.ts` par famille d'endpoints.
  - Doit hériter d'un fichier `config.ts` (base API + injection du Token).
  - **Aucun `fetch()` natif ni `$fetch` direct hors de cette couche.**
- **lib/types/** : Toutes les définitions TypeScript (Interfaces/Types) pour les
  entrées/sorties de l'API. **Des `interface`/`type`, jamais des `class`.**
- **lib/utils/** : Fonctions utilitaires de manipulation de données (ex: mapping
  de types, formatage de dates, libellés d'énumérations).
- **tests/** : Tests Vitest (`tests/unit/`, `tests/components/`).
- **server/** : À ÉVITER. Ne pas utiliser pour faire du proxy API sauf demande
  explicite et justifiée.

## 3. Standards de Code (TypeScript & Nuxt)

**Accès aux données — le circuit imposé :**

```
page  →  composables/useCompetitionSearch  →  lib/api/*.ts
                                           →  lib/api/config.ts (apiRequest)
                                           →  lib/utils/apiParsers.ts (validation)
                                           →  lib/types/*.ts (interfaces)
```

Une liste paginée et cherchable de compétitions passe **toujours** par
`useCompetitionSearch` : ne pas réimplémenter l'état de pagination dans une
page.

- Utiliser uniquement `<script setup lang="ts">`.
- Typage strict obligatoire : aucun `any` (règle ESLint bloquante). Utiliser les
  types définis dans `lib/types/`.
- **Ne pas utiliser `as` pour typer une réponse API** : un cast n'est pas une
  validation. La donnée entrante est validée à la frontière.
- Utiliser les fonctions de données natives de Nuxt (`useFetch`,
  `useAsyncData`) en priorité. `onMounted` + `ref` pour charger des données est
  un anti-pattern (pas de SSR, pas de SEO).
- Les erreurs ne se terminent pas en `console.error` : remonter un
  `createError` ou un état d'erreur affiché à l'utilisateur.
- Un composant a une racine unique (fallthrough d'attributs, pas de commentaire
  en racine de template).

## 4. Styling (Tailwind CSS)

- Utiliser **uniquement** Tailwind CSS.
- Interdiction d'utiliser des blocs `<style>` (scoped ou non) dans les fichiers
  `.vue` — règle ESLint bloquante.
- Pas de bibliothèques de CSS-in-JS ou de préprocesseurs (Sass/Less).
- Le formatage (dont l'ordre des classes Tailwind) est géré par Prettier.

## 5. Outillage qualité

| Commande                           | Rôle                                               |
| ---------------------------------- | -------------------------------------------------- |
| `npm run lint` / `lint:fix`        | ESLint (config Nuxt + règles projet)               |
| `npm run format` / `format:check`  | Prettier (+ tri des classes Tailwind)              |
| `npm run typecheck`                | `vue-tsc` en mode strict                           |
| `npm test` / `test:watch`          | Vitest (environnement Nuxt)                        |
| `npm run docs:sync` / `docs:check` | Synchronise / vérifie les 3 fichiers d'instruction |

La CI (`.github/workflows/ci.yml`) rejoue cette chaîne plus le build sur chaque
PR. Version de Node : voir `.nvmrc`.

## 6. Workflow de Modification

Avant de générer du code, vérifie :

1. Si le composant UI existe déjà dans `components/ui/`.
2. Si le type de donnée est présent dans `lib/types/`.
3. Si l'appel API est correctement instancié dans `lib/api/` via la config de
   base.
4. Si la logique existe déjà dans un `composable` ou dans `lib/utils/`.
5. Si le changement affecte la structure, le modèle de données ou les
   conventions — auquel cas mettre à jour `docs/instructions.template.md`.

## 7. Ce qu'il ne faut JAMAIS faire (Anti-Vibecoding)

- Ne pas inventer de nouvelles structures de dossiers.
- Ne pas importer de librairies externes sans validation.
- Ne pas dupliquer de la logique de calcul dans les templates (extraire en
  composable ou utils).
- Ne pas copier-coller une fonction d'un fichier à l'autre : l'extraire.
- Ne pas laisser de code mort « au cas où » : le supprimer, git s'en souvient.

## 8. Maintenance de ce fichier (synchronisation)

Ce fichier est **généré** à partir de `docs/instructions.template.md`. Il doit
rester strictement identique à {{OTHER_FILES}}.

**À chaque modification importante du projet** (structure de dossiers, modèle de
données, conventions de code) :

1. Modifier `docs/instructions.template.md` (jamais les fichiers générés).
2. Lancer `npm run docs:sync`.

`npm run docs:check` est joué en CI et échoue si les fichiers ont divergé.
