<template>
  <div>
    <h2 class="text-2xl font-semibold mt-8">{{ artist.artist }}</h2>
    <h3 class="text-lg font-semibold">{{ artist.description }}</h3>
    <nuxt-content :document="artist" />
    <img class="mt-4" :src="artist.thumbnail" />
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
