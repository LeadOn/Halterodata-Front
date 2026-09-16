<script setup lang="ts">
import {getEndIndex, getVisiblePages} from "~/lib/utils/pagination";

const props = withDefaults(
  defineProps<{
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    /** Nom de l'entité paginée, au pluriel (« compétitions », « résultats »). */
    itemLabel?: string;
  }>(),
  {itemLabel: "éléments"},
);

const emit = defineEmits<{"page-change": [page: number]}>();

const startIndex = computed(() =>
  props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1,
);

const endIndex = computed(() =>
  getEndIndex(props.currentPage, props.pageSize, props.totalItems),
);

const visiblePages = computed(() =>
  getVisiblePages(props.currentPage, props.totalPages),
);

const isFirstPage = computed(() => props.currentPage <= 1);
const isLastPage = computed(() => props.currentPage >= props.totalPages);

function changePage(page: number): void {
  if (page <= 0 || page > props.totalPages) return;
  emit("page-change", page);
}

const NAV_BUTTON_CLASS =
  "group border-accentBlue/30 from-accentBlue/15 to-accentBlue/5 text-accentBlue hover:border-accentBlue/60 hover:from-accentBlue/25 hover:to-accentBlue/15 hover:shadow-accentBlue/30 disabled:border-cardBg disabled:bg-gradientDark/40 disabled:text-textMuted/40 relative flex items-center gap-2 rounded-lg border bg-linear-to-br px-3 py-2.5 text-xs font-semibold shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:shadow-none sm:px-4 sm:text-sm";
</script>

<template>
  <nav
    class="border-cardBg bg-gradientDark/20 flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    aria-label="Pagination">
    <p class="text-textMuted text-center text-xs sm:text-left sm:text-sm">
      Affichage de
      <span class="font-semibold text-white">{{ startIndex }}</span>
      à
      <span class="font-semibold text-white">{{ endIndex }}</span>
      sur
      <span class="font-semibold text-white">{{ totalItems }}</span>
      <span class="hidden sm:inline"> {{ itemLabel }}</span>
    </p>

    <div class="flex items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        :disabled="isFirstPage"
        :class="NAV_BUTTON_CLASS"
        aria-label="Page précédente"
        @click="changePage(currentPage - 1)">
        <svg
          class="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
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
          v-for="(item, index) in visiblePages"
          :key="`${item}-${index}`">
          <span
            v-if="item === 'ellipsis'"
            class="text-textMuted px-2"
            aria-hidden="true">
            •••
          </span>
          <button
            v-else
            type="button"
            :class="[
              'bg-gradientDark/40 min-w-10 rounded-lg border px-2.5 py-2 text-xs font-semibold transition-all duration-200 sm:min-w-11 sm:px-3 sm:text-sm',
              item === currentPage
                ? 'bg-accentBlue shadow-accentBlue/40 border-accentBlue/50 text-white'
                : 'border-cardBg text-textMuted hover:bg-accentBlue/20 hover:border-accentBlue/50',
            ]"
            :aria-label="`Page ${item}`"
            :aria-current="item === currentPage ? 'page' : undefined"
            @click="changePage(item)">
            {{ item }}
          </button>
        </template>
      </div>

      <button
        type="button"
        :disabled="isLastPage"
        :class="NAV_BUTTON_CLASS"
        aria-label="Page suivante"
        @click="changePage(currentPage + 1)">
        <span class="hidden sm:inline">Suivant</span>
        <svg
          class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </nav>
</template>
