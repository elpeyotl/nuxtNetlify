<template>
  <iframe
    width="560"
    height="315"
    :src="`https://www.youtube.com/embed/${youtubeId}`"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  props: {
    youtubeId: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
