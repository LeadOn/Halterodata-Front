<script setup lang="ts">
import type {NuxtError} from "#app";

const props = defineProps<{error: NuxtError}>();

const isNotFound = computed(() => props.error.statusCode === 404);

const title = computed(() =>
  isNotFound.value ? "Page introuvable" : "Une erreur est survenue",
);

const message = computed(() =>
  isNotFound.value
    ? "La page ou la ressource demandée n'existe pas, ou n'est plus disponible."
    : "Les données n'ont pas pu être chargées. L'API est peut-être momentanément indisponible.",
);

function goHome(): void {
  clearError({redirect: "/"});
}
</script>

<template>
  <div
    class="from-gradientDark via-gradientMid to-gradientDark flex min-h-screen w-full items-center justify-center bg-linear-to-br px-4">
    <div
      class="border-cardBg/50 from-footerBg/90 to-gradientDark/90 w-full max-w-lg rounded-2xl border bg-linear-to-br p-8 text-center shadow-2xl backdrop-blur-xl">
      <p class="text-accentBlue text-6xl font-bold">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-4 text-2xl font-bold text-white">{{ title }}</h1>
      <p class="text-textMuted mt-3 text-sm leading-relaxed">{{ message }}</p>

      <button
        type="button"
        class="bg-accentBlue hover:bg-accentBlue/80 mt-8 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
        @click="goHome()">
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>
