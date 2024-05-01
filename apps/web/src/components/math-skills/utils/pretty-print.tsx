export function pp(x: number) {
  if (typeof x === 'number') {
    const isNeg = x < 0
    return (
      <>
        {isNeg && <>&minus;&#x202F;</>}
        {Math.abs(x).toLocaleString('de-De').replace(/\./g, '\xa0')}
      </>
    )
  }
  return <>{x}</>
}
