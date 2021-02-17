<template>
  <iframe
    :src="`https://open.spotify.com/embed/artist/${spotifyId}`"
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
  },
}
</script>

<style></style>
