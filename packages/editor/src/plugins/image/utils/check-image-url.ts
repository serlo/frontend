const imgFileExtensionRegex = /\.(gif|jpe?g|png|svg|webp)$/i

export const isImageUrl = (url: string) => {
  return imgFileExtensionRegex.test(url)
}
