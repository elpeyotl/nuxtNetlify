<template>
  <div>
    <div class="hidden md:block">
      <div class="h-8 lg:h-12 flex mx-auto items-center w-3/4 justify-around">
        <nuxt-link
          v-for="link in links"
          :key="link"
          :to="`/${link}`"
          class="uppercase"
          >{{ link }}</nuxt-link
        >
        <a href="https://shop.theyellinglight.ch/" target="_blank">SHOP</a>
      </div>
    </div>
    <div class="md:hidden flex justify-center">
      <button
        :class="{ 'is-active': isActive }"
        class="hamburger hamburger--collapse"
        type="button"
        @click="toggleMenu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <transition
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
    >
      <div v-show="isActive" class="bg-black absolute h-full w-full z-50 p-4">
        <div class="flex flex-col items-center" @click="toggleMenu">
          <nuxt-link
            v-for="link in links"
            :key="link"
            :to="`/${link}`"
            class="uppercase my-3"
            >{{ link }}</nuxt-link
          >
          <a
            href="https://shop.theyellinglight.ch/"
            target="_blank"
            @click="toggleMenu"
            >SHOP</a
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  setup() {
    const links = ref(['news', 'releases', 'artists', 'photography', 'team'])
    const isActive = ref(false)

    const toggleMenu = () => {
      isActive.value = !isActive.value
      const header = document.querySelector('header')
      if (isActive.value) {
        header.classList.add('headerFixed')
      } else {
        header.classList.remove('headerFixed')
      }
    }
    return {
      isActive,
      links,
      toggleMenu,
    }
  },
}
</script>

<style>
.headerFixed {
  position: fixed;
  height: 100%;
  width: 100%;
}

/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active,
a.nuxt-link-active {
  @apply text-red-500;
}

a {
  transition: color 0.2s ease;
}

a:hover {
  @apply text-red-500;
}
</style>
