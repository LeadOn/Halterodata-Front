<script setup lang="ts">
const isDark = ref(false);

onMounted(() => {
  const stored = localStorage.getItem("gameon-dark-theme");
  if (
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

function toggleDark() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("gameon-dark-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("gameon-dark-theme", "light");
  }
}
</script>

<template>
  <div
    class="bg-bgLightDarker dark:bg-bgDarkDarker min-h-screen overflow-x-hidden">
    <div class="background min-h-screen overflow-x-hidden">
      <header
        class="bg-bgLight/40 dark:bg-bgDark/40 backdrop-blur-xs sticky top-0 z-50 flex h-16 items-center justify-between self-center px-4 backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
        <a
          class="text-primaryDarker flex items-center justify-center self-center text-xl font-bold"
          ><img
            class="h-8 w-8"
            src="/img/gameon-logo.webp"
            alt="GameOn!'s logo" />
          <span class="dark:text-primaryDark ml-2">GameOn!</span></a
        >

        <div class="flex items-center justify-center space-x-4">
          <button type="button" class="cursor-pointer" @click="toggleDark">
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-customYellow">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-frenchBlue">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
        </div>
      </header>

      <div class="bubble-layer" aria-hidden="true">
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
      </div>

      <nav
        class="border-l-frenchBlue border-r-frenchRed bg-bgLight/50 dark:border-y-bgLight dark:bg-bgDark/50 fixed bottom-4 left-1/2 z-50 h-16 w-11/12 max-w-lg -translate-x-1/2 rounded-full border border-l-2 border-r-2 border-b-gray-300 border-t-gray-300 backdrop-blur-sm backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
        <div
          class="flex h-full w-full grow basis-1 items-center justify-around align-middle">
          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-primary dark:text-primaryDark">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <img src="/img/svg/fifagame.svg" class="h-6 w-6" alt="Football" />
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <img
              src="/img/svg/lol.svg"
              class="w-10 min-w-10"
              alt="League of Legends" />
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-primary dark:text-primaryDark">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-primary dark:text-primaryDark">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
      </nav>

      <div>
        <div
          class="3xl:px-96 px-0 pb-24 md:px-16 lg:overflow-y-scroll lg:px-32 lg:pb-0 xl:px-64 2xl:px-80">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.background {
  position: relative;
  overflow-x: hidden;
}

.background .bubble-layer {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  contain: paint;
  transform: translateZ(0);
}

.background > header,
.background > div:last-child {
  position: relative;
  z-index: 1;
}

.background .bubble {
  width: 28vmin;
  height: 28vmin;
  border-radius: 28vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: move;
  animation-duration: 16s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

@media (max-width: 1023px) {
  .background .bubble {
    animation-play-state: paused;
  }
}

.background .bubble:nth-child(1) {
  color: #071d90;
  top: 74%;
  left: 69%;
  animation-duration: 104s;
  animation-delay: -114s;
  transform-origin: -8vw -9vh;
  box-shadow: -56vmin 0 7.341496990909439vmin currentColor;
}
.background .bubble:nth-child(2) {
  color: #1b998b;
  top: 32%;
  left: 5%;
  animation-duration: 84s;
  animation-delay: -129s;
  transform-origin: 9vw -14vh;
  box-shadow: -56vmin 0 7.985815036568821vmin currentColor;
}
.background .bubble:nth-child(3) {
  color: #c82d44;
  top: 100%;
  left: 40%;
  animation-duration: 159s;
  animation-delay: -91s;
  transform-origin: 14vw -17vh;
  box-shadow: 56vmin 0 7.9230123948758475vmin currentColor;
}
.background .bubble:nth-child(4) {
  color: #071d90;
  top: 99%;
  left: 100%;
  animation-duration: 55s;
  animation-delay: -284s;
  transform-origin: 2vw 1vh;
  box-shadow: -56vmin 0 7.967172955555978vmin currentColor;
}
.background .bubble:nth-child(5) {
  color: #071d90;
  top: 49%;
  left: 25%;
  animation-duration: 64s;
  animation-delay: -326s;
  transform-origin: -3vw 18vh;
  box-shadow: 56vmin 0 7.94148301486098vmin currentColor;
}
.background .bubble:nth-child(6) {
  color: #071d90;
  top: 84%;
  left: 81%;
  animation-duration: 91s;
  animation-delay: -4s;
  transform-origin: -6vw 10vh;
  box-shadow: 56vmin 0 7.908749787431855vmin currentColor;
}
.background .bubble:nth-child(7) {
  color: #1b998b;
  top: 51%;
  left: 92%;
  animation-duration: 177s;
  animation-delay: -272s;
  transform-origin: 7vw 13vh;
  box-shadow: -56vmin 0 7.740132319050998vmin currentColor;
}
.background .bubble:nth-child(8) {
  color: #1b998b;
  top: 22%;
  left: 15%;
  animation-duration: 68s;
  animation-delay: -284s;
  transform-origin: 8vw -22vh;
  box-shadow: 56vmin 0 7.7443120733373485vmin currentColor;
}
.background .bubble:nth-child(9) {
  color: #071d90;
  top: 88%;
  left: 76%;
  animation-duration: 82s;
  animation-delay: -133s;
  transform-origin: -3vw 19vh;
  box-shadow: -56vmin 0 7.273858049676721vmin currentColor;
}
.background .bubble:nth-child(10) {
  color: #c82d44;
  top: 70%;
  left: 49%;
  animation-duration: 283s;
  animation-delay: -63s;
  transform-origin: 1vw -7vh;
  box-shadow: -56vmin 0 7.450102623837788vmin currentColor;
}
.background .bubble:nth-child(11) {
  color: #c82d44;
  top: 12%;
  left: 22%;
  animation-duration: 324s;
  animation-delay: -314s;
  transform-origin: 7vw 12vh;
  box-shadow: -56vmin 0 7.720364405151158vmin currentColor;
}
.background .bubble:nth-child(12) {
  color: #c82d44;
  top: 95%;
  left: 97%;
  animation-duration: 300s;
  animation-delay: -228s;
  transform-origin: -7vw 0vh;
  box-shadow: 56vmin 0 7.966272399236741vmin currentColor;
}
.background .bubble:nth-child(13) {
  color: #c82d44;
  top: 98%;
  left: 42%;
  animation-duration: 225s;
  animation-delay: -112s;
  transform-origin: -19vw -18vh;
  box-shadow: 56vmin 0 7.778211503726165vmin currentColor;
}

.background .bubble:nth-child(14) {
  color: #1b998b;
  top: 14%;
  left: 84%;
  animation-duration: 136s;
  animation-delay: -176s;
  transform-origin: -10vw 8vh;
  box-shadow: -56vmin 0 7.612345678901234vmin currentColor;
}
</style>
