<template>
  <div class="text-center">
    <h2 class="text-4xl font-light mb-8">{{ content.title }}</h2>
    <div class="mb-16">
      <nuxt-content :document="content" />
    </div>

    <div v-for="image in content.galleryImages" :key="image.image">
      <div class="mb-12">
        <lazy-load :url="image.image" :title="image.caption" />
        <span class="italic font-light text-sm">{{ image.caption }}</span>
      </div>
    </div>

    <div v-if="artists.length">
      <h3 class="text-xl text-left font-semibold mb-2">
        Artist<span v-if="artists.length > 1">s</span>
      </h3>
      <div class="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="artist in artists" :key="artist.slug" :content="artist" />
      </div>
    </div>
  </div>
</template>

<script>
import LazyLoad from '~/components/lazyLoad'
export default {
  components: { LazyLoad },
  async asyncData({ $content, params, error }) {
    let content
    let artists
    try {
      content = await $content('photos', params.slug).fetch()
    } catch (e) {
      error({ message: 'Not found' })
    }
    try {
      artists = await $content('artists')
        .where({
          artist: {
            $regex: [content.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      artists,
      content,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', this.content.thumbnail)
  },
}
</script>
