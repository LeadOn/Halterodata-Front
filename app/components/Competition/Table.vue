<script setup lang="ts">
import type {CompetitionDto} from "~/lib/types/Competition";
import {
  formatListDate,
  getGenderLabel,
  getStatusLabel,
  getStatusVariant,
  getTypeLabel,
  getTypeVariant,
} from "~/lib/utils/competition";

withDefaults(
  defineProps<{
    competitions?: CompetitionDto[];
    loading?: boolean;
    currentPage?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
  }>(),
  {
    competitions: () => [],
    loading: false,
    currentPage: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
  },
);

defineEmits<{"page-change": [page: number]}>();

const COLUMNS = [
  "Compétition",
  "Date",
  "Ligue",
  "Genre",
  "Type",
  "Statut",
] as const;

const TH_CLASS =
  "text-textMuted px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase sm:px-6 sm:py-4 sm:text-sm";
const TD_CLASS = "px-4 py-3 sm:px-6 sm:py-4";
const DETAILS_LINK_CLASS =
  "bg-accentBlue/20 text-accentBlue hover:bg-accentBlue/30 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all active:scale-95 sm:px-4 sm:py-2 sm:text-sm";
</script>

<template>
  <div class="bg-footerBg/70 rounded-xl shadow-xl backdrop-blur-lg">
    <UiLoadingState v-if="loading" label="Chargement des compétitions..." />

    <UiEmptyState
      v-else-if="competitions.length === 0"
      title="Aucune compétition trouvée"
      description="Essayez de modifier vos critères de recherche" />

    <template v-else>
      <!-- Mobile : une carte par compétition -->
      <ul class="block space-y-4 p-4 md:hidden">
        <li
          v-for="competition in competitions"
          :key="competition.id"
          class="border-cardBg/50 bg-gradientDark/30 hover:bg-gradientDark/50 rounded-lg border p-4 transition-colors">
          <h3 class="text-base font-semibold text-white">
            {{ competition.name }}
          </h3>
          <p class="text-textMuted mt-2 text-sm">
            {{ formatListDate(competition.date) }}
          </p>

          <div class="mt-3 flex flex-wrap items-center gap-2">
            <UiBadge variant="neutral">{{ competition.league }}</UiBadge>
            <UiBadge :variant="getStatusVariant(competition.state)">
              {{ getStatusLabel(competition.state) }}
            </UiBadge>
            <UiBadge variant="muted">
              {{ getGenderLabel(competition.gender) }}
            </UiBadge>
            <UiBadge :variant="getTypeVariant(competition.type)">
              {{ getTypeLabel(competition.type) }}
            </UiBadge>
          </div>

          <NuxtLink
            :to="`/competition/${competition.id}`"
            :class="['mt-4 inline-block', DETAILS_LINK_CLASS]">
            Voir détails
          </NuxtLink>
        </li>
      </ul>

      <!-- Desktop : un tableau, une valeur par cellule -->
      <div class="hidden overflow-x-auto md:block">
        <table class="w-full min-w-200">
          <thead class="border-cardBg bg-gradientDark/30 border-b">
            <tr>
              <th
                v-for="column in COLUMNS"
                :key="column"
                :class="[
                  TH_CLASS,
                  column === 'Compétition' ? 'w-2/5 min-w-72' : undefined,
                ]">
                {{ column }}
              </th>
              <th :class="[TH_CLASS, 'text-right']">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-cardBg/50 divide-y">
            <tr
              v-for="competition in competitions"
              :key="competition.id"
              class="hover:bg-gradientDark/30 transition-colors">
              <td :class="[TD_CLASS, 'w-2/5 min-w-72']">
                <span class="text-sm font-semibold text-white sm:text-base">
                  {{ competition.name }}
                </span>
              </td>
              <td
                :class="[
                  TD_CLASS,
                  'text-xs whitespace-nowrap text-white sm:text-sm',
                ]">
                {{ formatListDate(competition.date) }}
              </td>
              <td :class="TD_CLASS">
                <UiBadge variant="neutral">{{ competition.league }}</UiBadge>
              </td>
              <td :class="TD_CLASS">
                <UiBadge variant="muted">
                  {{ getGenderLabel(competition.gender) }}
                </UiBadge>
              </td>
              <td :class="TD_CLASS">
                <UiBadge :variant="getTypeVariant(competition.type)">
                  {{ getTypeLabel(competition.type) }}
                </UiBadge>
              </td>
              <td :class="TD_CLASS">
                <UiBadge :variant="getStatusVariant(competition.state)">
                  {{ getStatusLabel(competition.state) }}
                </UiBadge>
              </td>
              <td :class="[TD_CLASS, 'text-right']">
                <NuxtLink
                  :to="`/competition/${competition.id}`"
                  :class="DETAILS_LINK_CLASS">
                  Voir détails
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <UiPagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :page-size="pageSize"
        :total-items="totalItems"
        :total-pages="totalPages"
        item-label="compétitions"
        @page-change="$emit('page-change', $event)" />
    </template>
  </div>
</template>
