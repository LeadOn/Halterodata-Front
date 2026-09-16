import {mountSuspended} from "@nuxt/test-utils/runtime";
import {describe, expect, it} from "vitest";
import AthleteCard from "~/components/Athlete/Card.vue";
import type {AthleteDto} from "~/lib/types/AthleteDto";
import type {StatRecapDto} from "~/lib/types/StatRecapDto";

function buildStats(overrides: Partial<StatRecapDto> = {}): StatRecapDto {
  return {
    snatch: null,
    cj: null,
    total: null,
    iwf: null,
    bodyWeight: null,
    serie: null,
    category: null,
    ...overrides,
  };
}

function buildAthlete(overrides: Partial<AthleteDto> = {}): AthleteDto {
  return {
    id: 42,
    licenceId: 137264,
    fullName: "Bastien BONNAMANT",
    birthDate: null,
    countryCode: "FR",
    currentClub: "ASPTT STRASBOURG",
    lastStats: buildStats({snatch: 121, cj: 154, total: 275}),
    bestStats: buildStats({snatch: 135, cj: 166, total: 300}),
    ...overrides,
  };
}

describe("AthleteCard", () => {
  it("affiche le nom et le club de l'athlète", async () => {
    const component = await mountSuspended(AthleteCard, {
      props: {athlete: buildAthlete()},
    });

    expect(component.text()).toContain("Bastien BONNAMANT");
    expect(component.text()).toContain("ASPTT STRASBOURG");
  });

  // L'API peut renvoyer lastStats/bestStats à null.
  it("se rend sans statistiques sans planter", async () => {
    const component = await mountSuspended(AthleteCard, {
      props: {athlete: buildAthlete({lastStats: null, bestStats: null})},
    });

    expect(component.text()).toContain("Bastien BONNAMANT");
  });

  it("pointe vers la fiche de l'athlète", async () => {
    const component = await mountSuspended(AthleteCard, {
      props: {athlete: buildAthlete({id: 7})},
    });

    expect(component.find("a").attributes("href")).toBe("/athlete/7");
  });
});
