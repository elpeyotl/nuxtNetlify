<template>
  <div>
    <h2>{{ post.title }}</h2>
    <nuxt-content :document="post" />
    <img :src="post.thumbnail" />
    <div v-for="album in albums" :key="album.slug">
      {{ album.title }} {{ album.artist }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let post
    let albums
    try {
      post = await $content('blog', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    try {
      albums = await $content('albums')
        .where({ slug: { $in: post.albums } })
        .fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      post,
      albums,
    }
  },
}
</script>
