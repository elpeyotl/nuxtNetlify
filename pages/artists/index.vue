<template>
  <div>
    <h1 class="text-4xl font-semibold text-center">Artists</h1>
    <div class="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card v-for="artist in artists" :key="artist.slug" :content="artist" />
    </div>
  </div>
</template>

<script>
import { pageTitle } from "~/config/yellingLightSettings";

export default {
  name: "Artists",
  async asyncData({ $content, params, error }) {
    let artists;
    try {
      artists = await $content("artists")
        .where({
          isPrivate: false,
        })
        .sortBy("slug", "asc")
        .fetch();
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: "Blog Post not found" });
    }
    return {
      artists,
    };
  },
  mounted() {
    this.$store.commit("updateBgImage", false);
  },
  head() {
    return {
      title: `${pageTitle} - Artists`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Artist from the yelling light",
        },
      ],
    };
  },
};
</script>
