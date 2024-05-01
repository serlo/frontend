export function pp(x: number) {
  const isNeg = x < 0
  return (
    (isNeg ? '−\u202F' : '') +
    Math.abs(x).toLocaleString('de-De').replace(/\./g, '\xa0')
  )
}
