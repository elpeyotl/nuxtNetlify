<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">News</h1>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="post in posts"
        :key="post.slug"
        :content="post"
        :is-news="true"
        :show-artist="true"
      />
    </div>
  </div>
</template>

<script>
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  name: 'Releases',
  async asyncData({ $content, params, error }) {
    let posts
    try {
      posts = await $content('blog').sortBy('createdAt', 'desc').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      posts,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  head() {
    return {
      title: `${pageTitle} - News`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'News',
        },
      ],
    }
  },
}
</script>

<style></style>
