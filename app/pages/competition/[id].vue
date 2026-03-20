<template>
  <!-- En-tête compétition -->
  <div class="mb-8">
    <div
      class="relative overflow-hidden rounded-2xl border border-cardBg/50 bg-linear-to-br from-footerBg/90 to-gradientDark/90 shadow-2xl backdrop-blur-xl">
      <div
        class="absolute inset-0 bg-linear-to-t from-gradientDark via-transparent to-transparent" />
      <div class="relative p-6">
        <div class="mb-4">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-textMuted transition-colors hover:text-white">
            <svg
              class="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux compétitions
          </NuxtLink>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white sm:text-3xl">
            {{ competition?.name || "Compétition" }}
          </h2>
          <div
            class="mt-3 flex flex-wrap items-center gap-3 text-sm text-textMuted">
            <span class="flex items-center gap-1.5">
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formattedCompetitionDate }}
            </span>
            <span class="text-cardBg">•</span>
            <span class="flex items-center gap-1.5">
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {{ competition?.league || "—" }}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span
            :class="[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              competition?.state === 0
                ? 'border-accentBlue/50 bg-accentBlue/20 text-accentBlue'
                : 'border-success/50 bg-success/20 text-success',
            ]">
            {{ competition?.state === 0 ? "En cours" : "Terminé" }}
          </span>

          <span
            :class="[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              competition?.gender === 0
                ? 'border-genderM/50 bg-genderM/20 text-genderM'
                : competition?.gender === 1
                  ? 'border-genderF/50 bg-genderF/20 text-genderF'
                  : 'border-genderMix/50 bg-genderMix/20 text-genderMix',
            ]">
            {{
              competition?.gender === 0
                ? "Masculin"
                : competition?.gender === 1
                  ? "Féminin"
                  : "Mixte"
            }}
          </span>

          <span
            :class="[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              competition?.type
                ? 'border-typeTeam/50 bg-typeTeam/20 text-typeTeam'
                : 'border-typeInd/50 bg-typeInd/20 text-typeInd',
            ]">
            {{ competition?.type ? "En équipe" : "Individuelle" }}
          </span>

          <span
            v-if="competition?.details?.length"
            class="rounded-full border border-cardBg/50 bg-cardBg/20 px-3 py-1 text-xs font-semibold text-textMuted">
            {{ competition.details.length }} participants
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Champ de recherche -->
  <div
    class="mb-6 rounded-2xl border border-cardBg/50 bg-footerBg/80 p-4 shadow-xl backdrop-blur-xl sm:p-5">
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
        @keyup.enter="loadEntries(1)"
        placeholder="Rechercher un athlète, un club..."
        class="block w-full rounded-xl border-2 border-cardBg bg-gradientDark/60 py-3.5 pr-28 pl-12 text-sm text-white placeholder-textMuted/40 transition-all duration-200 focus:border-accentBlue focus:bg-gradientDark/80 focus:ring-4 focus:ring-accentBlue/20 focus:outline-none" />
      <div class="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
        <button
          v-if="searchTerm"
          @click="clearSearch"
          class="rounded-lg px-3 py-2 text-xs font-medium text-textMuted transition-all hover:text-white">
          Effacer
        </button>
        <button
          @click="loadEntries(1)"
          class="rounded-lg bg-accentBlue px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-accentBlue/90 active:scale-95">
          Filtrer
        </button>
      </div>
    </div>
  </div>

  <!-- Tableau des résultats -->
  <div
    class="overflow-hidden rounded-2xl border border-cardBg/50 bg-gradientDark/40 shadow-xl">
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div
          class="h-10 w-10 animate-spin rounded-full border-4 border-accentBlue border-t-transparent"></div>
        <p class="text-sm text-textMuted">Chargement des résultats...</p>
      </div>
    </div>

    <div
      v-else-if="displayedDetails.length === 0"
      class="flex h-64 items-center justify-center">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-textMuted/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="mt-3 text-base font-medium text-white">
          Aucun résultat trouvé
        </p>
        <p class="mt-1 text-sm text-textMuted">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    </div>

    <template v-else>
      <div class="overflow-x-auto">
        <table class="w-full min-w-215">
          <thead>
            <!-- Ligne de colonnes principales -->
            <tr class="border-b border-cardBg bg-gradientDark/30">
              <th
                class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-textMuted"
                rowspan="2">
                Athlète
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-textMuted"
                rowspan="2">
                Club
              </th>
              <th
                class="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-textMuted"
                rowspan="2">
                Année
              </th>
              <th
                class="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-textMuted"
                rowspan="2">
                Poids
              </th>
              <th
                colspan="4"
                class="border-l border-cardBg/30 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-accentBlue/70">
                Arraché
              </th>
              <th
                colspan="4"
                class="border-l border-cardBg/30 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-accentBlue/70">
                Épaulé-Jeté
              </th>
              <th
                class="border-l border-cardBg/30 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-accentBlue"
                rowspan="2">
                Total
              </th>
              <th
                class="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-textMuted/60"
                rowspan="2">
                IWF
              </th>
            </tr>
            <!-- Sous-en-têtes tentatives -->
            <tr
              class="border-b border-cardBg/30 bg-gradientDark/20 text-xs text-textMuted/50">
              <th
                class="border-l border-cardBg/30 py-1.5 text-center font-normal">
                1
              </th>
              <th class="py-1.5 text-center font-normal">2</th>
              <th class="py-1.5 text-center font-normal">3</th>
              <th
                class="border-l border-cardBg/30 py-1.5 text-center font-semibold text-textMuted/70">
                Meilleur
              </th>
              <th
                class="border-l border-cardBg/30 py-1.5 text-center font-normal">
                1
              </th>
              <th class="py-1.5 text-center font-normal">2</th>
              <th class="py-1.5 text-center font-normal">3</th>
              <th
                class="border-l border-cardBg/30 py-1.5 text-center font-semibold text-textMuted/70">
                Meilleur
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cardBg/30">
            <template
              v-for="[groupKey, entries] in groupedDetails"
              :key="groupKey">
              <!-- Ligne de groupe catégorie -->
              <tr class="bg-cardBg/20">
                <td colspan="14" class="px-4 py-2">
                  <span
                    class="text-xs font-bold uppercase tracking-wider text-accentBlue/80">
                    {{ groupKey }}
                  </span>
                </td>
              </tr>
              <!-- Lignes athlètes -->
              <tr
                v-for="(entry, index) in entries"
                :key="trackById(index, entry)"
                class="transition-colors hover:bg-gradientDark/50">
                <td class="px-4 py-3">
                  <div class="flex flex-col">
                    <NuxtLink
                      :to="
                        entry.athlete?.id ? `/athlete/${entry.athlete.id}` : '#'
                      "
                      class="text-sm font-semibold text-white transition-colors hover:text-accentBlue">
                      {{ entry.athlete?.fullName || "—" }}
                    </NuxtLink>
                    <span class="text-xs text-textMuted/50">{{
                      entry.athlete?.licenceId || ""
                    }}</span>
                  </div>
                </td>
                <td class="px-3 py-3 text-sm text-textMuted">
                  {{ entry.club || "—" }}
                </td>
                <td class="px-3 py-3 text-center text-sm text-textMuted">
                  {{ getYear(entry) || "—" }}
                </td>
                <td
                  class="px-3 py-3 text-center text-sm font-medium text-white">
                  {{
                    entry.bodyWeight != null ? `${entry.bodyWeight} kg` : "—"
                  }}
                </td>
                <td
                  :class="[
                    'border-l border-cardBg/30 px-3 py-3 text-center text-sm font-medium',
                    getAttemptClass(entry.snatch1),
                  ]">
                  {{ getAttemptDisplay(entry.snatch1) }}
                </td>
                <td
                  :class="[
                    'px-3 py-3 text-center text-sm font-medium',
                    getAttemptClass(entry.snatch2),
                  ]">
                  {{ getAttemptDisplay(entry.snatch2) }}
                </td>
                <td
                  :class="[
                    'px-3 py-3 text-center text-sm font-medium',
                    getAttemptClass(entry.snatch3),
                  ]">
                  {{ getAttemptDisplay(entry.snatch3) }}
                </td>
                <td
                  class="border-l border-cardBg/30 px-3 py-3 text-center text-sm font-bold text-white">
                  {{
                    entry.bestSnatch != null && entry.bestSnatch > 0
                      ? entry.bestSnatch
                      : "—"
                  }}
                </td>
                <td
                  :class="[
                    'border-l border-cardBg/30 px-3 py-3 text-center text-sm font-medium',
                    getAttemptClass(entry.cj1),
                  ]">
                  {{ getAttemptDisplay(entry.cj1) }}
                </td>
                <td
                  :class="[
                    'px-3 py-3 text-center text-sm font-medium',
                    getAttemptClass(entry.cj2),
                  ]">
                  {{ getAttemptDisplay(entry.cj2) }}
                </td>
                <td
                  :class="[
                    'px-3 py-3 text-center text-sm font-medium',
                    getAttemptClass(entry.cj3),
                  ]">
                  {{ getAttemptDisplay(entry.cj3) }}
                </td>
                <td
                  class="border-l border-cardBg/30 px-3 py-3 text-center text-sm font-bold text-white">
                  {{
                    entry.bestCj != null && entry.bestCj > 0
                      ? entry.bestCj
                      : "—"
                  }}
                </td>
                <td
                  class="border-l border-cardBg/30 px-3 py-3 text-center text-sm font-bold text-accentBlue">
                  {{
                    entry.total != null && entry.total > 0 ? entry.total : "—"
                  }}
                </td>
                <td class="px-3 py-3 text-center text-sm text-textMuted/70">
                  {{ entry.iwf ?? "—" }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex flex-col gap-3 border-t border-cardBg/30 bg-gradientDark/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-center text-xs text-textMuted sm:text-left sm:text-sm">
          Affichage de
          <span class="font-semibold text-white">{{ startItem }}</span>
          à
          <span class="font-semibold text-white">{{ endItem }}</span>
          sur
          <span class="font-semibold text-white">{{ totalItems }}</span>
          participants
        </div>
        <div class="flex items-center justify-center gap-2">
          <button
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)"
            class="flex items-center gap-1.5 rounded-lg border border-accentBlue/30 bg-accentBlue/10 px-3 py-2 text-xs font-semibold text-accentBlue transition-all hover:border-accentBlue/60 hover:bg-accentBlue/20 disabled:cursor-not-allowed disabled:border-cardBg disabled:bg-transparent disabled:text-textMuted/40">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>
          <span
            class="min-w-16 rounded-lg border border-cardBg bg-gradientDark/40 px-3 py-2 text-center text-xs font-semibold text-white">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)"
            class="flex items-center gap-1.5 rounded-lg border border-accentBlue/30 bg-accentBlue/10 px-3 py-2 text-xs font-semibold text-accentBlue transition-all hover:border-accentBlue/60 hover:bg-accentBlue/20 disabled:cursor-not-allowed disabled:border-cardBg disabled:bg-transparent disabled:text-textMuted/40">
            Suivant
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {getCompetitionById} from "~/lib/api/competitionApi";
import type {CompetitionDetail} from "~/lib/types/CompetitionDetail";
import type {CompetitionDto} from "~/lib/types/CompetitionDto";

