<template>
  <div>
    <h2 class="text-2xl font-semibold mt-8 mb-4">{{ post.title }}</h2>
    <nuxt-content :document="post" />
    <img class="mt-4" :src="post.thumbnail" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let post
    try {
      post = await $content('blog', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      post,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
}
</script>
