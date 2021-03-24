<template>
  <div>
    <div class="mb-16">
      <h2 class="text-2xl w-1/2 font-semibold mb-8">
        {{ content.title }}
      </h2>
      <nuxt-content :document="content" />
    </div>
  </div>
</template>

<script>
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  async asyncData({ $content }) {
    const content = await $content('pages', 'disclaimer').fetch()
    return {
      content,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  head() {
    return {
      title: `${pageTitle} - Disclaimer`,
    }
  },
}
</script>

<style></style>
