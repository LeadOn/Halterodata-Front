<template>
  <div>
    <!-- Section héro -->
    <div class="mb-10 sm:mb-14">
      <h1
        class="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
        Statistiques <span class="text-accentBlue">d'haltérophilie</span
        ><br class="hidden sm:block" />
        française
      </h1>
      <p class="text-textMuted mt-4 max-w-2xl text-base leading-relaxed">
        Explorez les résultats des compétitions et suivez les performances des
        meilleurs athlètes de la fédération.
      </p>
    </div>

    <div class="mb-8">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white sm:text-3xl">
          Athlètes vedettes
        </h2>
        <span class="text-textMuted text-sm">Épinglés</span>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <template v-if="isLoadingPinnedAthletes">
          <AthleteCardSkeleton
            v-for="skeleton in pinnedAthletesSkeletons"
            :key="`pinned-athlete-skeleton-${skeleton}`" />
        </template>
        <template v-else>
          <AthleteCard
            v-for="athlete in pinnedAthletes"
            :key="athlete.id"
            :athlete="athlete" />
        </template>
      </div>
    </div>

    <div
      class="border-cardBg/50 bg-footerBg/80 mb-6 rounded-2xl border p-6 shadow-2xl backdrop-blur-xl sm:mb-8">
      <UiSearchInput
        v-model="searchTerms"
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
      message="Impossible de charger les compétitions."
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
import {getCompetitions} from "~/lib/api/competitionApi";

/** Athlètes mis en avant : définis dans `app.config.ts`, pas ici. */
useSeoMeta({
  title: "Statistiques d'haltérophilie française",
  description:
    "Explorez les résultats des compétitions et suivez les performances des meilleurs athlètes de la Fédération Française d'haltérophilie.",
  ogTitle: "Halterodata — Statistiques d'haltérophilie française",
  ogDescription:
    "Résultats des compétitions et performances des athlètes de la Fédération Française d'haltérophilie.",
});

const {pinnedAthletes: pinnedAthleteConfig} = useAppConfig();

const {data: pinnedAthletes, status: pinnedStatus} = await useAsyncData(
  "pinned-athletes",
  async () => {
    const results = await Promise.allSettled(
      pinnedAthleteConfig.map((pinned) => getAthleteById(pinned.id)),
    );
    // Un athlète épinglé indisponible ne doit pas vider toute la section.
    return results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
  },
);

const isLoadingPinnedAthletes = computed(
  () => pinnedStatus.value === "pending",
);
const pinnedAthletesSkeletons = pinnedAthleteConfig.length;

const {
  competitions,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  searchTerm: searchTerms,
  loading,
  error: competitionsError,
  search,
  clearSearch,
  setPageSize,
  changePage,
  refresh: refreshCompetitions,
} = await useCompetitionSearch({
  key: "competitions",
  fetcher: getCompetitions,
});
</script>
