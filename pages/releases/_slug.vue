<template>
  <div>
    <div class="w-full mb-12 flex justify-center">
      <img :src="album.thumbnail" class="w-1/2" />
    </div>
    <h2 class="text-2xl font-semibold mt-8">{{ album.title }}</h2>
    <h3 class="text-lg font-semibold">{{ album.artist }}</h3>
    <div class="mb-16 flex">
      <div class="w-2/3 pr-16">
        <p class="text-lg font-light text-justify">
          {{ album.description }}
        </p>
        <nuxt-content :document="album" />
      </div>
      <div class="w-1/3 flex justify-end">
        <spotify-embed v-if="album.spotifyId" :spotify-id="album.spotifyId" />
      </div>
    </div>

    <div class="mb-12">
      <youtube-embed v-if="album.youtubeId" :youtube-id="album.youtubeId" />
    </div>
  </div>
</template>

<script>
import spotifyEmbed from '../../components/spotifyEmbed.vue'
export default {
  components: { spotifyEmbed },
  async asyncData({ $content, params, error }) {
    let album
    try {
      album = await $content('albums', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      album,
    }
  },
}
</script>
