<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string;
    submitLabel?: string;
    clearLabel?: string;
  }>(),
  {
    placeholder: "Rechercher...",
    submitLabel: "Rechercher",
    clearLabel: "Effacer",
  },
);

const emit = defineEmits<{submit: []; clear: []}>();

/** Terme saisi, lié en `v-model` par la page. */
const term = defineModel<string>({required: true});
</script>

<template>
  <div>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-4"
        aria-hidden="true">
        <svg
          class="text-textMuted h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        v-model="term"
        type="search"
        :placeholder="placeholder"
        :aria-label="placeholder"
        class="border-cardBg bg-gradientDark/60 placeholder-textMuted/40 focus:border-accentBlue focus:bg-gradientDark/80 focus:ring-accentBlue/20 block w-full rounded-xl border-2 py-4 pr-32 pl-12 text-base text-white shadow-inner transition-all duration-200 focus:ring-4 focus:outline-none"
        @keyup.enter="emit('submit')" />
      <div class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          type="button"
          class="bg-accentBlue hover:bg-accentBlue/90 rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          @click="emit('submit')">
          {{ submitLabel }}
        </button>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <slot name="filters" />
      <button
        type="button"
        class="border-cardBg bg-gradientDark/60 text-textMuted hover:border-danger/50 hover:text-danger ml-auto inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all"
        @click="emit('clear')">
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
            d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ clearLabel }}
      </button>
    </div>
  </div>
</template>
