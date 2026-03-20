<template>
  <div class="mb-8">
    <div
      class="relative overflow-hidden rounded-2xl border border-cardBg/50 bg-linear-to-br from-footerBg/90 to-gradientDark/90 shadow-2xl backdrop-blur-xl">
      <div
        class="absolute inset-0 bg-linear-to-t from-gradientDark via-transparent to-transparent" />

      <div class="relative p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white sm:text-3xl">
            {{ competition?.name || "Compétition" }}
          </h2>
          <div
            class="mt-3 flex flex-wrap items-center gap-3 text-sm text-textMuted">
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
                  d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formattedCompetitionDate }}
            </span>
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {{ competition?.league || "—" }}
            </span>
          </div>
        </div>

        <div class="mb-6 flex flex-wrap items-center gap-2">
          <div
            :class="[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              competition?.state === 0
                ? 'border-accentBlue/50 bg-accentBlue/20 text-accentBlue'
                : 'border-[#22c55e]/50 bg-[#22c55e]/20 text-[#22c55e]',
            ]">
            {{ competition?.state === 0 ? "En cours" : "Terminé" }}
          </div>

          <div
            :class="[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              competition?.gender === 0
                ? 'border-[#8b5cf6]/50 bg-[#8b5cf6]/20 text-[#8b5cf6]'
                : competition?.gender === 1
                  ? 'border-[#ec4899]/50 bg-[#ec4899]/20 text-[#ec4899]'
                  : 'border-[#06b6d4]/50 bg-[#06b6d4]/20 text-[#06b6d4]',
            ]">
            {{
              competition?.gender === 0
                ? "Masculin"
                : competition?.gender === 1
                  ? "Féminin"
                  : "Mixte"
            }}
          </div>

          <div
            :class="[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              competition?.type
                ? 'border-[#14b8a6]/50 bg-[#14b8a6]/20 text-[#14b8a6]'
                : 'border-[#f97316]/50 bg-[#f97316]/20 text-[#f97316]',
            ]">
            {{ competition?.type ? "En équipe" : "Individuelle" }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="space-y-8">
    <div v-if="loading" class="text-center text-sm text-textMuted">
      Chargement des inscriptions...
    </div>

    <div
      class="overflow-hidden rounded-2xl border border-cardBg/50 bg-gradientDark/40">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#2b3658]">
          <thead class="bg-[#0b172b]/60">
            <tr class="text-sm text-textMuted">
              <th class="px-3 py-2 text-left">Licence</th>
              <th class="px-3 py-2 text-left">Nom</th>
              <th class="px-3 py-2 text-left">Club</th>
              <th class="px-3 py-2 text-left">Nation</th>
              <th class="px-3 py-2 text-left">Poids</th>
              <th class="px-3 py-2 text-left">Snatch 1</th>
              <th class="px-3 py-2 text-left">Snatch 2</th>
              <th class="px-3 py-2 text-left">Snatch 3</th>
              <th class="px-3 py-2 text-left">CJ 1</th>
              <th class="px-3 py-2 text-left">CJ 2</th>
              <th class="px-3 py-2 text-left">CJ 3</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#24304f] bg-[#07122a]/40 text-white">
            <tr
              v-for="(entry, index) in displayedDetails"
              :key="trackById(index, entry)"
              class="text-sm hover:bg-[#07122a]/30">
              <td class="px-3 py-3">{{ entry.athlete?.licenceId || "—" }}</td>
              <td class="px-3 py-3">
                <NuxtLink
                  :to="entry.athlete?.id ? `/athlete/${entry.athlete.id}` : '#'"
                  class="text-accentBlue hover:underline">
                  {{ entry.athlete?.fullName || "—" }}
                </NuxtLink>
              </td>
              <td class="px-3 py-3">{{ entry.club || "—" }}</td>
              <td class="px-3 py-3">{{ entry.countryCode || "—" }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.bodyWeight) }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.snatch1) }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.snatch2) }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.snatch3) }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.cj1) }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.cj2) }}</td>
              <td class="px-3 py-3">{{ formatScore(entry.cj3) }}</td>
            </tr>

            <tr
              v-if="displayedDetails.length === 0"
              class="text-sm text-textMuted">
              <td class="p-4" colspan="12">Aucune inscription trouvée.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="flex items-center justify-between border-t border-cardBg/30 p-4 text-sm text-textMuted">
        <div>
          Affichage {{ startItem }} - {{ endItem }} sur {{ totalItems || 0 }}
        </div>

        <div class="flex items-center gap-2">
          <button
            class="rounded bg-gradientDark/60 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)">
            Préc
          </button>

          <div class="w-10 text-center">{{ currentPage || 1 }}</div>

          <button
            class="rounded bg-gradientDark/60 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)">
            Suiv
          </button>
        </div>
      </div>
    </div>
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

const pageSize = ref(10);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(1);

const displayedDetails = ref<CompetitionDetail[]>([]);

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
