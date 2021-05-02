<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">Releases</h1>

    <div class="flex justify-center items-center">
      <span class="justify-center mt-4 px-2 py-1 bg-red-500 text-white mr-2"
        >Showing {{ filteredAlbums.length }} release<span
          v-if="filteredAlbums.length > 1"
          >s</span
        ></span
      >
      <span
        v-if="selectedGenres.length"
        class="hidden md:inline justify-center mt-4 px-2 py-1 bg-black text-white cursor-pointer transition-colors duration-500 hover:bg-red-500 hover:text-white"
        @click="selectedGenres = []"
      >
        Reset
      </span>
    </div>

    <div class="md:hidden mt-8">
      <multiselect
        v-model="multiSelectValue"
        :options="genres"
        :multiple="true"
        placeholder="Filter genres"
        track-by="genre"
        label="genre"
        select-label="Select"
        deselect-label="Deselect"
        @select="handleGenreClick"
        @remove="handleGenreClick"
      ></multiselect>
    </div>

    <div class="filter hidden md:block">
      <div class="flex justify-center flex-wrap mt-6">
        <div
          v-for="genre in genres"
          :key="genre.genre"
          :class="{ 'filter--active': selectedGenres.includes(genre.genre) }"
          class="border-b-4 border-black mr-4 mt-4 px-2 py-1 cursor-pointer transition-colors duration-500 hover:border-red-500"
          @click="handleGenreClick(genre.genre)"
        >
          {{ genre.genre }}
        </div>
      </div>
    </div>

    <div v-if="filteredAlbums.length">
      <transition-group
        name="fade"
        mode="out-in"
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
import Multiselect from 'vue-multiselect'
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  name: 'Releases',
  components: { Multiselect },
  async asyncData({ $content, params, error }) {
    let albums
    let genres
    try {
      albums = await $content('albums').sortBy('date', 'desc').fetch()
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
      multiSelectValue: [],
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
    if (Array.isArray(this.$route.query.genre)) {
      this.selectedGenres.push(...this.$route.query.genre)
      this.multiSelectValue = this.genres.filter((genre) =>
        this.$route.query.genre.includes(genre.genre)
      )
    } else if (this.$route.query.genre) {
      this.selectedGenres.push(this.$route.query.genre)
      this.multiSelectValue = this.genres.filter(
        (genre) => genre.genre === this.$route.query.genre
      )
    }
  },
  methods: {
    handleGenreClick(item) {
      if (typeof item === 'object' && item !== null) {
        item = item.genre
      }
      if (!this.selectedGenres.includes(item)) {
        this.selectedGenres.push(item)
        // add to param
        this.$router.push({
          path: 'releases',
          query: { genre: this.selectedGenres },
        })
      } else {
        const index = this.selectedGenres.indexOf(item)
        if (index > -1) {
          this.selectedGenres.splice(index, 1)
          this.$router.push({
            path: 'releases',
            query: { genre: this.selectedGenres },
          })
        }
      }
    },
  },
  head() {
    return {
      title: `${pageTitle} - Releases`,
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.filter--active {
  @apply bg-black text-white border-red-500;
}
.multiselect__tag {
  @apply bg-red-500;
}
.multiselect__tag-icon:after {
  color: white;
}
.multiselect__tag-icon:hover {
  @apply bg-red-600;
}
</style>
