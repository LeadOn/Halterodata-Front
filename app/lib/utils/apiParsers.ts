/**
 * Parseurs des réponses de l'API Halterodata.
 *
 * Un parseur par DTO. Ils constituent la source de vérité du contrat côté
 * front : le contrat OpenAPI publié est inexact, ces
 * fonctions sont alignées sur les réponses réellement observées.
 */
import type {AthleteDto} from "../types/AthleteDto";
import type {
  CompetitionDetailedDto,
  CompetitionDto,
} from "../types/Competition";
import type {CompetitionDetail} from "../types/CompetitionDetail";
import type {PaginatedResult} from "../types/PaginatedResult";
import type {StatRecapDto} from "../types/StatRecapDto";
import {
  optionalApiDate,
  optionalNumber,
  optionalString,
  requireArray,
  requireBoolean,
  requireNumber,
  requireRecord,
} from "./parse";

export function parseStatRecap(value: unknown, path: string): StatRecapDto {
  const raw = requireRecord(value, path);
  return {
    snatch: optionalNumber(raw.snatch, `${path}.snatch`),
    cj: optionalNumber(raw.cj, `${path}.cj`),
    total: optionalNumber(raw.total, `${path}.total`),
    iwf: optionalNumber(raw.iwf, `${path}.iwf`),
    bodyWeight: optionalNumber(raw.bodyWeight, `${path}.bodyWeight`),
    serie: optionalString(raw.serie, `${path}.serie`),
    category: optionalString(raw.category, `${path}.category`),
  };
}

function parseOptionalStatRecap(
  value: unknown,
  path: string,
): StatRecapDto | null {
  return value === null || value === undefined
    ? null
    : parseStatRecap(value, path);
}

export function parseAthlete(value: unknown, path = "athlete"): AthleteDto {
  const raw = requireRecord(value, path);
  return {
    id: requireNumber(raw.id, `${path}.id`),
    licenceId: requireNumber(raw.licenceId, `${path}.licenceId`),
    fullName: optionalString(raw.fullName, `${path}.fullName`),
    birthDate: optionalApiDate(raw.birthDate, `${path}.birthDate`),
    countryCode: optionalString(raw.countryCode, `${path}.countryCode`),
    currentClub: optionalString(raw.currentClub, `${path}.currentClub`),
    lastStats: parseOptionalStatRecap(raw.lastStats, `${path}.lastStats`),
    bestStats: parseOptionalStatRecap(raw.bestStats, `${path}.bestStats`),
  };
}

export function parseCompetition(
  value: unknown,
  path = "competition",
): CompetitionDto {
  const raw = requireRecord(value, path);
  return {
    id: requireNumber(raw.id, `${path}.id`),
    scoresheetId: requireNumber(raw.scoresheetId, `${path}.scoresheetId`),
    seasonId: optionalNumber(raw.seasonId, `${path}.seasonId`),
    name: optionalString(raw.name, `${path}.name`),
    gender: requireNumber(raw.gender, `${path}.gender`),
    league: optionalString(raw.league, `${path}.league`),
    type: requireBoolean(raw.type, `${path}.type`),
    date: optionalApiDate(raw.date, `${path}.date`),
    state: requireNumber(raw.state, `${path}.state`),
  };
}

export function parseCompetitionDetail(
  value: unknown,
  path: string,
): CompetitionDetail {
  const raw = requireRecord(value, path);
  return {
    club: optionalString(raw.club, `${path}.club`),
    countryCode: optionalString(raw.countryCode, `${path}.countryCode`),
    bodyWeight: optionalNumber(raw.bodyWeight, `${path}.bodyWeight`),
    snatch1: optionalNumber(raw.snatch1, `${path}.snatch1`),
    snatch2: optionalNumber(raw.snatch2, `${path}.snatch2`),
    snatch3: optionalNumber(raw.snatch3, `${path}.snatch3`),
    bestSnatch: optionalNumber(raw.bestSnatch, `${path}.bestSnatch`),
    cj1: optionalNumber(raw.cj1, `${path}.cj1`),
    cj2: optionalNumber(raw.cj2, `${path}.cj2`),
    cj3: optionalNumber(raw.cj3, `${path}.cj3`),
    bestCj: optionalNumber(raw.bestCj, `${path}.bestCj`),
    total: optionalNumber(raw.total, `${path}.total`),
    serie: optionalString(raw.serie, `${path}.serie`),
    category: optionalString(raw.category, `${path}.category`),
    iwf: optionalNumber(raw.iwf, `${path}.iwf`),
    athlete:
      raw.athlete === null || raw.athlete === undefined
        ? null
        : parseAthlete(raw.athlete, `${path}.athlete`),
  };
}

export function parseDetailedCompetition(
  value: unknown,
  path = "competition",
): CompetitionDetailedDto {
  const raw = requireRecord(value, path);
  const details =
    raw.details === null || raw.details === undefined
      ? []
      : requireArray(raw.details, `${path}.details`).map((detail, index) =>
          parseCompetitionDetail(detail, `${path}.details[${index}]`),
        );

  return {...parseCompetition(raw, path), details};
}

/** Enveloppe de pagination, paramétrée par le parseur de ses éléments. */
export function parsePaginatedResult<T>(
  value: unknown,
  parseItem: (item: unknown, path: string) => T,
  path = "response",
): PaginatedResult<T> {
  const raw = requireRecord(value, path);
  return {
    page: requireNumber(raw.page, `${path}.page`),
    resultsPerPage: requireNumber(raw.resultsPerPage, `${path}.resultsPerPage`),
    total: requireNumber(raw.total, `${path}.total`),
    results: requireArray(raw.results, `${path}.results`).map((item, index) =>
      parseItem(item, `${path}.results[${index}]`),
    ),
  };
}
