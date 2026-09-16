<script setup lang="ts">
import type {CompetitionDetail} from "~/lib/types/CompetitionDetail";
import {
  getAttemptClass,
  getAttemptDisplay,
  getBirthYear,
} from "~/lib/utils/competition";

defineProps<{groupedDetails: [string, CompetitionDetail[]][]}>();

/** Clé de rendu stable pour une ligne de résultat. */
function trackById(index: number, item: CompetitionDetail): number {
  return item.athlete?.id ?? item.athlete?.licenceId ?? index;
}

function getYear(detail: CompetitionDetail): number | null {
  return getBirthYear(detail.athlete?.birthDate ?? null);
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-215">
      <thead>
        <!-- Ligne de colonnes principales -->
        <tr class="border-cardBg bg-gradientDark/30 border-b">
          <th
            class="text-textMuted px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase"
            rowspan="2">
            Athlète
          </th>
          <th
            class="text-textMuted px-3 py-3 text-left text-xs font-semibold tracking-wider uppercase"
            rowspan="2">
            Club
          </th>
          <th
            class="text-textMuted px-3 py-3 text-center text-xs font-semibold tracking-wider uppercase"
            rowspan="2">
            Année
          </th>
          <th
            class="text-textMuted px-3 py-3 text-center text-xs font-semibold tracking-wider uppercase"
            rowspan="2">
            Poids
          </th>
          <th
            colspan="4"
            class="border-cardBg/30 text-accentBlue/70 border-l px-3 py-2 text-center text-xs font-semibold tracking-wider uppercase">
            Arraché
          </th>
          <th
            colspan="4"
            class="border-cardBg/30 text-accentBlue/70 border-l px-3 py-2 text-center text-xs font-semibold tracking-wider uppercase">
            Épaulé-Jeté
          </th>
          <th
            class="border-cardBg/30 text-accentBlue border-l px-3 py-3 text-center text-xs font-semibold tracking-wider uppercase"
            rowspan="2">
            Total
          </th>
          <th
            class="text-textMuted/60 px-3 py-3 text-center text-xs font-semibold tracking-wider uppercase"
            rowspan="2">
            IWF
          </th>
        </tr>
        <!-- Sous-en-têtes tentatives -->
        <tr
          class="border-cardBg/30 bg-gradientDark/20 text-textMuted/50 border-b text-xs">
          <th class="border-cardBg/30 border-l py-1.5 text-center font-normal">
            1
          </th>
          <th class="py-1.5 text-center font-normal">2</th>
          <th class="py-1.5 text-center font-normal">3</th>
          <th
            class="border-cardBg/30 text-textMuted/70 border-l py-1.5 text-center font-semibold">
            Meilleur
          </th>
          <th class="border-cardBg/30 border-l py-1.5 text-center font-normal">
            1
          </th>
          <th class="py-1.5 text-center font-normal">2</th>
          <th class="py-1.5 text-center font-normal">3</th>
          <th
            class="border-cardBg/30 text-textMuted/70 border-l py-1.5 text-center font-semibold">
            Meilleur
          </th>
        </tr>
      </thead>
      <tbody class="divide-cardBg/30 divide-y">
        <template v-for="[groupKey, entries] in groupedDetails" :key="groupKey">
          <!-- Ligne de groupe catégorie -->
          <tr class="bg-cardBg/20">
            <td colspan="14" class="px-4 py-2">
              <span
                class="text-accentBlue/80 text-xs font-bold tracking-wider uppercase">
                {{ groupKey }}
              </span>
            </td>
          </tr>
          <!-- Lignes athlètes -->
          <tr
            v-for="(entry, index) in entries"
            :key="trackById(index, entry)"
            class="hover:bg-gradientDark/50 transition-colors">
            <td class="px-4 py-3">
              <div class="flex flex-col">
                <NuxtLink
                  :to="entry.athlete?.id ? `/athlete/${entry.athlete.id}` : '#'"
                  class="hover:text-accentBlue text-sm font-semibold text-white transition-colors">
                  {{ entry.athlete?.fullName || "—" }}
                </NuxtLink>
                <span class="text-textMuted/50 text-xs">{{
                  entry.athlete?.licenceId || ""
                }}</span>
              </div>
            </td>
            <td class="text-textMuted px-3 py-3 text-sm">
              {{ entry.club || "—" }}
            </td>
            <td class="text-textMuted px-3 py-3 text-center text-sm">
              {{ getYear(entry) || "—" }}
            </td>
            <td class="px-3 py-3 text-center text-sm font-medium text-white">
              {{ entry.bodyWeight != null ? `${entry.bodyWeight} kg` : "—" }}
            </td>
            <td
              :class="[
                'border-cardBg/30 border-l px-3 py-3 text-center text-sm font-medium',
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
              class="border-cardBg/30 border-l px-3 py-3 text-center text-sm font-bold text-white">
              {{
                entry.bestSnatch != null && entry.bestSnatch > 0
                  ? entry.bestSnatch
                  : "—"
              }}
            </td>
            <td
              :class="[
                'border-cardBg/30 border-l px-3 py-3 text-center text-sm font-medium',
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
              class="border-cardBg/30 border-l px-3 py-3 text-center text-sm font-bold text-white">
              {{
                entry.bestCj != null && entry.bestCj > 0 ? entry.bestCj : "—"
              }}
            </td>
            <td
              class="border-cardBg/30 text-accentBlue border-l px-3 py-3 text-center text-sm font-bold">
              {{ entry.total != null && entry.total > 0 ? entry.total : "—" }}
            </td>
            <td class="text-textMuted/70 px-3 py-3 text-center text-sm">
              {{ entry.iwf ?? "—" }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
