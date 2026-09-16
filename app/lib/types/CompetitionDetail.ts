import type {AthleteDto} from "./AthleteDto";

/**
 * Ligne de résultat d'un athlète sur une compétition.
 *
 * Les essais (`snatch1`…`cj3`) suivent la convention Scoresheet : valeur
 * positive = essai réussi, négative = essai manqué, 0/`null` = non tenté.
 */
export interface CompetitionDetail {
  club: string | null;
  countryCode: string | null;
  bodyWeight: number | null;
  snatch1: number | null;
  snatch2: number | null;
  snatch3: number | null;
  bestSnatch: number | null;
  cj1: number | null;
  cj2: number | null;
  cj3: number | null;
  bestCj: number | null;
  total: number | null;
  serie: string | null;
  category: string | null;
  iwf: number | null;
  athlete: AthleteDto | null;
}
