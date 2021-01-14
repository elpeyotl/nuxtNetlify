<template>
  <div
    class="bg-center bg-cover bg-fixed bg-no-repeat bg-image"
    :style="{
      backgroundImage: 'url(' + require('@/assets/bg-yellinglight.jpg') + ')',
    }"
  >
    <div class="bg-gray-800 h-full w-full bg-opacity-75">
      <div class="mx-auto max-w-6xl bg-gray-400 bg-opacity-75 shadow-lg">
        <header
          class="bg-black h-32 text-white flex justify-center items-center"
        >
          The yelling light
        </header>
        <Nuxt class="p-8" />
      </div>

      />
    </div>
  </div>
</template>

<style>
.bg-image {
  animation: imagebulger 20s ease-in-out infinite;
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
</style>
