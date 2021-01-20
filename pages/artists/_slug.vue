<template>
  <div>
    <div
      class="w-full h-64 bg-cover"
      :style="{ backgroundImage: 'url(' + artist.headerImage + ')' }"
    ></div>

    <div class="flex">
      <div class="w-1/2">
        <h2 class="text-2xl font-semibold">{{ artist.artist }}</h2>
        <p class="text-lg font-light">{{ artist.description }}</p>
      </div>
      <div class="w-1/2"><img :src="artist.thumbnail" /></div>
    </div>

    <nuxt-content :document="artist" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let artist
    try {
      artist = await $content('artists', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      artist,
    }
  },
}
</script>
