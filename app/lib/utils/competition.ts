/**
 * Mise en forme des données de compétition : libellés d'énumérations, variantes
 * de badge, dates et essais.
 *
 * Partagées par la page d'accueil, `Competition/Table.vue` et la page
 * compétition — ne pas réécrire ces mappings dans un template.
 */
import type {BadgeVariant} from "../types/Badge";
import {CompetitionGender, CompetitionState} from "../types/Competition";

const PLACEHOLDER = "—";

/** Date d'une compétition au format court français. */
export function formatCompetitionDate(date: string | null): string {
  if (!date) return PLACEHOLDER;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return PLACEHOLDER;

  return new Intl.DateTimeFormat("fr-FR", {dateStyle: "short"}).format(parsed);
}

/** Date d'une compétition au format long (listes et tableaux). */
export function formatListDate(date: string | null): string {
  if (!date) return PLACEHOLDER;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return PLACEHOLDER;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

/**
 * Année de naissance, ou `null` si inconnue.
 *
 * Les parseurs neutralisent déjà la date sentinelle `0001-01-01` renvoyée par
 * l'API.
 */
export function getBirthYear(birthDate: string | null): number | null {
  if (!birthDate) return null;

  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.getFullYear();
}

export function getStatusLabel(state: number): string {
  switch (state) {
    case CompetitionState.Finished:
      return "Terminée";
    case CompetitionState.InProgress:
      return "En cours";
    default:
      return "Inconnu";
  }
}

/** Variante de badge correspondant à l'état d'une compétition. */
export function getStatusVariant(state: number): BadgeVariant {
  switch (state) {
    case CompetitionState.Finished:
      return "success";
    case CompetitionState.InProgress:
      return "accent";
    default:
      return "unknown";
  }
}

/** Variante de badge correspondant au type (équipe / individuelle). */
export function getTypeVariant(type: boolean): BadgeVariant {
  return type ? "accent" : "muted";
}

export function getGenderLabel(gender: number): string {
  switch (gender) {
    case CompetitionGender.Male:
      return "Masculin";
    case CompetitionGender.Female:
      return "Féminin";
    case CompetitionGender.Mixed:
      return "Mixte";
    default:
      return "N/A";
  }
}

export function getTypeLabel(type: boolean): string {
  return type ? "En équipe" : "Individuelle";
}

/**
 * Classe d'affichage d'un essai.
 *
 * Convention Scoresheet : positif = réussi, négatif = manqué, 0/null = non
 * tenté.
 */
export function getAttemptClass(value: number | null): string {
  if (value === null || value === 0) return "text-textMuted/30";
  return value > 0 ? "text-success" : "text-danger";
}

/** Libellé d'un essai : les échecs sont affichés entre parenthèses. */
export function getAttemptDisplay(value: number | null): string {
  if (value === null || value === 0) return PLACEHOLDER;
  if (value < 0) return `(${Math.abs(value)})`;
  return String(value);
}

/**
 * Borne un titre de page pour le SEO.
 *
 * Les moteurs tronquent autour de 60 caractères, et certains noms de
 * compétition renvoyés par l'API dépassent 130 caractères (le nom y est
 * parfois dupliqué). On coupe sur une limite de mot.
 */
export function truncateForTitle(text: string, maxLength = 60): string {
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut;

  return `${base.trimEnd()}…`;
}
