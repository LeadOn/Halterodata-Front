<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    description?: string;
  }>(),
  {description: undefined},
);
</script>

<template>
  <div class="flex h-96 items-center justify-center">
    <div class="text-center">
      <svg
        class="text-textMuted/30 mx-auto h-16 w-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-4 text-lg font-medium text-white">{{ title }}</p>
      <p v-if="description" class="text-textMuted mt-2 text-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>
