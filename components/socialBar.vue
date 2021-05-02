<template>
  <div :class="isCenter">
    <div class="social flex w-64 mb-4">
      <a
        v-if="content.facebook"
        :href="content.facebook"
        target="_blank"
        title="Facebook"
        class="mr-4"
      >
        <svg-icon name="facebook" class="icon hover:text-red-500"
      /></a>
      <a
        v-if="content.instagram"
        :href="content.instagram"
        target="_blank"
        title="Instagram"
        class="mr-4"
      >
        <svg-icon name="instagram" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="content.youtube"
        :href="content.youtube"
        target="_blank"
        title="Youtube"
        class="mr-4"
      >
        <svg-icon name="youtube" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="content.twitter"
        :href="content.twitter"
        target="_blank"
        title="Twitter"
        class="mr-4"
      >
        <svg-icon name="twitter" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="content.email"
        :href="`mailto:${content.email}`"
        target="_blank"
        title="E-Mail"
        class="mr-4"
      >
        <svg-icon name="mail" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="content.bandcamp"
        :href="content.bandcamp"
        target="_blank"
        title="Bandcamp"
        class="mr-4"
      >
        <svg-icon name="bandcamp" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="content.website"
        :href="content.website"
        target="_blank"
        title="Website"
        class="mr-4"
      >
        <svg-icon name="url" class="icon hover:text-red-500" />
      </a>
      <a
        v-if="content.webshop"
        :href="content.webshop"
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
  name: 'SocialBar',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isCenter() {
      if (this.center) {
        return 'flex justify-center'
      }
      return ''
    },
  },
}
</script>

<style scoped>
.icon {
  transition: color 0.5s ease;
}
</style>
