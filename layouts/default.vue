<template>
  <div
    id="main_wrapper"
    class="bg-center bg-cover bg-fixed bg-no-repeat bg-image min-w-screen min-h-screen"
    :style="{
      backgroundImage: `url(${backgroundImgSrc})`,
    }"
  >
    <div class="bg-gray-800 h-full w-full bg-opacity-75">
      <div class="mx-auto max-w-6xl bg-gray-400 bg-opacity-75 shadow-lg">
        <Header />
        <Nuxt class="p-4 lg:p-16 min-h-screen" />
        <Footer />
      </div>

      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { gsap, Power1, CSSPlugin, TimelineMax } from 'gsap'

export default {
  components: { Header, Footer },
  computed: {
    backgroundImgSrc() {
      return this.$store.state.bgImage
    },
  },
  mounted() {
    gsap.registerPlugin(CSSPlugin)
    this.animateBackground()
  },

  methods: {
    animateBackground() {
      const bgImage = document.getElementById('main_wrapper')
      const timeLine = new TimelineMax({
        // reversed: true,
        repeat: -1,
        yoyo: true,
      })
      // set initial CSS autoAlpha to 0
      // GSAP handles the cross browser vendor prefixes
      timeLine
        .set(bgImage, { backgroundSize: '150% 150%' })
        // animate CSS autoAlpha to 1
        .to(bgImage, 40, {
          backgroundSize: '100% 100%',
          autoRound: false,
          ease: Power1.ease0ut,
        })
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Raleway&display=swap');

h1,
h2,
h3 {
  font-family: 'Montserrat', sans-serif;
}

body {
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.25em;
}

.bg-image {
}
@keyframes imagebulger {
  0% {
    background-size: 150% auto;
  }

  50% {
    background-size: 100% auto;
  }

  100% {
    background-size: 150% auto;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
