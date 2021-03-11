<template>
  <div>
    <img v-lazy="url" class="box mb-4" :title="title" />
  </div>
</template>

<script>
export default {
  name: 'LazyLoad',
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
img {
  opacity: 0;
  transition: opacity 0.5s ease;
}

img[lazy='loaded'] {
  opacity: 1;
}
</style>
