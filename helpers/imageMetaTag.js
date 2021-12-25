const getImageUrl = (image) => {
  console.log(image)
  if (image.charAt(0) === '/') {
    return window.location.hostname + image
  }
  return image
}

export { getImageUrl }