const route = useRoute();

const competition = ref<CompetitionDto | null>(null);
const loading = ref(false);
const searchTerm = ref("");

const pageSize = ref(50);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(1);

const displayedDetails = ref<CompetitionDetail[]>([]);

const groupedDetails = computed((): [string, CompetitionDetail[]][] => {
  const groups = new Map<string, CompetitionDetail[]>();
  for (const detail of displayedDetails.value) {
    const parts = [detail.category, detail.serie].filter(Boolean);
    const key = parts.length > 0 ? parts.join(" – ") : "Général";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(detail);
  }
  return Array.from(groups.entries());
});

function getAttemptClass(value: number | null | undefined): string {
  if (value == null || value === 0) return "text-textMuted/30";
  return value > 0 ? "text-success" : "text-danger";
}

function getAttemptDisplay(value: number | null | undefined): string {
  if (value == null || value === 0) return "—";
  if (value < 0) return `(${Math.abs(value)})`;
  return String(value);
}

const formattedCompetitionDate = computed(() => {
  const date = competition.value?.date;
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("fr-FR", {dateStyle: "short"}).format(
    parsedDate,
  );
});

const startItem = computed(() => {
  if (totalItems.value === 0) {
    return 0;
  }

  return (currentPage.value - 1) * pageSize.value + 1;
});

