<template>
  <div>
    <div
      v-if="artist.headerImage"
      class="w-full shadow-xl h-64 bg-cover mb-16"
      :style="{ backgroundImage: 'url(' + artist.headerImage + ')' }"
    ></div>
    <h2 class="text-2xl w-1/2 font-semibold mb-8">{{ artist.artist }}</h2>
    <div class="mb-16 flex">
      <div class="w-1/2 pr-16">
        <p class="text-lg font-light text-justify">{{ artist.description }}</p>
      </div>
      <div class="w-1/2"><img :src="artist.thumbnail" /></div>
    </div>

    <nuxt-content :document="artist" />

    <div class="flex">
      <iframe
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${artist.youtubeId}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <iframe
        :src="`https://open.spotify.com/embed/artist/${artist.spotifyId}`"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let artist
    try {
      artist = await $content('artists', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Artist not found' })
    }
    return {
      artist,
    }
  },
}
</script>
