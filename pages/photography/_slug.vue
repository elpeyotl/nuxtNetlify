<template>
  <div>
    <h2 class="text-2xl w-1/2 font-semibold mb-8">{{ content.title }}</h2>
    <div class="mb-16 flex flex-col lg:flex-row">asdf</div>

    <h3 class="text-xl font-semibold mt-16">Artists</h3>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!--<Card
        v-for="album in albums"
        :key="album.slug"
        :content="album"
        :is-album="true"
      />-->
    </div>

    <nuxt-content :document="content" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let content
    try {
      content = await $content('photos', params.slug).fetch()
    } catch (e) {
      error({ message: 'Not found' })
    }
    return {
      content,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', this.artist.thumbnail)
  },
}
</script>
