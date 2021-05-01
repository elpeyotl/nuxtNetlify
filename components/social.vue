<template>
  <div>
    <div class="social flex justify-around w-64">
      <a :href="settings.facebook" target="_blank">
        <svg-icon name="facebook" class="icon text-white hover:text-red-500"
      /></a>
      <a :href="settings.instagram" target="_blank">
        <svg-icon name="instagram" class="icon text-white hover:text-red-500" />
      </a>
      <a :href="settings.youtube" target="_blank">
        <svg-icon name="youtube" class="icon text-white hover:text-red-500" />
      </a>
      <a :href="settings.twitter" target="_blank">
        <svg-icon name="twitter" class="icon text-white hover:text-red-500" />
      </a>
      <a :href="`mailto:${settings.mail}`" target="_blank">
        <svg-icon name="mail" class="icon text-white hover:text-red-500" />
      </a>
    </div>
  </div>
</template>

<script>
import '@/icons'
export default {
  name: 'Social',
  data() {
    return {
      settings: [],
    }
  },
  async mounted() {
    this.settings = await this.$content('pages', 'settings').fetch()
  },
}
</script>

<style scoped>
.icon {
  transition: color 0.5s ease;
}
</style>
