<template>
  <a
    class="group relative block overflow-hidden rounded-2xl border border-cardBg/50 bg-linear-to-br from-footerBg/90 to-gradientDark/90 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-accentBlue/50 hover:shadow-accentBlue/20">
    <div class="absolute inset-0 overflow-hidden">
      <img
        v-if="athlete.id === 4210"
        src="/img/athletes/gregoire-aubertin.jpg"
        alt="Grégoire Aubertin"
        class="h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
      <img
        v-if="athlete.id === 1"
        src="/img/athletes/bastien-bonnamant.png"
        alt="Bastien Bonnamant"
        class="h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
      <div
        class="absolute inset-0 bg-linear-to-t from-gradientDark via-transparent to-transparent"></div>
    </div>

    <div class="relative p-6">
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-white sm:text-3xl">
          {{ athlete.fullName }}
        </h3>
        <div
          class="mt-2 flex flex-wrap items-center gap-3 text-sm text-textMuted">
          <span class="flex items-center gap-1">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
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
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {{ athlete.currentClub }}
          </span>
          <span
            v-if="athlete.lastStats.category"
            class="flex items-center gap-1">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8a4 4 0 11-8 0 4 4 0 018 0zM4 12a8 8 0 1116 0 8 8 0 01-16 0z" />
            </svg>
            {{ athlete.lastStats.category }}
          </span>
          <span v-if="athlete.lastStats.serie" class="flex items-center gap-1">
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {{ athlete.lastStats.serie }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          class="rounded-xl border border-cardBg/30 bg-gradientDark/60 p-4 backdrop-blur-sm">
          <div
            class="mb-2 text-xs font-medium tracking-wider text-textMuted uppercase">
            Snatch
          </div>
          <div class="text-2xl font-bold text-white">
            {{ athlete.bestStats.snatch || 0 }}kg
          </div>
          <div class="mt-1 text-xs text-textMuted/70">
            ATH: {{ athlete.bestStats.snatch || 0 }}kg
          </div>
        </div>

        <div
          class="rounded-xl border border-cardBg/30 bg-gradientDark/60 p-4 backdrop-blur-sm">
          <div
            class="mb-2 text-xs font-medium tracking-wider text-textMuted uppercase">
            C&J
          </div>
          <div class="text-2xl font-bold text-white">
            {{ athlete.bestStats.cj || 0 }}kg
          </div>
          <div class="mt-1 text-xs text-textMuted/70">
            ATH: {{ athlete.bestStats.cj || 0 }}kg
          </div>
        </div>

        <div
          class="rounded-xl border border-accentBlue/30 bg-linear-to-br from-accentBlue/20 to-accentBlue/10 p-4 backdrop-blur-sm">
          <div
            class="mb-2 text-xs font-medium tracking-wider text-accentBlue uppercase">
            Total
          </div>
          <div class="text-2xl font-bold text-white">
            {{ athlete.bestStats.total || 0 }}kg
          </div>
          <div class="mt-1 text-xs text-accentBlue/80">
            IWF: {{ athlete.bestStats.iwf || 0 }}
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span
            class="rounded-full border border-accentBlue/30 bg-accentBlue/20 px-3 py-1 text-xs font-medium text-accentBlue">
            {{ athlete.lastStats.bodyWeight || 0 }}kg
          </span>
          <span class="text-xs text-textMuted">
            IWF: {{ athlete.lastStats.iwf || 0 }}
          </span>
        </div>
        <NuxtLink
          :to="`/athlete/${athlete.id}`"
          class="flex items-center gap-2 text-sm font-medium text-accentBlue transition-transform group-hover:translate-x-1">
          <span>Voir profil</span>
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
        </NuxtLink>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import type {AthleteDto} from "~/lib/types/AthleteDto";

const props = defineProps<{athlete: AthleteDto}>();
</script>
