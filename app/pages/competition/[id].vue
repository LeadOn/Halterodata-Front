<template>
  <div>
    <CompetitionHeader :competition="competition" />

    <div
      class="border-cardBg/50 bg-footerBg/80 mb-6 rounded-2xl border p-4 shadow-xl backdrop-blur-xl sm:p-5">
      <UiSearchInput
        v-model="searchTerm"
        placeholder="Rechercher un athlète, un club..."
        submit-label="Filtrer"
        @submit="applySearch()"
        @clear="clearSearch()" />
    </div>

    <div
      class="border-cardBg/50 bg-gradientDark/40 overflow-hidden rounded-2xl border shadow-xl">
      <UiLoadingState v-if="loading" label="Chargement des résultats..." />

      <UiEmptyState
        v-else-if="displayedDetails.length === 0"
        title="Aucun résultat trouvé"
        description="Essayez de modifier vos critères de recherche" />

      <template v-else>
        <CompetitionResultsTable :grouped-details="groupedDetails" />

        <UiPagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :page-size="pageSize"
          :total-items="totalItems"
          :total-pages="totalPages"
          item-label="participants"
          @page-change="changePage" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getCompetitionById} from "~/lib/api/competitionApi";
import type {CompetitionDetail} from "~/lib/types/CompetitionDetail";
import {truncateForTitle} from "~/lib/utils/competition";

const route = useRoute();

const competitionId = computed(() => {
  const rawId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  const parsed = Number(rawId);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
});

if (competitionId.value === null) {
  throw createError({
    statusCode: 404,
    statusMessage: "Compétition introuvable.",
  });
}

const {
  data: competition,
  status,
  error,
} = await useAsyncData(
  () => `competition-${competitionId.value}`,
  () => getCompetitionById(competitionId.value as number),
  {watch: [competitionId]},
);

if (error.value) {
  throw error.value;
}

const loading = computed(() => status.value === "pending");

useSeoMeta({
  title: () =>
    competition.value?.name
      ? truncateForTitle(competition.value.name)
      : "Compétition",
  description: () => {
    const name = competition.value?.name ?? "Cette compétition";
    const league = competition.value?.league;
    const count = competition.value?.details.length ?? 0;
    return [
      league ? `${name} — ${league}.` : `${name}.`,
      count > 0 ? `${count} participants.` : null,
      "Résultats détaillés : arraché, épaulé-jeté, total.",
    ]
      .filter(Boolean)
      .join(" ");
  },
  ogTitle: () => `${competition.value?.name ?? "Compétition"} — Halterodata`,
});

const searchTerm = ref("");
const pageSize = ref(50);
const currentPage = ref(1);

/** Résultats filtrés par la recherche (le filtrage est local : l'API renvoie
 *  l'intégralité des résultats d'une compétition en une seule réponse). */
const filteredDetails = computed<CompetitionDetail[]>(() => {
  const all = competition.value?.details ?? [];
  const search = searchTerm.value.trim().toLowerCase();
  if (!search) return all;

  return all.filter((detail) =>
    [
      detail.athlete?.fullName ?? "",
      detail.club ?? "",
      detail.athlete?.licenceId ?? "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(search),
  );
});

const totalItems = computed(() => filteredDetails.value.length);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalItems.value / pageSize.value)),
);

const displayedDetails = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredDetails.value.slice(start, start + pageSize.value);
});

const groupedDetails = computed((): [string, CompetitionDetail[]][] => {
  const groups = new Map<string, CompetitionDetail[]>();
  for (const detail of displayedDetails.value) {
    const parts = [detail.category, detail.serie].filter(Boolean);
    const key = parts.length > 0 ? parts.join(" – ") : "Général";
    const group = groups.get(key);
    if (group) {
      group.push(detail);
    } else {
      groups.set(key, [detail]);
    }
  }
  return Array.from(groups.entries());
});

// La pagination doit rester dans les bornes quand le filtre réduit la liste.
watch([totalPages, competitionId], () => {
  if (currentPage.value > totalPages.value)
    currentPage.value = totalPages.value;
  if (currentPage.value < 1) currentPage.value = 1;
});

watch(searchTerm, () => {
  currentPage.value = 1;
});

/** Le filtrage est réactif ; ce handler ne fait que revenir en première page. */
function applySearch(): void {
  currentPage.value = 1;
}

function clearSearch(): void {
  searchTerm.value = "";
  applySearch();
}

function changePage(page: number): void {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}
</script>
