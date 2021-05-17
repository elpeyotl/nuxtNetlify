<template>
  <div>
    <BackgroundImage />
    <div class="bg-gray-800 h-full w-full bg-opacity-75 z-10 relative">
      <div class="mx-auto max-w-6xl bg-gray-200 bg-opacity-75 shadow-lg">
        <Header />
        <Nuxt class="p-4 lg:p-16 min-h-screen" />
        <Cookie />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackgroundImage from '~/components/BackgroundImage'
import Cookie from '~/components/Cookie'

export default {
  components: { Cookie, BackgroundImage, Header, Footer },
}
</script>

<style>
h1,
h2,
h3 {
  font-family: 'Montserrat', sans-serif;
}

body {
  @apply font-light;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.25em;
}
.backgroundImage {
  will-change: transform;
}
@keyframes imagebulger {
  0% {
    background-size: 150% auto;
  }

  50% {
    background-size: 100% auto;
  }

  100% {
    background-size: 150% auto;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition-delay: 0.2s;
}
</style>
