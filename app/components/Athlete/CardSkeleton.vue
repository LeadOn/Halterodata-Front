<template>
  <div
    class="animate-pulse overflow-hidden rounded-2xl border border-cardBg/50 bg-linear-to-br from-footerBg/90 to-gradientDark/90 shadow-2xl backdrop-blur-xl">
    <div class="relative p-6">
      <div class="mb-6">
        <div class="h-8 w-3/4 rounded-lg bg-white/10 sm:h-10"></div>
        <div class="mt-3 flex flex-wrap items-center gap-3">
          <div class="h-5 w-16 rounded-full bg-white/10"></div>
          <div class="h-5 w-28 rounded-full bg-white/10"></div>
          <div class="h-5 w-20 rounded-full bg-white/10"></div>
          <div class="h-5 w-14 rounded-full bg-white/10"></div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          class="rounded-xl border border-cardBg/30 bg-gradientDark/60 p-4 backdrop-blur-sm">
          <div class="mb-2 h-3 w-12 rounded bg-white/10"></div>
          <div class="h-8 w-16 rounded bg-white/10"></div>
          <div class="mt-2 h-3 w-14 rounded bg-white/10"></div>
        </div>

        <div
          class="rounded-xl border border-cardBg/30 bg-gradientDark/60 p-4 backdrop-blur-sm">
          <div class="mb-2 h-3 w-12 rounded bg-white/10"></div>
          <div class="h-8 w-16 rounded bg-white/10"></div>
          <div class="mt-2 h-3 w-14 rounded bg-white/10"></div>
        </div>

        <div
          class="rounded-xl border border-accentBlue/30 bg-linear-to-br from-accentBlue/20 to-accentBlue/10 p-4 backdrop-blur-sm">
          <div class="mb-2 h-3 w-12 rounded bg-accentBlue/20"></div>
          <div class="h-8 w-16 rounded bg-white/10"></div>
          <div class="mt-2 h-3 w-14 rounded bg-accentBlue/20"></div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="h-7 w-16 rounded-full bg-accentBlue/20"></div>
          <div class="h-4 w-14 rounded bg-white/10"></div>
        </div>
        <div class="h-4 w-20 rounded bg-accentBlue/20"></div>
      </div>
    </div>
  </div>
</template>
