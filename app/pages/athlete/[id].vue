<template>
  <div class="mb-8">
    <AthleteCard v-if="athlete" :athlete="athlete" />
    <div
      v-else
      class="relative overflow-hidden rounded-2xl border border-cardBg/50 bg-linear-to-br from-footerBg/90 to-gradientDark/90 shadow-2xl backdrop-blur-xl">
      <div class="relative p-8">
        <div class="space-y-4">
          <div class="h-10 w-1/2 animate-pulse rounded-lg bg-cardBg/30"></div>
          <div class="h-6 w-1/3 animate-pulse rounded-lg bg-cardBg/30"></div>
          <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div
              v-for="i in [1, 2, 3, 4]"
              :key="i"
              class="h-24 animate-pulse rounded-xl bg-cardBg/30"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="mb-6 rounded-2xl border border-cardBg/50 bg-footerBg/80 p-6 shadow-2xl backdrop-blur-xl sm:mb-8">
    <div class="mb-6">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            class="h-5 w-5 text-textMuted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          @keyup.enter="loadCompetitions()"
          placeholder="Rechercher une compétition, une ligue..."
          class="block w-full rounded-xl border-2 border-cardBg bg-gradientDark/60 py-4 pr-32 pl-12 text-base text-white placeholder-textMuted/40 shadow-inner transition-all duration-200 focus:border-accentBlue focus:bg-gradientDark/80 focus:ring-4 focus:ring-accentBlue/20 focus:outline-none" />
        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            @click="loadCompetitions()"
            class="rounded-lg bg-accentBlue px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-accentBlue/90 hover:shadow-xl active:scale-95">
            Rechercher
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-4 border-t border-cardBg/30 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-textMuted">Affichage:</span>
        <select
          v-model.number="pageSize"
          @change="onPageSizeChange(pageSize)"
          class="rounded-lg border border-cardBg bg-gradientDark/60 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all focus:border-accentBlue focus:ring-2 focus:ring-accentBlue/20 focus:outline-none">
          <option :value="5">5 par page</option>
          <option :value="10">10 par page</option>
          <option :value="20">20 par page</option>
          <option :value="50">50 par page</option>
        </select>
      </div>
      <button
        v-if="searchTerm"
        @click="clearSearch"
        class="flex items-center gap-2 rounded-lg border border-cardBg bg-gradientDark/40 px-4 py-2 text-sm font-medium text-textMuted transition-all hover:border-textMuted/50 hover:bg-gradientDark/60">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
        Effacer
      </button>
    </div>
  </div>

  <CompetitionTable
    :competitions="competitions"
    :loading="loading"
    :current-page="currentPage"
    :page-size="pageSize"
    :total-items="totalItems"
    :total-pages="totalPages"
    :sort-field="sortField"
    :sort-order="sortOrder"
    @page-change="changePage"
    @sort-change="sortBy" />
</template>

<script setup lang="ts">
import {getAthleteById} from "~/lib/api/athleteApi";
import {getCompetitionsByAthleteId} from "~/lib/api/competitionApi";
import type {AthleteDto} from "~/lib/types/AthleteDto";
import type {CompetitionDto} from "~/lib/types/CompetitionDto";

const route = useRoute();

const athlete = ref<AthleteDto | null>(null);
const competitions = ref<CompetitionDto[]>([]);
const loading = ref(false);
const searchTerm = ref("");

const currentPage = ref(1);
const pageSize = ref(20);
const totalItems = ref(0);
const totalPages = ref(0);

const sortField = ref<string>("date");
const sortOrder = ref<"asc" | "desc">("desc");

const athleteId = computed(() => {
  const rawId = route.params.id;
  const value = Array.isArray(rawId) ? rawId[0] : rawId;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
});

onMounted(async () => {
  await Promise.all([getAthlete(), loadCompetitions()]);
});

async function getAthlete(): Promise<void> {
  if (!athleteId.value) return;

  try {
    athlete.value = await getAthleteById(athleteId.value);
  } catch (error) {
    console.error("Error fetching athlete data:", error);
  }
}

async function loadCompetitions(): Promise<void> {
  if (!athleteId.value) return;

  loading.value = true;

  try {
    const data = await getCompetitionsByAthleteId(
      athleteId.value,
      currentPage.value,
      pageSize.value,
      searchTerm.value !== "" ? searchTerm.value : undefined,
    );

    if (!data) {
      competitions.value = [];
      totalItems.value = 0;
      totalPages.value = 0;
      return;
    }

    currentPage.value = data.page;
    pageSize.value = data.resultsPerPage;
    totalItems.value = data.total;
    totalPages.value = Math.ceil(data.total / data.resultsPerPage);
    competitions.value = data.results;
    sortCompetitions();
  } catch (error) {
    console.error("Error fetching competitions:", error);
  } finally {
    loading.value = false;
  }
}

function sortCompetitions(): void {
  competitions.value.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField.value) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "date":
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case "league":
        aValue = a.league.toLowerCase();
        bValue = b.league.toLowerCase();
        break;
      case "gender":
        aValue = a.gender;
        bValue = b.gender;
        break;
      case "type":
        aValue = a.type ? 1 : 0;
        bValue = b.type ? 1 : 0;
        break;
      case "state":
        aValue = a.state;
        bValue = b.state;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortOrder.value === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortOrder.value === "asc" ? 1 : -1;
    }

    return 0;
  });
}

function sortBy(field: string): void {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
  sortCompetitions();
}

async function changePage(page: number): Promise<void> {
  if (page <= 0 || page > totalPages.value) return;
  currentPage.value = page;
  await loadCompetitions();
}

async function onPageSizeChange(newPageSize: number): Promise<void> {
  pageSize.value = newPageSize;
  currentPage.value = 1;
  await loadCompetitions();
}

async function clearSearch(): Promise<void> {
  searchTerm.value = "";
  currentPage.value = 1;
  await loadCompetitions();
}
</script>
