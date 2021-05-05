<template>
  <div>
    <div class="mb-16">
      <div class="flex justify-center">
        <h1 class="text-4xl font-semibold">The Yelling Light team</h1>
      </div>
    </div>
    <div class="team">
      <div v-for="member in team" :key="member.name">
        <div class="w-full relative mb-4 p-2">
          <img class="shadow-2xl team__image w-full" :src="member.image" />
          <div class="team__caption w-2/3 max-w-md">
            <div class="text-center mb-2 text-lg mx-auto">
              <span class="bg-red-500 px-2 py-1"> {{ member.title }} </span>
            </div>
            <div class="text-center mb-8 text-sm mx-auto">
              <span class="bg-red-500 px-2 py-1">{{ member.job }}</span>
            </div>
            <div class="text-center mb-2 text-sm mx-auto bg-red-500 p-2">
              {{ member.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageTitle } from '~/config/yellingLightSettings'

export default {
  name: 'Team',
  async asyncData({ $content }) {
    let team
    try {
      team = await $content('team').sortBy('createdAt', 'desc').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      e({ message: 'Team Post not found' })
    }
    return {
      team,
    }
  },
  mounted() {
    this.$store.commit('updateBgImage', false)
  },
  head() {
    return {
      title: `${pageTitle} - The Team`,
      script: [
        {
          src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
          defer: true,
        },
      ],
    }
  },
}
</script>

<style scoped>
.team__image {
  filter: grayscale(1);
  cursor: pointer;
  transition: filter 0.2s ease;
}

.team__image:hover {
  filter: grayscale(0);
}
.team__caption {
  @apply text-white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
