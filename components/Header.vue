<template>
  <header class="bg-black text-white z-30">
    <div class="border-b border-gray-900">
      <NuxtLink to="/">
        <div
          class="w-full h-20 lg:h-32 flex flex-col items-center justify-center"
        >
          <h1 class="uppercase text-xl lg:text-4xl font-bold">
            The yelling light
          </h1>
          <span class="uppercase text-sm lg:text-base text-gray-700"
            >Enligthening music</span
          >
        </div>
      </NuxtLink>
      <div class="flex justify-center">
        <Social />
      </div>
    </div>

    <Nav />
  </header>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  components: { Nav },
}
</script>

<style></style>
