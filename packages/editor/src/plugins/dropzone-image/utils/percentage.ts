// Calculates the percentage of the zone dimension in relation to the canvas dimension,
// and rounds it to four decimal places.
export function getPercentageRounded(
  canvasDimension: number,
  zoneDimension: number
) {
  const decimal = zoneDimension / canvasDimension
  const rounded = Math.round((decimal + Number.EPSILON) * 10000) / 10000
  return rounded
}
