/**
 * Variantes visuelles de `components/ui/Badge.vue`.
 *
 * Déclarées ici plutôt que dans le composant pour que `lib/utils/` puisse
 * les produire (ex. `getStatusVariant`) sans dépendre d'un fichier `.vue`.
 */
export type BadgeVariant =
  "neutral" | "muted" | "accent" | "success" | "unknown";
