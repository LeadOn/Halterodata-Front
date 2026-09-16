<template>
  <NuxtLink
    :to="`/athlete/${athlete.id}`"
    class="group border-cardBg/50 from-footerBg/90 to-gradientDark/90 hover:border-accentBlue/60 hover:shadow-accentBlue/15 relative block overflow-hidden rounded-2xl border bg-linear-to-br shadow-xl backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-1.5 hover:shadow-2xl">
    <!-- Lueur de survol -->
    <div
      class="ring-accentBlue/40 pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 transition-opacity duration-300 group-hover:opacity-100" />
    <div class="absolute inset-0 overflow-hidden">
      <img
        v-if="photo"
        :src="photo"
        :alt="`Photo de ${athlete.fullName ?? 'l\'athlète'}`"
        class="h-full w-full object-cover opacity-20 transition-[transform,opacity] duration-300 group-hover:scale-105 group-hover:opacity-35" />
      <div
        class="from-gradientDark absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
    </div>

    <div class="relative p-6">
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-white sm:text-3xl">
          {{ athlete.fullName }}
        </h3>
        <div
          class="text-textMuted mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span class="flex items-center gap-1">
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
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ athlete.countryCode }}
          </span>
          <span v-if="athlete.currentClub" class="flex items-center gap-1">
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
            {{ athlete.currentClub }}
          </span>
          <span v-if="lastStats.category" class="flex items-center gap-1">
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
                d="M16 8a4 4 0 11-8 0 4 4 0 018 0zM4 12a8 8 0 1116 0 8 8 0 01-16 0z" />
            </svg>
            {{ lastStats.category }}
          </span>
          <span v-if="lastStats.serie" class="flex items-center gap-1">
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
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {{ lastStats.serie }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          class="border-cardBg/30 bg-gradientDark/60 rounded-xl border p-4 backdrop-blur-sm">
          <div
            class="text-textMuted mb-2 text-xs font-medium tracking-wider uppercase">
            Arraché
          </div>
          <div class="text-2xl font-bold text-white">
            {{ bestStats.snatch || 0 }}kg
          </div>
          <div class="text-textMuted/70 mt-1 text-xs">
            Dernier: {{ lastStats.snatch || 0 }}kg
          </div>
        </div>

        <div
          class="border-cardBg/30 bg-gradientDark/60 rounded-xl border p-4 backdrop-blur-sm">
          <div
            class="text-textMuted mb-2 text-xs font-medium tracking-wider uppercase">
            Épaulé-Jeté
          </div>
          <div class="text-2xl font-bold text-white">
            {{ bestStats.cj || 0 }}kg
          </div>
          <div class="text-textMuted/70 mt-1 text-xs">
            Dernier: {{ lastStats.cj || 0 }}kg
          </div>
        </div>

        <div
          class="border-accentBlue/30 from-accentBlue/20 to-accentBlue/10 rounded-xl border bg-linear-to-br p-4 backdrop-blur-sm">
          <div
            class="text-accentBlue mb-2 text-xs font-medium tracking-wider uppercase">
            Total
          </div>
          <div class="text-2xl font-bold text-white">
            {{ bestStats.total || 0 }}kg
          </div>
          <div class="text-accentBlue/80 mt-1 text-xs">
            IWF: {{ bestStats.iwf || 0 }}
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span
            class="border-accentBlue/30 bg-accentBlue/20 text-accentBlue rounded-full border px-3 py-1 text-xs font-medium">
            {{ lastStats.bodyWeight || 0 }}kg
          </span>
          <span class="text-textMuted text-xs">
            IWF: {{ lastStats.iwf || 0 }}
          </span>
        </div>
        <div
          class="text-accentBlue flex items-center gap-2 text-sm font-medium transition-transform group-hover:translate-x-1">
          <span>Voir profil</span>
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
              d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type {AthleteDto} from "~/lib/types/AthleteDto";
import type {StatRecapDto} from "~/lib/types/StatRecapDto";

const props = defineProps<{athlete: AthleteDto}>();

/**
 * L'API peut renvoyer `lastStats` / `bestStats` à `null`. On expose des objets
 * toujours définis, pour que le template accède à leurs champs sans garde.
 */
const EMPTY_STATS: StatRecapDto = {
  snatch: null,
  cj: null,
  total: null,
  iwf: null,
  bodyWeight: null,
  serie: null,
  category: null,
};

const appConfig = useAppConfig();

/** Photo d'illustration, définie dans `app.config.ts` (jamais en dur ici). */
const photo = computed(
  () =>
    appConfig.pinnedAthletes.find((pinned) => pinned.id === props.athlete.id)
      ?.photo ?? null,
);

const lastStats = computed(() => props.athlete.lastStats ?? EMPTY_STATS);
const bestStats = computed(() => props.athlete.bestStats ?? EMPTY_STATS);
</script>
