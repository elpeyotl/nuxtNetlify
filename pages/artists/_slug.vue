<template>
  <div>
    <div
      class="w-full shadow-xl h-56 bg-cover mb-16"
      :style="{ backgroundImage: 'url(' + artist.headerImage + ')' }"
    ></div>
    <h2 class="text-2xl w-1/2 font-semibold mb-8">{{ artist.artist }}</h2>
    <div class="mb-16 flex">
      <div class="w-1/2 pr-16">
        <p class="text-lg font-light text-justify">{{ artist.description }}</p>
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
