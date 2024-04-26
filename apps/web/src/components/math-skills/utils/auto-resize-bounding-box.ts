export function autoResizeBoundingBox(points: [number, number][]) {
  const minX = Math.min.apply(
    null,
    points.map((p) => p[0])
  )
  const maxX = Math.max.apply(
    null,
    points.map((p) => p[0])
  )
  const minY = Math.min.apply(
    null,
    points.map((p) => p[1])
  )
  const maxY = Math.max.apply(
    null,
    points.map((p) => p[1])
  )

  const width = maxX - minX
  const height = maxY - minY
  const size = Math.max(width, height)

  return [
    minX - 0.2 * size,
    maxY + 0.2 * size,
    minX + 1.2 * size,
    maxY - 1.2 * size,
  ] as [number, number, number, number]
}
