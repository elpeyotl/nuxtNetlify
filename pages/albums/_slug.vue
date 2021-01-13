<template>
  <div>
    <h2 class="text-2xl font-semibold mt-8">{{ album.title }}</h2>
    <h3 class="text-lg font-semibold">{{ album.artist }}</h3>
    <nuxt-content :document="album" />
    <img class="mt-4" :src="album.thumbnail" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let album
    try {
      album = await $content('albums', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      album,
    }
  },
}
</script>
