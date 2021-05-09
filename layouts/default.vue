<template>
  <div>
    <!-- <img
      v-lazy="backgroundImgSrc"
      class="backgroundImage top-0 z-0 fixed w-screen h-screen"
    />-->
    <div id="bgCanvas" class="fixed h-screen w-screen"></div>
    <div class="bg-gray-800 h-full w-full bg-opacity-75 z-10 relative">
      <div class="mx-auto max-w-6xl bg-gray-200 bg-opacity-75 shadow-lg">
        <Header />

        <Nuxt class="p-4 lg:p-16 min-h-screen" />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { gsap, EasePack } from 'gsap/all'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'

export default {
  components: { Header, Footer },
  computed: {
    backgroundImgSrc() {
      return this.$store.state.bgImage
    },
  },
  mounted() {
    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)
    gsap.registerPlugin(EasePack)
    // Create the application
    const myView = document.getElementById('bgCanvas')

    // Set dimensions
    let width, height
    function initDimensions() {
      width = window.innerWidth
      height = window.innerHeight
    }
    const app = new PIXI.Application({
      width,
      height,
    })
    initDimensions()
    // Add the view to the DOM
    myView.appendChild(app.view)
    // Resizes renderer view in CSS pixels to allow for resolutions other than 1
    app.renderer.autoDensity = true
    // Resize the view to match viewport dimensions
    app.renderer.resize(width, height)
    // ex, add display objects
    const bg = PIXI.Sprite.from(this.backgroundImgSrc)
    bg.width = width
    bg.height = height

    app.stage.addChild(bg)

    gsap.to(bg.scale, 30, {
      x: 2,
      y: 2,
      repeat: -1,
      yoyo: true,
      ease: EasePack.ExpoScaleEase.config(1, 2),
    })

    /*      const timeLine = new TimelineMax({
      // reversed: true,
      repeat: -1,
      yoyo: true,
    })
    timeLine.fromTo(
      bg,
      { pixi: { scale: 1 } },
      {
        pixi: { scale: 1.5 },
        duration: 30,
        ease: Power1.easeInOut,
      }
    ) */
  },

  methods: {
    async animateBackground() {},
  },
}
</script>

<style>
h1,
h2,
h3 {
  font-family: 'Montserrat', sans-serif;
}

body {
  @apply font-light;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.25em;
}
.backgroundImage {
  will-change: transform;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition-delay: 0.2s;
}
</style>
