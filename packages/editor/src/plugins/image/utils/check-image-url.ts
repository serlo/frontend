const imgFileExtensionRegex = /\.(gif|jpe?g|png|svg|webp)$/

export const isImageUrl = (url: string) => {
  return imgFileExtensionRegex.test(url)
}
