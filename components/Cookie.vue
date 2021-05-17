<template>
  <transition name="fade" appear>
    <div
      v-show="!selected"
      class="cookie bg-pink-300 p-2 lg:p-4 z-40 shadow-2xl text-white text-center"
    >
      We use cookies!
      <div class="flex justify-center mt-1">
        <button
          class="hover:text-purple-500 transition duration-500 mr-4"
          @click="enableTracking"
        >
          Accept
        </button>
        <button
          class="hover:text-red-500 transition duration-500"
          @click="disableTracking"
        >
          Decline
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Cookie',
  data: () => {
    return {
      selected: false,
    }
  },
  mounted() {
    if (localStorage.getItem('yellingLightTracking')) {
      this.selected = true
    }
  },
  methods: {
    disableTracking() {
      this.$ga.disable()
      // from now on analytics is disabled
      localStorage.setItem('yellingLightTracking', 'inactive')
      this.selected = true
    },
    enableTracking() {
      this.$ga.enable()
      // from now on analytics is enabled
      localStorage.setItem('yellingLightTracking', 'active')
      this.selected = true
    },
  },
}
</script>

<style scoped>
.cookie {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
