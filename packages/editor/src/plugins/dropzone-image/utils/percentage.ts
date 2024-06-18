export function getPercentageRounded(
  canvasDimension: number,
  zoneDimension: number
) {
  const percentage = (zoneDimension / canvasDimension) * 100
  const rounded = Math.round((percentage + Number.EPSILON) * 100) / 100
  return rounded
}
