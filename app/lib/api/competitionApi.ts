import type {
  CompetitionDetailedDto,
  CompetitionDto,
} from "../types/Competition";
import type {PaginatedResult} from "../types/PaginatedResult";
import {
  parseCompetition,
  parseDetailedCompetition,
  parsePaginatedResult,
} from "../utils/apiParsers";
import {apiRequest} from "./config";

export interface CompetitionSearchParams {
  page?: number;
  size?: number;
  keywords?: string;
}

function toQuery({page = 1, size = 20, keywords}: CompetitionSearchParams) {
  // `keywords` n'est transmis que s'il est renseigné ; l'encodage est délégué
  // à ofetch — une concaténation manuelle casserait sur `&` et `#`.
  const trimmed = keywords?.trim();
  return {page, size, ...(trimmed ? {keywords: trimmed} : {})};
}

function parseCompetitionPage(value: unknown): PaginatedResult<CompetitionDto> {
  return parsePaginatedResult(value, parseCompetition);
}

/** `GET /competition` */
export function getCompetitions(
  params: CompetitionSearchParams = {},
): Promise<PaginatedResult<CompetitionDto>> {
  return apiRequest("/competition", parseCompetitionPage, {
    query: toQuery(params),
  });
}

/** `GET /athlete/{athleteId}/competition` */
export function getCompetitionsByAthleteId(
  athleteId: number,
  params: CompetitionSearchParams = {},
): Promise<PaginatedResult<CompetitionDto>> {
  return apiRequest(`/athlete/${athleteId}/competition`, parseCompetitionPage, {
    query: toQuery(params),
  });
}

/**
 * `GET /competition/{id}`
 *
 * @throws Erreur Nuxt 404 si la compétition n'existe pas.
 */
export function getCompetitionById(
  competitionId: number,
): Promise<CompetitionDetailedDto> {
  return apiRequest(`/competition/${competitionId}`, parseDetailedCompetition);
}
