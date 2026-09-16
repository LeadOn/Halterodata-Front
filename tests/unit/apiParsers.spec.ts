import {describe, expect, it} from "vitest";
import {
  parseAthlete,
  parseCompetition,
  parseDetailedCompetition,
  parsePaginatedResult,
} from "~/lib/utils/apiParsers";
import {ApiContractError} from "~/lib/utils/parse";

/** Réponse réelle de `GET /athlete/1` (capturée le 16/09/2026). */
const athleteResponse = {
  id: 1,
  licenceId: 137264,
  fullName: "Bastien BONNAMANT",
  birthDate: "0001-01-01T00:00:00",
  countryCode: "FR",
  currentClub: "ASPTT STRASBOURG",
  lastStats: {
    snatch: 121,
    cj: 154,
    total: 275,
    iwf: 354.52,
    bodyWeight: 78.75,
    serie: "NAT",
    category: "SEN M 79",
  },
  bestStats: {
    snatch: 135,
    cj: 166,
    total: 300,
    iwf: 371.55,
    bodyWeight: null,
    serie: null,
    category: null,
  },
};

/** Réponse réelle de `GET /competition?page=1&size=2`. */
const competitionListResponse = {
  page: 1,
  resultsPerPage: 2,
  total: 10148,
  results: [
    {
      id: 9984,
      scoresheetId: 13944,
      seasonId: 7,
      name: "REU - Chpt Ligue - Saint-pierre",
      gender: 0,
      league: "REUNION",
      type: false,
      date: "2026-08-08T00:00:00",
      state: 0,
    },
  ],
};

describe("parseAthlete", () => {
  it("parse la réponse réelle de l'API", () => {
    const athlete = parseAthlete(athleteResponse);

    expect(athlete.id).toBe(1);
    expect(athlete.fullName).toBe("Bastien BONNAMANT");
    expect(athlete.lastStats?.total).toBe(275);
  });

  it("neutralise la date sentinelle .NET 0001-01-01", () => {
    expect(parseAthlete(athleteResponse).birthDate).toBeNull();
  });

  it("conserve une date de naissance réelle", () => {
    const athlete = parseAthlete({
      ...athleteResponse,
      birthDate: "1996-04-12T00:00:00",
    });

    expect(athlete.birthDate).toBe("1996-04-12T00:00:00");
  });

  it("accepte des statistiques absentes sans planter", () => {
    const athlete = parseAthlete({
      ...athleteResponse,
      lastStats: null,
      bestStats: null,
    });

    expect(athlete.lastStats).toBeNull();
    expect(athlete.bestStats).toBeNull();
  });

  it("normalise les chaînes vides en null", () => {
    const athlete = parseAthlete({...athleteResponse, currentClub: "   "});

    expect(athlete.currentClub).toBeNull();
  });

  it("signale explicitement un identifiant manquant", () => {
    expect(() => parseAthlete({...athleteResponse, id: undefined})).toThrow(
      ApiContractError,
    );
  });

  it("signale une divergence de type avec le chemin fautif", () => {
    expect(() =>
      parseAthlete({...athleteResponse, licenceId: "137264"}),
    ).toThrow(/athlete\.licenceId/);
  });
});

describe("parsePaginatedResult", () => {
  it("parse l'enveloppe réelle de l'API", () => {
    const page = parsePaginatedResult(
      competitionListResponse,
      parseCompetition,
    );

    expect(page.total).toBe(10148);
    expect(page.results).toHaveLength(1);
    expect(page.results[0]?.league).toBe("REUNION");
  });

  it("rejette une enveloppe sans tableau de résultats", () => {
    expect(() =>
      parsePaginatedResult(
        {...competitionListResponse, results: null},
        parseCompetition,
      ),
    ).toThrow(ApiContractError);
  });
});

describe("parseDetailedCompetition", () => {
  it("tolère une compétition sans détails", () => {
    const competition = parseDetailedCompetition({
      ...competitionListResponse.results[0],
      details: null,
    });

    expect(competition.details).toEqual([]);
  });

  it("parse les essais négatifs (échecs) sans les altérer", () => {
    const competition = parseDetailedCompetition({
      ...competitionListResponse.results[0],
      details: [
        {
          club: "CLUB HALTÉRO",
          countryCode: "FR",
          bodyWeight: 47.25,
          snatch1: 31,
          snatch2: 34,
          snatch3: -36,
          bestSnatch: 34,
          cj1: 42,
          cj2: 45,
          cj3: -48,
          bestCj: 45,
          total: 79,
          serie: "MONDE",
          category: "W50 F 48",
          iwf: 127.14,
          athlete: null,
        },
      ],
    });

    expect(competition.details[0]?.snatch3).toBe(-36);
    expect(competition.details[0]?.athlete).toBeNull();
  });
});
