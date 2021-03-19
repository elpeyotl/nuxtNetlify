<template>
  <div>
    <div class="social flex justify-evenly py-2 w-64 h-12">
      <img src="~/assets/icons/facebook.svg" />
      <img src="~/assets/icons/instagram.svg" />
      <img src="~/assets/icons/mail.svg" />
      <img src="~/assets/icons/twitter.svg" />
      <img src="~/assets/icons/youtube.svg" />
    </div>
  </div>
</template>

<script>
import '~/icons'
export default {
  name: 'Social',
}
</script>

<style scoped>
.social {
  img {
    height: 6px;
  }
}
</style>