const endItem = computed(() => {
  if (totalItems.value === 0) {
    return 0;
  }

  return Math.min(currentPage.value * pageSize.value, totalItems.value);
});

const competitionId = computed<number | null>(() => {
  const rawId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  const parsedId = Number(rawId);

  return Number.isFinite(parsedId) ? parsedId : null;
});

function getAthleteName(detail: CompetitionDetail): string {
  return detail.athlete?.fullName ?? "";
}

function getLicence(detail: CompetitionDetail): string {
  const licenceId = detail.athlete?.licenceId;
  return licenceId ? String(licenceId) : "";
}

function getYear(detail: CompetitionDetail): number | null {
  const birthDate = detail.athlete?.birthDate;
  if (!birthDate) {
    return null;
  }

  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.getFullYear();
}

function loadEntries(page?: number): void {
  if (typeof page === "number") {
    currentPage.value = page;
  }

  loading.value = true;

  let list = [...(competition.value?.details ?? [])];

  const search = searchTerm.value.trim().toLowerCase();
  if (search) {
    list = list.filter((detail) =>
      `${getAthleteName(detail)} ${detail.club ?? ""} ${getLicence(detail)}`
        .toLowerCase()
        .includes(search),
    );
  }

  totalItems.value = list.length;
  totalPages.value = Math.max(1, Math.ceil(totalItems.value / pageSize.value));

  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
  if (currentPage.value < 1) {
    currentPage.value = 1;
  }

  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  displayedDetails.value = list.slice(start, end);

  loading.value = false;
}

function onPageSizeChange(size: number): void {
  pageSize.value = Number(size);
  currentPage.value = 1;
  loadEntries();
}

function clearSearch(): void {
  searchTerm.value = "";
  loadEntries();
}

function changePage(page: number): void {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  currentPage.value = page;
  loadEntries();
}

function trackById(index: number, item: CompetitionDetail): number {
  return item.athlete?.id ?? item.athlete?.licenceId ?? index;
}

function formatScore(value: number | null | undefined): number | string {
  return value ?? "—";
}

async function getCompetition(): Promise<void> {
  if (competitionId.value === null) {
    competition.value = null;
    totalItems.value = 0;
    totalPages.value = 1;
    displayedDetails.value = [];
    return;
  }

  loading.value = true;

  try {
    competition.value = await getCompetitionById(competitionId.value);
    currentPage.value = 1;
    loadEntries();
  } catch (error) {
    console.error("Error fetching competition data:", error);
    competition.value = null;
    totalItems.value = 0;
    totalPages.value = 1;
    displayedDetails.value = [];
    loading.value = false;
  }
}

watch(
  competitionId,
  async () => {
    await getCompetition();
  },
  {immediate: true},
);
</script>
