<template>
  <nuxt-link :to="linkTo">
    <div
      class="shadow-2xl relative h-56 text-white card flex justify-center items-center overflow-hidden"
    >
      <div
        class="bg-black w-full z-10 absolute h-56 bg-opacity-75 card__overlay transition duration-500 ease-in-out"
      ></div>
      <div class="text-2xl z-20 font-semibold text-center">
        <span v-if="isAlbum">
          {{ content.title }}
          <br />
          <span class="text-sm">{{ content.artist }}</span
          ><br />
          <small class="text-sm">{{ showYear(content.date) }}</small>
        </span>
        <span v-else>
          {{ content.artist }}
        </span>
      </div>

      <div
        class="card__bgImage bg-black z-0 absolute cursor-pointer w-full h-56"
        :style="{ backgroundImage: 'url(' + content.thumbnail + ')' }"
      ></div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Card',
  props: {
    content: {
      type: Object,
      required: true,
    },
    isAlbum: {
      type: Boolean,
      default: false,
    },
    isNews: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    linkTo() {
      if (this.isAlbum) return `/releases/${this.content.slug}`
      else if (this.isNews) return `/news/${this.content.slug}`
      else return `/artists/${this.content.slug}`
    },
  },
  methods: {
    showYear(date) {
      const parsedDdate = new Date(date)
      return parsedDdate.getFullYear()
    },
  },
}
</script>

<style scoped>
.card:hover .card__overlay {
  @apply bg-opacity-50;
}
.card__bgImage {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 0.5s ease-in-out;
}

.card:hover .card__bgImage {
  transform: skew(0deg, -8deg) scale(1.2);
}
</style>
