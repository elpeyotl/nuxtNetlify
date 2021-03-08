<template>
  <div class="relative">
    <div class="w-full mb-12 flex justify-center">
      <img :src="post.thumbnail" class="w-1/2" />
    </div>

    <!--<div
      class="lr_embed"
      style="
        position: relative;
        padding-bottom: 50%;
        height: 0;
        overflow: hidden;
      "
    >
      <iframe
        id="iframe"
        src="https://lightroom.adobe.com/embed/shares/c214d285dcf84d18a59552b62568edb6/slideshow?background_color=%232D2D2D&color=%23999999"
        frameborder="0"
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0"
      ></iframe>
    </div>-->

    <div class="mb-12">
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
      {{ showDate(post.createdAt) }}
    </div>
    <nuxt-content :document="post" />

    <div class="flex justify-between">
      <div class="mt-16 mb-12">
        <youtube-embed v-if="post.youtubeId" :youtube-id="post.youtubeId" />
      </div>
      <div>
        <spotify-embed
          v-if="post.spotifyId"
          :is-album="true"
          :spotify-id="post.spotifyId"
        />
      </div>
    </div>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="album in albums"
        :key="album"
        :content="album"
        :is-album="true"
      />
    </div>
  </div>
</template>

<script>
import { parseISO, format } from 'date-fns'
import SpotifyEmbed from '~/components/spotifyEmbed'
export default {
  components: { SpotifyEmbed },
  async asyncData({ $content, params, error }) {
    let post
    let albums
    try {
      post = await $content('blog', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    try {
      albums = await $content('albums')
        .where({
          slug: {
            $regex: [...post.albums, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      post,
      albums,
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
