<template>
  <div>
    <div class="social flex w-64 mb-4">
      <a
        v-if="artist.facebook"
        :href="artist.facebook"
        target="_blank"
        title="Facebook"
        class="mr-4"
      >
        <svg-icon name="facebook" class="icon hover:text-red-500"
      /></a>
      <a
        v-if="artist.instagram"
        :href="artist.instagram"
        target="_blank"
        title="Instagram"
        class="mr-4"
      >
        <svg-icon name="instagram" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="artist.youtube"
        :href="artist.youtube"
        target="_blank"
        title="Youtube"
        class="mr-4"
      >
        <svg-icon name="youtube" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="artist.twitter"
        :href="artist.twitter"
        target="_blank"
        title="Twitter"
        class="mr-4"
      >
        <svg-icon name="twitter" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="artist.email"
        :href="`mailto:${artist.email}`"
        target="_blank"
        title="E-Mail"
        class="mr-4"
      >
        <svg-icon name="mail" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="artist.bandcamp"
        :href="artist.bandcamp"
        target="_blank"
        title="Bandcamp"
        class="mr-4"
      >
        <svg-icon name="bandcamp" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="artist.website"
        :href="artist.website"
        target="_blank"
        title="Website"
        class="mr-4"
      >
        <svg-icon name="url" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="artist.webshop"
        :href="artist.webshop"
        target="_blank"
        title="Webshop"
        class="mr-4"
      >
        <svg-icon name="basket" class="icon hover:text-red-500" />
      </a>
    </div>
  </div>
</template>

<script>
import '@/icons'
export default {
  name: 'SocialArtist',
  props: {
    artist: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.icon {
  transition: color 0.5s ease;
}
</style>
