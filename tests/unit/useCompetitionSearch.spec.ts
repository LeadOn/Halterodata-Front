import {mountSuspended} from "@nuxt/test-utils/runtime";
import {flushPromises} from "@vue/test-utils";
import {defineComponent, h} from "vue";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {useCompetitionSearch} from "~/composables/useCompetitionSearch";
import type {CompetitionSearchParams} from "~/lib/api/competitionApi";
import type {CompetitionDto} from "~/lib/types/Competition";
import type {PaginatedResult} from "~/lib/types/PaginatedResult";

function buildCompetition(id: number): CompetitionDto {
  return {
    id,
    scoresheetId: id + 1000,
    seasonId: 7,
    name: `Compétition ${id}`,
    gender: 0,
    league: "REUNION",
    type: false,
    date: "2026-08-08T00:00:00",
    state: 1,
  };
}

/** Enregistre les paramètres reçus pour vérifier ce qui part vers l'API. */
function createFetcher(total = 95) {
  const calls: CompetitionSearchParams[] = [];
  const fetcher = vi.fn(
    async (
      params: CompetitionSearchParams,
    ): Promise<PaginatedResult<CompetitionDto>> => {
      calls.push({...params});
      return {
        page: params.page ?? 1,
        resultsPerPage: params.size ?? 20,
        total,
        results: [buildCompetition(1), buildCompetition(2)],
      };
    },
  );
  return {fetcher, calls};
}

/** Monte le composable dans un composant hôte minimal. */
async function mountComposable(total = 95) {
  const {fetcher, calls} = createFetcher(total);
  let api: Awaited<ReturnType<typeof useCompetitionSearch>> | undefined;

  const host = defineComponent({
    async setup() {
      api = await useCompetitionSearch({
        key: `test-${Math.random()}`,
        fetcher,
      });
      return () => h("div");
    },
  });

  await mountSuspended(host);
  await flushPromises();

  if (!api) throw new Error("composable non initialisé");
  return {api, fetcher, calls};
}

describe("useCompetitionSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("charge la première page avec la taille par défaut", async () => {
    const {api, calls} = await mountComposable();

    expect(calls[0]).toMatchObject({page: 1, size: 20});
    expect(api.competitions.value).toHaveLength(2);
    expect(api.totalItems.value).toBe(95);
  });

  it("calcule le nombre de pages à partir de la réponse", async () => {
    const {api} = await mountComposable(95);

    // 95 éléments / 20 par page = 5 pages
    expect(api.totalPages.value).toBe(5);
  });

  it("recharge en changeant de page", async () => {
    const {api, calls} = await mountComposable();

    api.changePage(3);
    await flushPromises();

    expect(api.currentPage.value).toBe(3);
    expect(calls.at(-1)).toMatchObject({page: 3});
  });

  it("ignore une page hors bornes", async () => {
    const {api, calls} = await mountComposable();
    const callsBefore = calls.length;

    api.changePage(0);
    api.changePage(999);
    await flushPromises();

    expect(api.currentPage.value).toBe(1);
    expect(calls).toHaveLength(callsBefore);
  });

  it("n'appelle pas l'API à chaque frappe, seulement à la validation", async () => {
    const {api, calls} = await mountComposable();
    const callsBefore = calls.length;

    api.searchTerm.value = "REU";
    api.searchTerm.value = "REUNION";
    await flushPromises();

    expect(calls).toHaveLength(callsBefore);

    api.search();
    await flushPromises();

    expect(calls.at(-1)).toMatchObject({keywords: "REUNION", page: 1});
  });

  it("revient en première page lors d'une recherche", async () => {
    const {api} = await mountComposable();

    api.changePage(3);
    await flushPromises();

    api.searchTerm.value = "REUNION";
    api.search();
    await flushPromises();

    expect(api.currentPage.value).toBe(1);
  });

  it("vide la recherche et relance l'appel sans mot-clé", async () => {
    const {api, calls} = await mountComposable();

    api.searchTerm.value = "REUNION";
    api.search();
    await flushPromises();

    api.clearSearch();
    await flushPromises();

    expect(api.searchTerm.value).toBe("");
    expect(calls.at(-1)?.keywords).toBe("");
  });

  it("revient en première page en changeant la taille de page", async () => {
    const {api, calls} = await mountComposable();

    api.changePage(3);
    await flushPromises();

    api.setPageSize(50);
    await flushPromises();

    expect(api.currentPage.value).toBe(1);
    expect(calls.at(-1)).toMatchObject({page: 1, size: 50});
  });
});
