<template>
  <div class="relative">
    <div class="w-full mb-12 flex justify-center">
      <img v-lazy="post.thumbnail" class="w-1/2" />
    </div>

    <div class="mb-12">
      <social-bar :content="post" />
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
      {{ showDate(post.date) }}
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
    <div
      v-if="post.artist"
      class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <Card v-for="artist in artists" :key="artist.id" :content="artist" />
    </div>
    <div
      v-if="post.albums"
      class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <Card
        v-for="(album, index) in albums"
        :key="index"
        :content="album"
        :is-album="true"
      />
    </div>

    <div
      v-if="post.photos"
      class="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <Card
        v-for="photo in photos"
        :key="photo.slug"
        :content="photo"
        :is-photo="true"
      />
    </div>
  </div>
</template>

<script>
import { parseISO, format } from 'date-fns'
import SpotifyEmbed from '~/components/spotifyEmbed'
import { pageTitle } from '~/config/yellingLightSettings'
export default {
  components: { SpotifyEmbed },
  async asyncData({ $content, params, error }) {
    let post
    let albums
    let photos
    let artists
    try {
      post = await $content('blog', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {}
    try {
      albums = await $content('albums')
        .where({
          slug: {
            $regex: [post.albums, 'i'],
          },
        })
        .sortBy('title', 'asc')
        .fetch()
    } catch (e) {}

    try {
      artists = await $content('artists')
        .where({
          artist: {
            $regex: [post.artist, 'i'],
          },
        })
        .sortBy('title', 'asc')
        .fetch()
    } catch (e) {}

    try {
      photos = await $content('photos')
        .where({
          slug: {
            $regex: [post.photos, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {}
    try {
    } catch (e) {}
    return {
      post,
      albums,
      photos,
      artists,
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
  head() {
    return {
      title: `${pageTitle} - ${this.post.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.post.description}`,
        },
      ],
    }
  },
}
</script>
