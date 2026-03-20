<template>
  <div
    class="overflow-x-hidden rounded-xl bg-footerBg/70 shadow-xl backdrop-blur-lg">
    <div v-if="props.loading" class="flex h-96 items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-accentBlue border-t-transparent"></div>
        <p class="text-textMuted">Chargement des compétitions...</p>
      </div>
    </div>
    <div
      v-else-if="props.competitions.length === 0"
      class="flex h-96 items-center justify-center">
      <div class="text-center">
        <svg
          class="mx-auto h-16 w-16 text-textMuted/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="mt-4 text-lg font-medium text-white">
          Aucune compétition trouvée
        </p>
        <p class="mt-2 text-sm text-textMuted">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    </div>
    <template v-else>
      <div class="block space-y-4 md:hidden">
        <div
          v-for="competition in props.competitions"
          :key="competition.id"
          class="rounded-lg border border-cardBg/50 bg-gradientDark/30 p-4 transition-colors hover:bg-gradientDark/50">
          <div class="mb-3">
            <h3 class="text-base font-semibold text-white">
              {{ competition.name }}
            </h3>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-xs text-textMuted/70">{{
                competition.league
              }}</span>
              <span class="text-xs text-accentBlue"
                >• {{ getTypeLabel(competition.type) }}</span
              >
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <svg
                class="h-4 w-4 text-textMuted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-textMuted">
                {{ formatDate(competition.date) }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center justify-center rounded-full border border-cardBg bg-cardBg/50 px-2 py-1 text-xs font-medium text-textMuted">
                {{ competition.league }}
              </span>
              <span
                :class="[
                  'inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium',
                  getStatusBadgeClass(competition.state),
                ]">
                {{ getStatusLabel(competition.state) }}
              </span>
              <span
                class="inline-flex items-center justify-center rounded-full border border-cardBg/50 bg-cardBg/30 px-2 py-1 text-xs font-medium text-textMuted/70">
                {{ getGenderLabel(competition.gender) }}
              </span>
              <span
                :class="[
                  'inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium',
                  competition.type
                    ? 'bg-accentBlue/20 text-accentBlue border-accentBlue/30'
                    : 'bg-cardBg/30 text-textMuted/70 border-cardBg/50',
                ]">
                {{ getTypeLabel(competition.type) }}
              </span>
            </div>
          </div>
          <div class="mt-3">
            <NuxtLink
              :to="`/competition/${competition.id}`"
              class="w-full rounded-lg bg-accentBlue/20 px-4 py-2 text-sm font-medium text-accentBlue transition-all hover:bg-accentBlue/30 active:scale-95">
              Voir détails
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="hidden overflow-x-auto md:block">
        <table class="w-full min-w-200">
          <thead class="border-b border-cardBg bg-gradientDark/30">
            <tr>
              <th
                @click="sortBy('name')"
                class="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold tracking-wider text-textMuted uppercase transition-colors hover:text-white hover:bg-gradientDark/50 sm:px-6 sm:py-4 sm:text-sm">
                <div class="flex items-center gap-2">
                  Compétition
                  <svg
                    v-if="
                      props.sortField === 'name' && props.sortOrder === 'asc'
                    "
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
                  <svg
                    v-else-if="props.sortField === 'name'"
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </th>
              <th
                @click="sortBy('date')"
                class="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold tracking-wider text-textMuted uppercase transition-colors hover:text-white hover:bg-gradientDark/50 sm:px-6 sm:py-4 sm:text-sm">
                <div class="flex items-center gap-2">
                  Date
                  <svg
                    v-if="
                      props.sortField === 'date' && props.sortOrder === 'asc'
                    "
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
                  <svg
                    v-else-if="props.sortField === 'date'"
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </th>
              <th
                @click="sortBy('league')"
                class="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold tracking-wider text-textMuted uppercase transition-colors hover:text-white hover:bg-gradientDark/50 sm:px-6 sm:py-4 sm:text-sm">
                <div class="flex items-center gap-2">
                  Ligue
                  <svg
                    v-if="
                      props.sortField === 'league' && props.sortOrder === 'asc'
                    "
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
                  <svg
                    v-else-if="props.sortField === 'league'"
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </th>
              <th
                @click="sortBy('gender')"
                class="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold tracking-wider text-textMuted uppercase transition-colors hover:text-white hover:bg-gradientDark/50 sm:px-6 sm:py-4 sm:text-sm">
                <div class="flex items-center gap-2">
                  Genre
                  <svg
                    v-if="
                      props.sortField === 'gender' && props.sortOrder === 'asc'
                    "
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
                  <svg
                    v-else-if="props.sortField === 'gender'"
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </th>
              <th
                @click="sortBy('type')"
                class="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold tracking-wider text-textMuted uppercase transition-colors hover:text-white hover:bg-gradientDark/50 sm:px-6 sm:py-4 sm:text-sm">
                <div class="flex items-center gap-2">
                  Type
                  <svg
                    v-if="
                      props.sortField === 'type' && props.sortOrder === 'asc'
                    "
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
                  <svg
                    v-else-if="props.sortField === 'type'"
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </th>
              <th
                @click="sortBy('state')"
                class="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold tracking-wider text-textMuted uppercase transition-colors hover:text-white hover:bg-gradientDark/50 sm:px-6 sm:py-4 sm:text-sm">
                <div class="flex items-center gap-2">
                  Statut
                  <svg
                    v-if="
                      props.sortField === 'state' && props.sortOrder === 'asc'
                    "
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                  </svg>
                  <svg
                    v-else-if="props.sortField === 'state'"
                    class="h-4 w-4 text-accentBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </th>
              <th
                class="px-4 py-3 text-right text-xs font-semibold tracking-wider text-textMuted uppercase sm:px-6 sm:py-4 sm:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cardBg/50">
            <tr
              v-for="competition in props.competitions"
              :key="competition.id"
              class="transition-colors hover:bg-gradientDark/30">
              <td class="px-4 py-3 sm:px-6 sm:py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-white sm:text-base">{{
                    competition.name
                  }}</span>
                  <div class="mt-1 flex items-center gap-2">
                    <span class="text-xs text-textMuted/70">{{
                      competition.league
                    }}</span>
                    <span class="text-xs text-accentBlue"
                      >• {{ getTypeLabel(competition.type) }}</span
                    >
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 sm:px-6 sm:py-4">
                <div class="flex items-center gap-2 text-xs sm:text-sm">
                  <svg
                    class="h-4 w-4 text-textMuted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-white">
                    {{ formatDate(competition.date) }}
                  </span>
                </div>
              </td>
              <td class="flex justify-center px-4 py-3 sm:px-6 sm:py-4">
                <span
                  class="inline-flex items-center justify-center text-center rounded-full border border-cardBg bg-cardBg/50 px-2 py-1 text-xs font-medium text-textMuted sm:px-3">
                  {{ competition.league }}
                </span>
              </td>
              <td class="px-4 py-3 sm:px-6 sm:py-4">
                <span
                  class="inline-flex items-center justify-center rounded-full border border-cardBg/50 bg-cardBg/30 px-2 py-1 text-xs font-medium text-textMuted/70 sm:px-3">
                  {{ getGenderLabel(competition.gender) }}
                </span>
              </td>
              <td class="px-4 py-3 sm:px-6 sm:py-4">
                <span
                  :class="[
                    'inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium sm:px-3',
                    competition.type
                      ? 'bg-accentBlue/20 text-accentBlue border-accentBlue/30'
                      : 'bg-cardBg/50 text-textMuted border-cardBg',
                  ]">
                  {{ getTypeLabel(competition.type) }}
                </span>
              </td>
              <td class="px-4 py-3 sm:px-6 sm:py-4">
                <span
                  :class="[
                    'inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium sm:px-3',
                    getStatusBadgeClass(competition.state),
                  ]">
                  {{ getStatusLabel(competition.state) }}
                </span>
              </td>
              <td class="px-4 py-3 text-right sm:px-6 sm:py-4">
                <NuxtLink
                  :to="`/competition/${competition.id}`"
                  class="rounded-lg bg-accentBlue/20 px-3 py-1.5 text-xs font-medium text-accentBlue transition-all hover:bg-accentBlue/30 active:scale-95 sm:px-4 sm:py-2 sm:text-sm">
                  Voir détails
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="props.totalPages > 1"
        class="flex flex-col gap-4 border-t border-cardBg bg-gradientDark/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div class="text-center text-xs text-textMuted sm:text-left sm:text-sm">
          <span>
            Affichage de
            <span class="font-semibold text-white">{{
              (props.currentPage - 1) * props.pageSize + 1
            }}</span>

            à
            <span class="font-semibold text-white">{{ getEndIndex() }}</span>
            sur
            <span class="font-semibold text-white">{{ props.totalItems }}</span>
            <span class="hidden sm:inline"> compétitions</span>
          </span>
        </div>
        <div class="flex items-center justify-center gap-2 sm:gap-3">
          <button
            :disabled="props.currentPage <= 1"
            @click="changePage(props.currentPage - 1)"
            class="group relative flex items-center gap-2 rounded-lg border border-accentBlue/30 bg-linear-to-br from-accentBlue/15 to-accentBlue/5 px-3 py-2.5 text-xs font-semibold text-accentBlue shadow-lg transition-all duration-200 hover:border-accentBlue/60 hover:from-accentBlue/25 hover:to-accentBlue/15 hover:shadow-accentBlue/30 disabled:cursor-not-allowed disabled:border-cardBg disabled:bg-gradientDark/40 disabled:text-textMuted/40 disabled:shadow-none disabled:hover:shadow-none sm:px-4 sm:text-sm">
            <svg
              class="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7" />
            </svg>
            <span class="hidden sm:inline">Précédent</span>
          </button>

          <div class="flex items-center gap-1 overflow-x-auto px-2">
            <template
              v-for="(item, index) in getVisiblePages()"
              :key="`${item}-${index}`">
              <span v-if="item === 'ellipsis'" class="px-2 text-textMuted"
                >•••</span
              >
              <button
                v-else
                :class="[
                  item === props.currentPage
                    ? 'bg-accentBlue shadow-accentBlue/40 border-accentBlue/50 text-white'
                    : 'border-cardBg text-textMuted hover:bg-accentBlue/20 hover:border-accentBlue/50',
                ]"
                @click="changePage(item as number)"
                class="min-w-10 rounded-lg border bg-gradientDark/40 px-2.5 py-2 text-xs font-semibold transition-all duration-200 sm:min-w-11 sm:px-3 sm:text-sm">
                {{ item }}
              </button>
            </template>
          </div>

          <button
            :disabled="props.currentPage >= props.totalPages"
            @click="changePage(props.currentPage + 1)"
            class="group relative flex items-center gap-2 rounded-lg border border-accentBlue/30 bg-linear-to-br from-accentBlue/15 to-accentBlue/5 px-3 py-2.5 text-xs font-semibold text-accentBlue shadow-lg transition-all duration-200 hover:border-accentBlue/60 hover:from-accentBlue/25 hover:to-accentBlue/15 hover:shadow-accentBlue/30 disabled:cursor-not-allowed disabled:border-cardBg disabled:bg-gradientDark/40 disabled:text-textMuted/40 disabled:shadow-none disabled:hover:shadow-none sm:px-4 sm:text-sm">
            <span class="hidden sm:inline">Suivant</span>
            <svg
              class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
import type {CompetitionDto} from "~/lib/types/CompetitionDto";

const props = withDefaults(
  defineProps<{
    competitions: CompetitionDto[];
    loading: boolean;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    sortField: string;
    sortOrder: "asc" | "desc";
  }>(),
  {
    competitions: () => [],
    loading: false,
    currentPage: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
    sortField: "date",
    sortOrder: "asc",
  },
);

const emit = defineEmits<{
  "page-change": [page: number];
  "sort-change": [field: string];
}>();

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
    case 1: // Terminée
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case 0: // En cours
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

function sortBy(field: string): void {
  emit("sort-change", field);
}

function changePage(page: number): void {
  if (page <= 0 || page > props.totalPages) return;
  emit("page-change", page);
}

function getVisiblePages(): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const total = props.totalPages;
  const current = props.currentPage;

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
  return Math.min(props.currentPage * props.pageSize, props.totalItems);
}
</script>
