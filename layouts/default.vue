<template>
  <div
    class="bg-center bg-cover bg-fixed bg-no-repeat bg-image min-w-screen min-h-screen"
    :style="{
      backgroundImage: 'url(' + require('@/assets/bg-yellinglight.jpg') + ')',
    }"
  >
    <div class="bg-gray-800 h-full w-full bg-opacity-75">
      <div class="mx-auto max-w-6xl bg-gray-400 bg-opacity-75 shadow-lg">
        <Header />
        <Nuxt class="p-4 lg:p-16 min-h-screen" />
        <Footer />
      </div>

      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: { Header, Footer },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Raleway&display=swap');

h1,
h2,
h3 {
  font-family: 'Montserrat', sans-serif;
}

body {
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.25em;
}

.bg-image {
  animation: imagebulger 40s ease-in-out infinite;
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
</style>
