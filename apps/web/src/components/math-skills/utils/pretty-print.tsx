export function pp(x: number) {
  const isNeg = x < 0
  return (
    (isNeg ? '−' : '') +
    Math.abs(x).toLocaleString('de-De').replace(/\./g, '\xa0')
  )
}
