export function autoResizeBoundingBox(points: { x: number; y: number }[]) {
  const minX = Math.min.apply(
    null,
    points.map((p) => p.x)
  )
  const maxX = Math.max.apply(
    null,
    points.map((p) => p.x)
  )
  const minY = Math.min.apply(
    null,
    points.map((p) => p.y)
  )
  const maxY = Math.max.apply(
    null,
    points.map((p) => p.y)
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
