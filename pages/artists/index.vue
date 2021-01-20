<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">Artists</h1>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <CardArtist
        v-for="artist in artists"
        :key="artist.slug"
        :content="artist"
      />
    </div>
  </div>
</template>

<script>
import CardArtist from '../../components/CardArtist.vue'
export default {
  name: 'Artists',
  components: { CardArtist },
  async asyncData({ $content, params, error }) {
    let artists
    try {
      artists = await $content('artists').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      artists,
    }
  },
}
</script>

<style></style>
