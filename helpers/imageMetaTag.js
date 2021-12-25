const getImageUrl = (image) => {
  if (image.charAt(0) === '/') {
    return image.substring(1)
  }
  return image
}

export { getImageUrl }
