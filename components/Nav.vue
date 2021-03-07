<template>
  <div
    class="h-8 lg:h-12 flex justify-center mx-auto items-center w-3/4 justify-evenly"
  >
    <nuxt-link
      v-for="link in links"
      :key="link"
      :to="`/${link}`"
      class="uppercase"
      >{{ link }}</nuxt-link
    >
    <a href="https://shop.theyellinglight.ch/" target="_blank">SHOP</a>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  setup() {
    const links = ref([
      'news',
      'releases',
      'artists',
      'photography',
      'newsletter',
    ])
    return {
      links,
    }
  },
}
</script>

<style></style>
