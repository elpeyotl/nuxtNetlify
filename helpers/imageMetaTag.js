const getImageUrl = (image) => {
  if (image != null && image.charAt(0) === '/') {
    return 'https://www.theyellinglight.ch/' + image
  }
  return image
}

export { getImageUrl }
