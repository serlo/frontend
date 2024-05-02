/** pretty print a number */
export function pp(
  x: number,
  mode: 'normal' | 'embrace_neg' | 'merge_op' = 'normal'
): string {
  const numStr = Math.abs(x).toLocaleString('de-De').replace(/\./g, '\xa0')
  if (mode === 'normal') {
    return (x < 0 ? '−' : '') + numStr
  }
  if (mode === 'embrace_neg') {
    if (x >= 0) return numStr
    return `(−${numStr})`
  }
  if (mode === 'merge_op') {
    if (x >= 0) {
      return `+ ${numStr}`
    }
    return `- ${numStr}`
  }
  return x.toString()
}

/** pretty print a polynom */
export function ppPolynom(polynom: [number, string, number][]): JSX.Element {
  if (polynom.every((x) => x[0] === 0)) {
    return <>0</>
  }
  let isFirstElement = true
  return (
    <>
      {polynom.map(([koeff, variable, exp]) => {
        if (koeff === 0) return null
        let beginWithWhitespace = true
        if (isFirstElement) {
          beginWithWhitespace = false
          isFirstElement = false
        }
        return (
          <>
            {beginWithWhitespace ? ' ' : null}
            {beginWithWhitespace
              ? koeff === 1 && exp !== 0
                ? '+ '
                : koeff === -1 && exp !== 0
                  ? '- '
                  : pp(koeff, 'merge_op')
              : exp !== 0 && Math.abs(koeff) === 1
                ? koeff > 0
                  ? ''
                  : '−'
                : pp(koeff, 'normal')}
            {exp === 0 ? null : (
              <>
                {variable}
                {exp === 1 ? null : <sup>{exp}</sup>}
              </>
            )}
          </>
        )
      })}
    </>
  )
}
