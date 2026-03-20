<template>
  <div
    class="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-gradientDark via-gradientMid to-gradientDark">
    <nav
      class="sticky top-0 z-50 w-full border-b border-cardBg/50 bg-cardBg/95 shadow-lg backdrop-blur-md">
      <div
        class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <div class="flex items-center space-x-2 sm:space-x-4">
          <img
            src="/img/halterodata-logo.webp"
            class="h-8 w-8 rounded-lg shadow-md sm:h-12 sm:w-12"
            alt="Halterodata's Logo" />
          <div class="flex flex-col">
            <span
              class="text-base font-bold text-white sm:text-xl cursor-pointer"
              >Halterodata</span
            >
            <span class="hidden text-xs text-textMuted sm:block"
              >Statistiques d'haltérophilie</span
            >
          </div>
        </div>
        <div class="flex items-center space-x-4 sm:space-x-6">
          <NuxtLink
            to="/"
            class="text-xs font-medium text-textMuted transition-colors hover:text-white sm:text-sm">
            Accueil
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main
      class="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-2 py-4 pb-12 sm:min-h-[calc(100vh-5rem)] sm:px-4 sm:py-8 sm:pb-16">
      <div class="relative overflow-hidden">
        <div
          class="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-accentBlue/10 blur-3xl sm:-top-32 sm:-left-32 sm:h-96 sm:w-96"></div>
        <div
          class="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-textMuted/5 blur-3xl sm:-right-32 sm:-bottom-32 sm:h-96 sm:w-96"></div>
        <div class="relative">
          <NuxtPage />
        </div>
      </div>
    </main>

    <!-- Footer minimaliste -->
    <footer class="border-t border-cardBg/50 bg-footerBg/30 py-4 sm:py-6">
      <div class="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <p class="text-xs text-textMuted/70 sm:text-sm">
          Toutes les données ici présentes sont issues de Scoresheet, plateforme
          de la Fédération Française d'haltérophilie.
        </p>
      </div>
    </footer>
  </div>
</template>
