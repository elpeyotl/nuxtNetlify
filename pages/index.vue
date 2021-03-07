<template>
  <div>
    <div>
      <div class="w-full mb-12">
        <img src="/img/yelling-logo.jpg" title="The yelling light" />
      </div>
      <h2 class="text-2xl w-1/2 font-semibold mb-8">
        Welcome to the yelling light
      </h2>
      <p class="text-lg font-light text-justify">HOOSA</p>
    </div>
    <h3 class="text-2xl font-semibold mt-8 mb-4">News</h3>
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
    return {
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

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.yl-image {
  max-width: 800px;
  height: auto;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
