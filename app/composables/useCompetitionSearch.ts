import type {ComputedRef, Ref, WatchSource} from "vue";
import type {CompetitionSearchParams} from "~/lib/api/competitionApi";
import type {CompetitionDto} from "~/lib/types/Competition";
import type {PaginatedResult} from "~/lib/types/PaginatedResult";

export interface UseCompetitionSearchOptions {
  /** Clé `useAsyncData`. Fonction si elle dépend d'une source réactive. */
  key: string | (() => string);
  /** Appel API à exécuter. Provient toujours de `lib/api/competitionApi`. */
  fetcher: (
    params: CompetitionSearchParams,
  ) => Promise<PaginatedResult<CompetitionDto>>;
  /** Sources réactives supplémentaires déclenchant un rechargement. */
  watchSources?: WatchSource[];
  pageSize?: number;
}

export interface UseCompetitionSearch {
  competitions: ComputedRef<CompetitionDto[]>;
  totalItems: ComputedRef<number>;
  totalPages: ComputedRef<number>;
  currentPage: Ref<number>;
  pageSize: Ref<number>;
  /** Champ de saisie, lié en `v-model`. */
  searchTerm: Ref<string>;
  loading: ComputedRef<boolean>;
  error: Ref<Error | undefined>;
  /** Valide la saisie courante et relance la recherche en première page. */
  search: () => void;
  clearSearch: () => void;
  setPageSize: (size: number) => void;
  changePage: (page: number) => void;
  refresh: () => Promise<void>;
}

/**
 * Recherche paginée de compétitions.
 *
 * Mutualise la pagination, la recherche et le chargement SSR entre la page
 * d'accueil et la page athlète.
 */
export async function useCompetitionSearch(
  options: UseCompetitionSearchOptions,
): Promise<UseCompetitionSearch> {
  const currentPage = ref(1);
  const pageSize = ref(options.pageSize ?? 20);
  const searchTerm = ref("");
  /**
   * Terme réellement envoyé à l'API. Distinct de `searchTerm` pour que la
   * frappe au clavier ne déclenche pas un appel réseau par caractère.
   */
  const submittedSearch = ref("");

  const {data, status, error, refresh} = await useAsyncData(
    options.key,
    () =>
      options.fetcher({
        page: currentPage.value,
        size: pageSize.value,
        keywords: submittedSearch.value,
      }),
    {
      watch: [
        currentPage,
        pageSize,
        submittedSearch,
        ...(options.watchSources ?? []),
      ],
    },
  );

  const competitions = computed(() => data.value?.results ?? []);
  const totalItems = computed(() => data.value?.total ?? 0);
  const totalPages = computed(() => {
    const perPage = data.value?.resultsPerPage ?? pageSize.value;
    return perPage > 0 ? Math.ceil(totalItems.value / perPage) : 0;
  });
  const loading = computed(() => status.value === "pending");

  function search(): void {
    currentPage.value = 1;
    submittedSearch.value = searchTerm.value;
  }

  function clearSearch(): void {
    searchTerm.value = "";
    search();
  }

  function setPageSize(size: number): void {
    pageSize.value = Number(size);
    currentPage.value = 1;
  }

  function changePage(page: number): void {
    if (page <= 0 || page > totalPages.value) return;
    currentPage.value = page;
  }

  return {
    competitions,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    searchTerm,
    loading,
    error,
    search,
    clearSearch,
    setPageSize,
    changePage,
    refresh: async () => {
      await refresh();
    },
  };
}
