export async function getDimensions(src: string) {
  if (!src) return { width: 0, height: 0 }
  const img = new Image()
  img.src = src
  await img.decode()
  return {
    width: img.naturalWidth,
    height: img.naturalHeight,
  }
}
