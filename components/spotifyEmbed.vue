<template>
  <iframe
    :src="spotifyUrl"
    width="300"
    height="380"
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media"
  ></iframe>
</template>

<script>
export default {
  props: {
    spotifyId: {
      type: String,
      default: '',
    },
    isAlbum: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    spotifyUrl() {
      return this.isAlbum
        ? `https://open.spotify.com/embed/album/${this.spotifyId}`
        : `https://open.spotify.com/embed/artist/${this.spotifyId}`
    },
  },
}
</script>

<style></style>
