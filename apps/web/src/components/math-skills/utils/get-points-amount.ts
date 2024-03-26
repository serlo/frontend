export function getPointsAmount(skillCent: number) {
  return Math.min(Math.trunc(skillCent / 100), 3)
}
