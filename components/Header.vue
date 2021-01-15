<template>
  <header class="bg-black text-white">
    <div
      class="text-center border-b border-gray-900 w-full h-20 lg:h-32 flex flex-col justify-center items-center"
    >
      <h1 class="uppercase text-xl lg:text-4xl font-bold">The yelling light</h1>
      <span class="uppercase text-sm lg:text-base text-gray-700"
        >Enligthening music</span
      >
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
