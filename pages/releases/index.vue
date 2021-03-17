<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">Releases</h1>

    <div class="filter hidden md:block">
      <div class="flex justify-center mt-6">
        <div
          v-for="genre in genres"
          :key="genre.genre"
          :class="{ 'bg-red-400': selectedGenres.includes(genre.genre) }"
          class="bg-red-300 rounded mr-2 px-2 py-1 cursor-pointer transition-colors duration-500 hover:bg-red-400"
          @click="handleGenreClick(genre.genre)"
        >
          {{ genre.genre }}
        </div>
      </div>
      <div v-if="selectedGenres.length" class="flex justify-center">
        <span
          class="justify-center rounded mt-4 px-2 py-1 cursor-pointer transition-colors duration-500 hover:bg-red-400"
          @click="selectedGenres = []"
        >
          RESET
        </span>
      </div>
    </div>

    <div v-if="filteredAlbums.length">
      <transition-group
        name="fade"
        class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <Card
          v-for="album in filteredAlbums"
          :key="album.slug"
          class="item"
          :content="album"
          :is-album="true"
          :show-artist="true"
        />
      </transition-group>
    </div>
    <div v-else class="text-center text-xl uppercase mt-24">
      No albums found
    </div>
  </div>
</template>

<script>
export default {
  name: 'Releases',
  async asyncData({ $content, params, error }) {
    let albums
    let genres
    try {
      albums = await $content('albums').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    try {
      genres = await $content('genres').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Blog Post not found' })
    }
    return {
      albums,
      genres,
    }
  },
  data: () => {
    return {
      selectedGenres: [],
    }
  },
  computed: {
    filteredAlbums() {
      if (this.selectedGenres.length) {
        return this.albums.filter((item) => {
          if (typeof item.genres !== 'undefined') {
            return item.genres.some((genre) =>
              this.selectedGenres.includes(genre)
            )
          }
        })
      } else {
        return this.albums
      }
    },
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  methods: {
    handleGenreClick(item) {
      if (!this.selectedGenres.includes(item)) {
        this.selectedGenres.push(item)
      } else {
        const index = this.selectedGenres.indexOf(item)
        if (index > -1) {
          this.selectedGenres.splice(index, 1)
        }
      }
    },
  },
}
</script>

<style></style>
