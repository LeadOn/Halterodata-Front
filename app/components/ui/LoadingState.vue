<script setup lang="ts">
withDefaults(defineProps<{label?: string}>(), {label: "Chargement..."});
</script>

<template>
  <div class="flex h-96 items-center justify-center" role="status">
    <div class="flex flex-col items-center gap-4">
      <div
        class="border-accentBlue h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
        aria-hidden="true" />
      <p class="text-textMuted">{{ label }}</p>
    </div>
  </div>
</template>
