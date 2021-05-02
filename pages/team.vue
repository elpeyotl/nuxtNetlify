<template>
  <div>
    <div class="mb-16">
      <div class="flex justify-center">
        <h1 class="text-4xl font-semibold">The Yelling Light team</h1>
      </div>
    </div>

    <div class="team">
      <div class="w-full relative mb-4 p-2">
        <img class="shadow-2xl team__image w-full" src="/img/me.jpg" />
        <div class="team__caption w-2/3">
          <div class="text-center mb-2 text-lg mx-auto">
            <span class="bg-red-500 px-2 py-1"> Chris Perez </span>
          </div>
          <div class="text-center mb-8 text-sm mx-auto">
            <span class="bg-red-500 px-2 py-1">Webdesigner</span>
          </div>
          <div class="text-center mb-2 text-sm mx-auto">
            <span class="bg-red-500 px-2 py-1 text-center inline">
              Music was my first love! I like geeky stuff, nature and of course
              fucking awsome concerts!!
            </span>
          </div>
        </div>
      </div>

      <div class="w-full relative mb-4 p-2">
        <img class="shadow-2xl team__image" src="/img/puffler.jpg" />
        <div class="team__caption w-2/3">
          <div class="text-center mb-2 text-lg mx-auto">
            <span class="bg-red-500 px-2 py-1"> Christan Poffet </span>
          </div>
          <div class="text-center mb-8 text-lg mx-auto">
            <span class="bg-red-500 px-2 py-1">El Maestro</span>
          </div>
          <div class="text-center mb-2 text-sm mx-auto">
            <span class="bg-red-500 px-2 py-1 text-center inline">
              He's the best. Brain behind the Yelling Light. Love everywhere!
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  name: 'Team',
  async asyncData({ $content }) {
    const posts = await $content('blog').sortBy('createdAt', 'desc').fetch()
    const home = await $content('pages', 'home').fetch()
    return {
      home,
      posts,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  head() {
    return {
      title: `${pageTitle} - The Team`,
      script: [
        {
          src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
          defer: true,
        },
      ],
    }
  },
}
</script>

<style scoped>
.team__image {
  filter: grayscale(1);
  cursor: pointer;
  transition: filter 0.2s ease;
}

.team__image:hover {
  filter: grayscale(0);
}
.team__caption {
  @apply text-white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
