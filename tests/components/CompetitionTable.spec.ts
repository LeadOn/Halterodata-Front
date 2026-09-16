import {mountSuspended} from "@nuxt/test-utils/runtime";
import {describe, expect, it} from "vitest";
import Table from "~/components/Competition/Table.vue";
import type {CompetitionDto} from "~/lib/types/Competition";

function buildCompetition(
  overrides: Partial<CompetitionDto> = {},
): CompetitionDto {
  return {
    id: 9986,
    scoresheetId: 13946,
    seasonId: 7,
    name: "HDF - Championnats d'Europe Masters",
    gender: 1,
    league: "HAUTS-DE-FRANCE",
    type: false,
    date: "2026-07-28T00:00:00",
    state: 1,
    ...overrides,
  };
}

describe("CompetitionTable", () => {
  it("affiche l'état de chargement", async () => {
    const component = await mountSuspended(Table, {props: {loading: true}});

    expect(component.text()).toContain("Chargement des compétitions");
  });

  it("affiche l'état vide quand il n'y a aucun résultat", async () => {
    const component = await mountSuspended(Table, {
      props: {loading: false, competitions: []},
    });

    expect(component.text()).toContain("Aucune compétition trouvée");
  });

  it("rend les libellés métier plutôt que les codes bruts", async () => {
    const component = await mountSuspended(Table, {
      props: {competitions: [buildCompetition()], totalPages: 1},
    });

    const text = component.text();
    expect(text).toContain("Terminée");
    expect(text).toContain("Féminin");
    expect(text).toContain("Individuelle");
    expect(text).not.toContain("undefined");
  });

  it("pointe vers la fiche de la compétition", async () => {
    const component = await mountSuspended(Table, {
      props: {competitions: [buildCompetition({id: 42})], totalPages: 1},
    });

    const links = component.findAll('a[href="/competition/42"]');
    expect(links.length).toBeGreaterThan(0);
  });

  it("masque la pagination quand il n'y a qu'une page", async () => {
    const component = await mountSuspended(Table, {
      props: {competitions: [buildCompetition()], totalPages: 1},
    });

    expect(component.find('[aria-label="Pagination"]').exists()).toBe(false);
  });

  it("relaie le changement de page", async () => {
    const component = await mountSuspended(Table, {
      props: {
        competitions: [buildCompetition()],
        currentPage: 1,
        pageSize: 20,
        totalItems: 40,
        totalPages: 2,
      },
    });

    await component.find('[aria-label="Page suivante"]').trigger("click");

    expect(component.emitted("page-change")?.[0]).toEqual([2]);
  });
});
