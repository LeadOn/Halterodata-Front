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
          <button type="button" class="cursor-pointer">
            <!-- @if (darkMode()) {
            <fa-icon
              [icon]="lightIcon"
              class="text-customYellow text-lg"></fa-icon>
            } @if (!darkMode()) {
            <fa-icon
              [icon]="darkIcon"
              class="text-frenchBlue text-lg"></fa-icon>
            } -->TOGGLEBTN
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
            <!-- <fa-icon
              [icon]="homeIcon"
              class="text-primary dark:text-primaryDark text-lg"></fa-icon> -->HOMEICON
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <!-- <fa-icon
              [icon]="ballIcon"
              class="text-primary dark:text-primaryDark text-lg"></fa-icon> -->
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <!-- <img src="assets/img/svg/lol.svg" class="w-10 min-w-10" /> -->LoL
            ICON
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <button type="button" class="cursor-pointer">
              <!-- <fa-icon
                [icon]="trophyIcon"
                class="text-primary dark:text-primaryDark text-lg"></fa-icon> -->

              TROPHY ICON
            </button>
          </div>

          <div
            class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-s-full">
            <!-- @if (isLoggedIn == true) {
            <button
              routerLink="/player/me"
              type="button"
              class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-e-full">
              <fa-icon
                [icon]="userIcon"
                class="text-primary dark:text-primaryDark text-lg"></fa-icon>
            </button>
            } @if (isLoggedIn == false) {
            <button
              (click)="login()"
              type="button"
              class="group inline-flex cursor-pointer flex-col items-center justify-center rounded-e-full">
              <fa-icon
                [icon]="userIcon"
                class="text-primary dark:text-primaryDark text-lg"></fa-icon>
            </button>
            } -->
            LOGIN BTN
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
