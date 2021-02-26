export const state = () => ({
  bgImage: '/img/bg-yellinglight.jpg',
})

export const mutations = {
  updateBgImage(state, bgImage) {
    bgImage
      ? (state.bgImage = bgImage)
      : (state.bgImage = '/img/bg-yellinglight.jpg')
  },
}
