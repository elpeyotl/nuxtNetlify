<template>
  <div id="bgCanvas" class="fixed h-screen w-screen"></div>
</template>

<script>
import { gsap, EasePack } from 'gsap/all'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { ReflectionFilter } from 'pixi-filters'

import * as PIXI from 'pixi.js'
export default {
  name: 'BackgroundImage',
  data() {
    return {
      canvas: null,
      width: null,
      height: null,
      app: null,
      afp: null,
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
    this.init()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    init() {
      this.initCanvas()
      this.resize()
    },
    resize() {
      this.initDimensions()
      this.app.renderer.resize(this.width, this.height)
      this.clearStage()
      this.initImage()
    },
    initDimensions() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    initCanvas() {
      const width = this.width
      const height = this.height
      this.app = new PIXI.Application({
        width,
        height,
      })
      this.app.renderer.autoDensity = true
      this.app.renderer.resolution = devicePixelRatio
      this.app.renderer.autoResize = true
      // Add the view to the DOM
      this.canvas = document.getElementById('bgCanvas')
      this.canvas.appendChild(this.app.view)
      const container = new PIXI.Container()
      this.app.stage.addChild(container)
      // Resize the view to match viewport dimensions
      this.app.renderer.resize(width, height)
    },
    animate() {
      this.afp = requestAnimationFrame(this.animate)
      // render the container
      this.app.renderer.render(this.app.stage)
    },
    clearStage() {
      cancelAnimationFrame(this.afp)
      this.app.stage.children = []
    },
    initImage() {
      this.clearStage()
      const loader = new PIXI.Loader()
      loader.add('bg', this.backgroundImgSrc)
      loader.load((loader, resources) => {
        const bg = PIXI.Sprite.from(resources.bg.data)
        bg.filters = [new ReflectionFilter({})]
        bg.anchor.x = 0.5
        bg.x = this.width / 2
        bg.anchor.y = 0.5
        bg.y = this.height / 2
        bg.width = this.width
        bg.height = this.height
        setTimeout(() => {
          this.app.stage.addChild(bg)
          this.animate()
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
