<template>
  <div>
    <div class="w-full mb-12 flex justify-center">
      <img :src="post.thumbnail" class="w-1/2" />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
      {{ showDate(post.createdAt) }}
    </div>
    <nuxt-content :document="post" />
    <div class="mb-12">
      <youtube-embed v-if="post.youtubeId" :youtube-id="album.youtubeId" />
    </div>
  </div>
</template>

<script>
import { parseISO, format } from 'date-fns'
export default {
  async asyncData({ $content, params, error }) {
    let post
    let artist
    try {
      post = await $content('blog', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    try {
      artist = await $content('artists')
        .where({
          artist: {
            $regex: [post.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      post,
      artist,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  methods: {
    showDate(date) {
      const parsedDate = parseISO(date)
      return format(parsedDate, 'dd.MM.yyyy')
    },
  },
}
</script>
