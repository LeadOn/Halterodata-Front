<template>
  <p v-if="isLoading">Loading...</p>

  <section class="mx-auto mt-4 w-full max-w-6xl px-4 pb-6">
    <div
      class="border-bgLightDarker dark:border-bgLight bg-bgLight dark:bg-bgDark overflow-hidden rounded-2xl border">
      <div
        class="border-bgLightDarker dark:border-bgLight flex items-center justify-between border-b px-4 py-3 sm:px-5">
        <div>
          <h2 class="text-primary dark:text-primaryDark text-lg font-semibold">
            Joueurs League of Legends actifs
          </h2>
          <!-- @if (isLoading == false) {
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ leaguePlayers.length }} joueur(s) visible(s)
          </p>
          } @if (isLoading == true) {
          <div class="skeleton-base mt-1 h-4 w-36"></div>
          } -->
        </div>

        <!-- @if (isLoading == true) {
        <div class="skeleton-circle h-7 w-7"></div>
        } -->
      </div>

      <!-- @if (isLoading == true) {
      <div class="p-3 sm:p-4">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          @for (skeleton of [1, 2, 3, 4, 5, 6]; track skeleton) {
          <div
            class="border-bgLightDarker dark:border-bgLight rounded-xl border p-3">
            <div class="mb-3 flex items-center gap-3">
              <div class="skeleton-circle h-12 w-12"></div>
              <div class="flex-1 space-y-2">
                <div class="skeleton-base h-4 w-2/3"></div>
                <div class="skeleton-base h-3 w-1/2"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="skeleton-base h-3 w-full"></div>
              <div class="skeleton-base h-3 w-5/6"></div>
            </div>
          </div>
          }
        </div>
      </div>
      } @if (isLoading == false) {
      <div class="p-3 sm:p-4">
        @if (leaguePlayers.length > 0) {
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          @for (player of leaguePlayers; track player) {
          <app-lol-player-card [player]="player"></app-lol-player-card>
          }
        </div>
        } @else {
        <div
          class="text-primary dark:text-primaryDark border-bgLightDarker dark:border-bgLight rounded-xl border border-dashed px-4 py-8 text-center">
          Aucun joueur actif pour le moment.
        </div>
        }
      </div>
    }-->
    </div>
  </section>

  <div v-if="apiData" class="mt-6 p-4 bg-green-100 text-green-800 rounded">
    <h3 class="text-lg font-semibold mb-2">Data from API:</h3>
    <pre class="whitespace-pre-wrap text-sm">{{
      JSON.stringify(apiData, null, 2)
    }}</pre>
  </div>
</template>

<script setup lang="ts">
import {getTest} from "~/lib/api/lolApi";

const isLoading = ref(true);
const apiData = ref(null);

onMounted(async () => {
  // await loadTest();
});

// async function loadTest() {
//   try {
//     isLoading.value = true;

//     const data = await getTest();

//     if (data) {
//       apiData.value = data;
//       console.log("Data received from API:", data);
//     } else {
//       console.warn("No data received from API.");
//     }
//   } catch (error) {
//     console.error("Error while loading test data:", error);
//   } finally {
//     isLoading.value = false;
//     console.log("Finished loadTest function.");
//   }
// }
</script>
