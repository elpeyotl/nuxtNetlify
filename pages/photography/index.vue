<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">Photography</h1>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="photo in photos"
        :key="photo.slug"
        :content="photo"
        :is-photo="true"
      />
    </div>
  </div>
</template>

<script>
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  name: 'Artists',
  async asyncData({ $content, params, error }) {
    let photos
    try {
      photos = await $content('photos')
        .where({
          isPrivate: false,
        })
        .sortBy('date', 'desc')
        .fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {}
    return {
      photos,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  head() {
    return {
      title: `${pageTitle} - Photography`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Releases from the yelling light',
        },
      ],
    }
  },
}
</script>

<style></style>
