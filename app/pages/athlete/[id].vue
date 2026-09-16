<template>
  <div>
    <div class="mb-8">
      <AthleteCard v-if="athlete" :athlete="athlete" />
      <div
        v-else
        class="border-cardBg/50 from-footerBg/90 to-gradientDark/90 relative overflow-hidden rounded-2xl border bg-linear-to-br shadow-2xl backdrop-blur-xl">
        <div class="relative p-8">
          <div class="space-y-4">
            <div class="bg-cardBg/30 h-10 w-1/2 animate-pulse rounded-lg" />
            <div class="bg-cardBg/30 h-6 w-1/3 animate-pulse rounded-lg" />
            <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div
                v-for="i in [1, 2, 3, 4]"
                :key="i"
                class="bg-cardBg/30 h-24 animate-pulse rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="border-cardBg/50 bg-footerBg/80 mb-6 rounded-2xl border p-6 shadow-2xl backdrop-blur-xl sm:mb-8">
      <UiSearchInput
        v-model="searchTerm"
        placeholder="Rechercher une compétition, une ligue..."
        @submit="search()"
        @clear="clearSearch()">
        <template #filters>
          <UiPageSizeSelect
            :model-value="pageSize"
            @update:model-value="setPageSize" />
        </template>
      </UiSearchInput>
    </div>

    <UiErrorState
      v-if="competitionsError"
      message="Impossible de charger les compétitions de cet athlète."
      @retry="refreshCompetitions()" />

    <CompetitionTable
      :competitions="competitions"
      :loading="loading"
      :current-page="currentPage"
      :page-size="pageSize"
      :total-items="totalItems"
      :total-pages="totalPages"
      @page-change="changePage" />
  </div>
</template>

<script setup lang="ts">
import {getAthleteById} from "~/lib/api/athleteApi";
import {getCompetitionsByAthleteId} from "~/lib/api/competitionApi";
import type {CompetitionSearchParams} from "~/lib/api/competitionApi";

const route = useRoute();

const athleteId = computed(() => {
  const rawId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  const parsed = Number(rawId);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
});

if (athleteId.value === null) {
  throw createError({statusCode: 404, statusMessage: "Athlète introuvable."});
}

const {data: athlete, error: athleteError} = await useAsyncData(
  () => `athlete-${athleteId.value}`,
  () => getAthleteById(athleteId.value as number),
  {watch: [athleteId]},
);

if (athleteError.value) {
  throw athleteError.value;
}

useSeoMeta({
  title: () => athlete.value?.fullName ?? "Athlète",
  description: () => {
    const name = athlete.value?.fullName ?? "Cet athlète";
    const club = athlete.value?.currentClub;
    const best = athlete.value?.bestStats?.total;
    const parts = [
      club ? `${name} — ${club}.` : `${name}.`,
      best ? `Meilleur total : ${best} kg.` : null,
      "Historique des compétitions et performances.",
    ].filter(Boolean);
    return parts.join(" ");
  },
  ogTitle: () => `${athlete.value?.fullName ?? "Athlète"} — Halterodata`,
});

const {
  competitions,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  searchTerm,
  loading,
  error: competitionsError,
  search,
  clearSearch,
  setPageSize,
  changePage,
  refresh: refreshCompetitions,
} = await useCompetitionSearch({
  key: () => `athlete-${athleteId.value}-competitions`,
  fetcher: (params: CompetitionSearchParams) =>
    getCompetitionsByAthleteId(athleteId.value as number, params),
  watchSources: [athleteId],
});
</script>
