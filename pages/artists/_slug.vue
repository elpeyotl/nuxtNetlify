<template>
  <div>
    <div class="w-full mb-12">
      <img v-lazy="artist.headerImage" />
      <span class="italic font-light text-xs flex justify-end">
        {{ artist.headerImage__caption }}
      </span>
    </div>
    <h2 class="text-2xl w-1/2 font-semibold mb-8">{{ artist.artist }}</h2>
    <div class="mb-16 flex flex-col lg:flex-row">
      <div class="w-full lg:w-2/3 pr-16">
        <p class="text-lg font-light text-justify">{{ artist.description }}</p>
        <h3 class="text-xl font-semibold mt-16">Biography</h3>
        {{ artist.biography }}
      </div>
      <div
        class="w-full lg:w-1/3 flex justify-start lg:justify-end mt-12 lg:mt-0"
      >
        <spotify-embed v-if="artist.spotifyId" :spotify-id="artist.spotifyId" />
      </div>
    </div>

    <div class="mb-12">
      <youtube-embed v-if="artist.youtubeId" :youtube-id="artist.youtubeId" />
    </div>

    <nuxt-content class="mb-12" :document="artist" />

    <div v-if="albums.length">
      <h3 class="text-xl font-semibold mb-2">
        Releases through The yelling light
      </h3>
      <div class="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="album in albums"
          :key="album.slug"
          :content="album"
          :is-album="true"
        />
      </div>
    </div>
    <div v-if="photos.length">
      <h3 class="text-xl font-semibold mt-16 mb-2">Photos</h3>
      <div class="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="photo in photos"
          :key="photo.slug"
          :content="photo"
          :is-photo="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  async asyncData({ $content, params, error }) {
    let artist
    let albums
    let photos
    try {
      artist = await $content('artists', params.slug).fetch()
    } catch (e) {}
    try {
      albums = await $content('albums')
        .where({
          artist: {
            $regex: [artist.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {}
    try {
      photos = await $content('photos')
        .where({
          artist: {
            $regex: [artist.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {}
    return {
      artist,
      albums,
      photos,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', this.artist.thumbnail)
  },
  head() {
    return {
      title: `${pageTitle} - ${this.artist.artist} `,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.artist.artist}  - ${this.artist.description}`,
        },
      ],
    }
  },
}
</script>
