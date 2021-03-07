<template>
  <div>
    <div class="mb-16">
      <div class="w-full mb-16">
        <img src="/img/yelling-logo.jpg" title="The yelling light" />
      </div>
      <h2 class="text-2xl w-1/2 font-semibold mb-8">
        {{ home.title }}
      </h2>
      <nuxt-content :document="home" />
    </div>
    <h3 class="text-2xl font-semibold mt-8 my-4">News</h3>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="post in posts"
        :key="post.slug"
        :content="post"
        :is-news="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog').sortBy('createdAt', 'desc').fetch()
    const home = await $content('pages', 'home').fetch()
    return {
      home,
      posts,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
}
</script>

<style></style>
