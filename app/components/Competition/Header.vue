<script setup lang="ts">
import {
  CompetitionGender,
  CompetitionState,
  type CompetitionDetailedDto,
} from "~/lib/types/Competition";
import {
  formatCompetitionDate,
  getGenderLabel,
  getStatusLabel,
  getTypeLabel,
} from "~/lib/utils/competition";

const props = defineProps<{competition?: CompetitionDetailedDto | null}>();

const formattedCompetitionDate = computed(() =>
  formatCompetitionDate(props.competition?.date ?? null),
);

/**
 * Cette page utilise une palette propre (genre, type) définie dans
 * `main.css`, plus riche que les variantes génériques de `UiBadge`.
 */
const BADGE_BASE =
  "rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase";

const statusClass = computed(() =>
  props.competition?.state === CompetitionState.InProgress
    ? "border-accentBlue/50 bg-accentBlue/20 text-accentBlue"
    : "border-success/50 bg-success/20 text-success",
);

const genderClass = computed(() => {
  switch (props.competition?.gender) {
    case CompetitionGender.Male:
      return "border-genderM/50 bg-genderM/20 text-genderM";
    case CompetitionGender.Female:
      return "border-genderF/50 bg-genderF/20 text-genderF";
    default:
      return "border-genderMix/50 bg-genderMix/20 text-genderMix";
  }
});

const typeClass = computed(() =>
  props.competition?.type
    ? "border-typeTeam/50 bg-typeTeam/20 text-typeTeam"
    : "border-typeInd/50 bg-typeInd/20 text-typeInd",
);
</script>

<template>
  <div class="mb-8">
    <div
      class="border-cardBg/50 from-footerBg/90 to-gradientDark/90 relative overflow-hidden rounded-2xl border bg-linear-to-br shadow-2xl backdrop-blur-xl">
      <div
        class="from-gradientDark absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
      <div class="relative p-6">
        <div class="mb-4">
          <NuxtLink
            to="/"
            class="text-textMuted inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white">
            <svg
              class="h-3.5 w-3.5"
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
            Retour aux compétitions
          </NuxtLink>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white sm:text-3xl">
            {{ competition?.name || "Compétition" }}
          </h2>
          <div
            class="text-textMuted mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span class="flex items-center gap-1.5">
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
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
                viewBox="0 0 24 24"
                aria-hidden="true">
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
          <span :class="[BADGE_BASE, statusClass]">
            {{ getStatusLabel(competition?.state ?? -1) }}
          </span>

          <span :class="[BADGE_BASE, genderClass]">
            {{ getGenderLabel(competition?.gender ?? -1) }}
          </span>

          <span :class="[BADGE_BASE, typeClass]">
            {{ getTypeLabel(competition?.type ?? false) }}
          </span>

          <span
            v-if="competition?.details?.length"
            class="border-cardBg/50 bg-cardBg/20 text-textMuted rounded-full border px-3 py-1 text-xs font-semibold">
            {{ competition.details.length }} participants
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
