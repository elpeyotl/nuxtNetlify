<template>
  <div>
    <div class="w-full mb-12 flex justify-center">
      <img :src="album.thumbnail" class="w-1/2" />
    </div>

    <div class="my-24 flex">
      <div class="w-2/3 pr-16">
        <h2 class="text-2xl font-semibold">{{ album.title }}</h2>
        <h3 class="text-lg font-semibold">
          <nuxt-link :to="`/artists/${artist[0].slug}`"
            >{{ album.artist }} {{ artist.slug }}</nuxt-link
          >
        </h3>
        <p class="text-sm font-light text-justify">
          {{ album.recordLabel }}<br />
          {{ showYear(album.date) }}
        </p>
        <h3 v-if="album.lineup" class="text-xl font-semibold mt-16">Line-up</h3>
        {{ album.lineup }}
      </div>
      <div class="w-1/3 flex justify-end">
        <spotify-embed
          v-if="album.spotifyId"
          :is-album="true"
          :spotify-id="album.spotifyId"
        />
      </div>
    </div>

    <div class="mb-12">
      <youtube-embed v-if="album.youtubeId" :youtube-id="album.youtubeId" />
    </div>
    <nuxt-content :document="album" />
  </div>
</template>

<script>
import spotifyEmbed from '../../components/spotifyEmbed.vue'
export default {
  components: { spotifyEmbed },
  async asyncData({ $content, params, error }) {
    let album
    let artist
    try {
      album = await $content('albums', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    try {
      artist = await $content('artists')
        .where({
          artist: {
            $regex: [album.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      album,
      artist,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  methods: {
    showYear(date) {
      const parsedDdate = new Date(date)
      return parsedDdate.getFullYear()
    },
  },
}
</script>
