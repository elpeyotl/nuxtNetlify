<template>
  <div>
    <h3 class="text-2xl font-semibold mt-8 mb-4">News</h3>
    <div v-for="post of posts" :key="post.slug">
      <NuxtLink
        :to="`blog/${post.slug}`"
        class="bg-red-300 inline-block p-4 rounded-md shadow-md hover:bg-red-500 transition-colors duration-500 ease-in-out"
      >
        {{ post.title }}
      </NuxtLink>
    </div>

    <h3 class="text-2xl font-semibold mt-8 mb-4">Artists</h3>
    <div v-for="artist of artists" :key="artist.slug">
      <NuxtLink
        :to="`artists/${artist.slug}`"
        class="bg-red-300 inline-block p-4 rounded-md shadow-md hover:bg-red-500 transition-colors duration-500 ease-in-out my-2"
      >
        <h2 class="text-2xl">{{ artist.artist }}</h2>
      </NuxtLink>
    </div>

    <h3 class="text-2xl font-semibold mt-8 mb-4">Releases</h3>
    <div v-for="album of albums" :key="album.slug">
      <NuxtLink
        :to="`albums/${album.slug}`"
        class="bg-red-300 inline-block p-4 rounded-md shadow-md hover:bg-red-500 transition-colors duration-500 ease-in-out my-2"
      >
        <h3 class="text-2xl">{{ album.artist }}</h3>
        {{ album.title }}
      </NuxtLink>
    </div>

    <h3 class="text-2xl font-semibold mt-8 mb-4">Photography</h3>
    <div v-for="album of albums" :key="album.slug">
      <NuxtLink
        :to="`albums/${album.slug}`"
        class="bg-red-300 inline-block p-4 rounded-md shadow-md hover:bg-red-500 transition-colors duration-500 ease-in-out my-2"
      >
        <h3 class="text-2xl">{{ album.artist }}</h3>
        {{ album.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog').fetch()
    const albums = await $content('albums').fetch()
    const artists = await $content('artists').fetch()

    return {
      posts,
      albums,
      artists,
    }
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
