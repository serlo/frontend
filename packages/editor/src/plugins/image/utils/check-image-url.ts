const imageRegex =
  /^(https?:\/\/(?:www\.)?[\w.-]+\.[a-z]{2,}(?:\/[\w.-]*)*\.(?:jpg|jpeg|png|gif|bmp|tiff|webp|svg))$/

export const isImageUrl = (url: string) => {
  return imageRegex.test(url)
}
