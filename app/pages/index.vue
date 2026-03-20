<template>
  <div class="mb-8">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-white sm:text-3xl">
        Athlètes vedettes
      </h2>
      <span class="text-sm text-textMuted">Épinglés</span>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <AthleteCardSkeleton
        v-for="skeleton in pinnedAthletesSkeletons"
        v-if="isLoadingPinnedAthletes"
        :key="`pinned-athlete-skeleton-${skeleton}`" />
      <AthleteCard
        v-else
        v-for="athlete in pinnedAthletes"
        :key="athlete.id"
        :athlete="athlete" />
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
          v-model="searchTerms"
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
        v-if="searchTerms"
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
import {getAthleteById as getCompetitions} from "~/lib/api/competitionApi";
import type {AthleteDto} from "~/lib/types/AthleteDto";
import type {CompetitionDto} from "~/lib/types/CompetitionDto";

const pinnedAthletes = ref<AthleteDto[]>([]);
const isLoadingPinnedAthletes = ref(true);
const pinnedAthletesSkeletons = [1, 2];

const competitions = ref<CompetitionDto[]>([]);
const filteredCompetitions = ref<CompetitionDto[]>([]);
const displayedCompetitions = ref<CompetitionDto[]>([]);
const searchTerms = ref("");
const loading = ref(false);

const currentPage = ref<number>(1);
const pageSize = ref<number>(20);
const totalItems = ref<number>(0);
const totalPages = ref<number>(0);

const sortField = ref<string>("date");
const sortOrder = ref<"asc" | "desc">("desc");

onMounted(async () => {
  await Promise.all([getPinnedAthletes(), loadCompetitions()]);
});

async function getPinnedAthletes() {
  try {
    isLoadingPinnedAthletes.value = true;

    const athletes = await Promise.all([
      getAthleteById(4210),
      getAthleteById(1),
    ]);
    const resolvedAthletes = athletes.filter(
      (athlete): athlete is AthleteDto => athlete !== null,
    );

    if (resolvedAthletes.length === 0) {
      console.warn("No pinned athletes received from API.");
      return;
    }

    pinnedAthletes.value = resolvedAthletes;
    console.log("Pinned athletes loaded:", pinnedAthletes.value);
  } catch (error) {
    console.error("Error while loading pinned athletes:", error);
  } finally {
    isLoadingPinnedAthletes.value = false;
  }
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
  searchTerms.value = "";
  currentPage.value = 1;
  await loadCompetitions();
}

async function loadCompetitions(): Promise<void> {
  loading.value = true;

  try {
    const data = await getCompetitions(
      currentPage.value,
      pageSize.value,
      searchTerms.value !== "" ? searchTerms.value : undefined,
    );

    if (!data) return;

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

function formatDate(date?: Date | string): string {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

function getStatusBadgeClass(state: number): string {
  switch (state) {
    case 1:
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case 0:
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-textMuted/20 text-textMuted border-textMuted/30";
  }
}

function getStatusLabel(state: number): string {
  switch (state) {
    case 1:
      return "Terminée";
    case 0:
      return "En cours";
    default:
      return "Inconnu";
  }
}

function getGenderLabel(gender: number): string {
  switch (gender) {
    case 0:
      return "Masculin";
    case 1:
      return "Féminin";
    case 2:
      return "Mixte";
    default:
      return "N/A";
  }
}

function getTypeLabel(type: boolean): string {
  return type ? "En équipe" : "Individuelle";
}

function getPagesArray(): number[] {
  return Array.from({length: totalPages.value}, (_, i) => i);
}

function getVisiblePages(): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    return Array.from({length: total}, (_, i) => i + 1);
  }

  pages.push(1);

  if (current <= 3) {
    for (let i = 2; i <= 5; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(total);
  } else if (current >= total - 3) {
    pages.push("ellipsis");
    for (let i = total - 4; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push("ellipsis");
    for (let i = current - 1; i <= current + 1; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(total);
  }

  return pages;
}

function getEndIndex(): number {
  return Math.min(currentPage.value * pageSize.value, totalItems.value);
}
</script>
