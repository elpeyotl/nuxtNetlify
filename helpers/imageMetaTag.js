const getImageUrl = (image) => {
  if (process.client) {
    if (image.charAt(0) === '/') {
      return window.location.hostname + image
    }
    return image
  }
}

export { getImageUrl }
