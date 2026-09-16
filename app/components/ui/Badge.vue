<script setup lang="ts">
export type BadgeVariant =
  "neutral" | "muted" | "accent" | "success" | "unknown";

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant;
  }>(),
  {variant: "neutral"},
);

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "border-cardBg bg-cardBg/50 text-textMuted",
  muted: "border-cardBg/50 bg-cardBg/30 text-textMuted/70",
  accent: "border-accentBlue/30 bg-accentBlue/20 text-accentBlue",
  success: "border-success/30 bg-success/20 text-success",
  unknown: "border-textMuted/30 bg-textMuted/20 text-textMuted",
};

const variantClass = computed(() => VARIANT_CLASSES[props.variant]);
</script>

<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium sm:px-3',
      variantClass,
    ]">
    <slot />
  </span>
</template>
