<template>
  <div>
    <div class="mb-12 flex justify-center w-full">
      <div class="w-1/2">
        <img v-lazy="album.thumbnail" />
        <span class="italic font-light text-xs flex justify-end">
          {{ album.caption }}
        </span>
      </div>
    </div>

    <div class="my-12 md:my-24 flex flex-col md:flex-row">
      <div class="w-full md:w-2/3 pr-16">
        <social-bar :content="album" />
        <h2 class="text-2xl font-semibold">{{ album.title }}</h2>
        <h3 class="text-lg font-semibold">
          <nuxt-link :to="`/artists/${artist[0].slug}`"
            >{{ album.artist }} {{ artist.slug }}</nuxt-link
          >
        </h3>
        <p class="text-sm font-light text-justify">
          {{ album.recordLabel }}<br />
          {{ showYear(album.date) }}<br />
        </p>
        <div v-if="album.genres" class="text-xs font-light text-justify">
          <span
            v-for="genre in album.genres"
            :key="genre"
            class="bg-red-300 p-1 rounded mr-1 text-center"
            >{{ genre }}</span
          >
        </div>
        <h3 v-if="album.lineup" class="text-xl font-semibold mt-16">Line-up</h3>
        {{ album.lineup }}
      </div>
      <div class="w-full md:w-1/3 flex md:justify-end mt-12 md:mt-0">
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

    <nuxt-content class="mb-12" :document="album" />

    <div v-if="artist.length">
      <h3 class="text-xl text-left font-semibold mb-2">Artist</h3>
      <div class="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="band in artist" :key="band.slug" :content="band" />
      </div>
    </div>
  </div>
</template>

<script>
import spotifyEmbed from '../../components/spotifyEmbed.vue'
import { pageTitle } from '~/config/yellingLightSettings'
export default {
  components: { spotifyEmbed },
  async asyncData({ $content, params, error }) {
    let album
    let artist
    try {
      album = await $content('albums', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {}
    try {
      artist = await $content('artists')
        .where({
          artist: {
            $regex: [album.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {}
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
  head() {
    return {
      title: `${pageTitle} - ${this.album.title} - ${this.artist[0].slug}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.album.title}  - ${this.artist[0].slug}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.album.title}  - ${this.album.description}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.album.title}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://www.theyellinglight.ch${this.artist.thumbnail}`,
        },
      ],
    }
  },
}
</script>
