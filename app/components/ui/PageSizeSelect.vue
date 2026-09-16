<script setup lang="ts">
const size = defineModel<number>({required: true});

withDefaults(defineProps<{options?: number[]}>(), {
  options: () => [5, 10, 20, 50],
});
</script>

<template>
  <label class="flex items-center gap-3">
    <span class="text-textMuted text-sm font-medium">Affichage:</span>
    <select
      v-model.number="size"
      class="border-cardBg bg-gradientDark/60 focus:border-accentBlue focus:ring-accentBlue/20 rounded-lg border px-4 py-2 text-sm font-medium text-white shadow-sm transition-all focus:ring-2 focus:outline-none">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }} par page
      </option>
    </select>
  </label>
</template>
