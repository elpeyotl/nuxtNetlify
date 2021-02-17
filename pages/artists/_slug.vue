<template>
  <div>
    <!-- <div
      v-if="artist.headerImage"
      class="w-full shadow-xl h-64 bg-cover mb-16"
      :style="{ backgroundImage: 'url(' + artist.headerImage + ')' }"
    ></div> -->
    <div class="w-full mb-12">
      <img :src="artist.thumbnail" />
    </div>
    <h2 class="text-2xl w-1/2 font-semibold mb-8">{{ artist.artist }}</h2>
    <div class="mb-16 flex">
      <div class="w-2/3 pr-16">
        <p class="text-lg font-light text-justify">{{ artist.description }}</p>
        <h3 class="text-xl font-semibold mt-16">Biography</h3>
        {{ artist.biography }}
      </div>
      <div class="w-1/3 flex justify-end">
        <spotify-embed v-if="artist.spotifyId" :spotify-id="artist.spotifyId" />
      </div>
    </div>

    <div class="mb-12">
      <youtube-embed v-if="artist.youtubeId" :youtube-id="artist.youtubeId" />
    </div>

    <h3 class="text-xl font-semibold mt-16">Discography</h3>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="album in albums"
        :key="album.slug"
        :content="album"
        :is-album="true"
      />
    </div>

    <nuxt-content :document="artist" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let artist
    let albums
    try {
      artist = await $content('artists', params.slug).fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    try {
      albums = await $content('albums')
        .where({
          artist: {
            $regex: [artist.artist, 'i'],
          },
        })
        .sortBy('createdAt', 'asc')
        .fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      artist,
      albums,
    }
  },
}
</script>
