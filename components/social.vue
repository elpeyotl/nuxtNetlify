<template>
  <div>
    <div class="social flex justify-around py-2 w-64">
      <svg-icon name="facebook" class="icon text-white hover:text-red-500" />
      <svg-icon name="instagram" class="icon text-white hover:text-red-500" />
      <svg-icon name="youtube" class="icon text-white hover:text-red-500" />
      <svg-icon name="twitter" class="icon text-white hover:text-red-500" />
      <svg-icon name="mail" class="icon text-white hover:text-red-500" />
    </div>
  </div>
</template>

<script>
import '@/icons'
export default {
  name: 'Social',
}
</script>

<style scoped>
.icon {
  transition: color 0.5s ease;
}
</style>
