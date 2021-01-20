<template>
  <nuxt-link :to="`artists/${content.slug}`">
    <div
      class="bg-black shadow-2xl h-56 text-white card cursor-pointer"
      style="
        background-image: url('https://www.laut.de/Slayer/slayer-163839.jpg');
      "
    >
      <div
        class="bg-black w-full h-full flex justify-center items-center bg-opacity-75 card__overlay transition duration-500 ease-in-out"
      >
        <div class="text-2xl font-semibold text-center">
          {{ content.artist }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.card {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: background-size 0.5s ease-in-out;
}

.card:hover {
  background-size: 120%;
}

.card:hover .card__overlay {
  @apply bg-opacity-50;
}
</style>
