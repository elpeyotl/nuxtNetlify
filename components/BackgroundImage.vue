<template>
  <div id="bgCanvas" class="fixed h-screen w-screen"></div>
</template>

<script>
import { gsap, EasePack } from 'gsap/all'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
export default {
  name: 'BackgroundImage',
  data() {
    return {
      canvas: null,
      width: null,
      height: null,
      pixiApp: null,
    }
  },
  computed: {
    backgroundImgSrc() {
      return this.$store.state.bgImage
    },
  },
  watch: {
    backgroundImgSrc() {
      this.initImage()
    },
  },
  beforeMount() {
    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)
    gsap.registerPlugin(EasePack)
  },
  mounted() {
    this.initDimensions()
    this.initCanvas()
    this.initImage()
  },
  methods: {
    initDimensions() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    initCanvas() {
      this.canvas = document.getElementById('bgCanvas')
      const width = this.width
      const height = this.height
      this.app = new PIXI.Application({
        width,
        height,
      })
      // Add the view to the DOM
      this.canvas.appendChild(this.app.view)
      // Resizes renderer view in CSS pixels to allow for resolutions other than 1
      this.app.renderer.autoDensity = true
      const container = new PIXI.Container()
      this.app.stage.addChild(container)
      // Resize the view to match viewport dimensions
      this.app.renderer.resize(width, height)
    },
    initImage() {
      const loader = new PIXI.Loader()
      loader.add('bg', this.backgroundImgSrc)
      loader.load((loader, resources) => {
        console.log(resources)
        const bg = PIXI.Sprite.from(resources.bg.data)
        this.app.stage.removeChild(bg)
        bg.anchor.x = 0.5
        bg.x = this.width / 2
        bg.anchor.y = 0.5
        bg.y = this.height / 2
        bg.width = this.width
        bg.height = this.height
        setTimeout(() => {
          this.app.stage.addChild(bg)
        }, 500)
        gsap.to(bg.scale, 30, {
          x: 2,
          y: 2,
          repeat: -1,
          yoyo: true,
          ease: EasePack.ExpoScaleEase.config(1, 2),
        })
      })
    },
  },
}
</script>

<style scoped></style>
