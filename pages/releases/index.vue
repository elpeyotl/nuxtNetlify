<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">Releases</h1>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="album in albums"
        :key="album.slug"
        :content="album"
        :is-album="true"
        :show-artist="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Releases',
  async asyncData({ $content, params, error }) {
    let albums
    try {
      albums = await $content('albums').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      albums,
    }
  },
}
</script>

<style></style>
