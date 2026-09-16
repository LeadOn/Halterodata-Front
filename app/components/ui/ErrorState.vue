<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string;
    retryLabel?: string;
  }>(),
  {retryLabel: "Réessayer"},
);

defineEmits<{retry: []}>();
</script>

<template>
  <div
    class="border-danger/40 bg-danger/10 text-danger mb-6 rounded-2xl border p-4 text-sm"
    role="alert">
    {{ message }}
    <button
      type="button"
      class="ml-2 font-semibold underline underline-offset-2"
      @click="$emit('retry')">
      {{ retryLabel }}
    </button>
  </div>
</template>
